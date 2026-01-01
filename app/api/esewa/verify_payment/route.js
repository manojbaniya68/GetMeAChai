import { verifyEsewaSignature } from "@/app/actions/verifyEsewaSignature";
import { EsewaStatus, categorizeEsewaStatus } from "@/utils/esewaStatus";
import mongoose from "mongoose"; 
import Payment from "@/Models/Payment";
export async function POST(request) {
  try {
    const data = await request.json();
    const { transaction_uuid, product_code, total_amount } = data;

    if (!transaction_uuid || !product_code || !total_amount) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const ta = String(total_amount);
    const tu = String(transaction_uuid);
    const pc = String(product_code);
    console.log("Verifying signature with data:", data);
    const isValid = await verifyEsewaSignature(data,process.env.ESEWA_SECRET_KEY);

    if (!isValid) {
      return Response.json({ verified: false, error: "Invalid signature" }, { status: 400 });
    }
    
    const url = `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${pc}&total_amount=${ta}&transaction_uuid=${tu}`;
    const res = await fetch(url);
    const result = await res.json();
    const status = result.status;
    const category = categorizeEsewaStatus(status);

    switch (category) {
      case "SUCCESS":
        await mongoose.connect(process.env.MONGO_URI);
        await Payment.findOneAndUpdate({ oid: transaction_uuid } , { done: true });
        return Response.json({
          ok: true,
          message: "Payment Successful",
          data: result,
        }, { status: 200 });

      case "RETRY":
        return Response.json({
          ok: false,
          message: "Payment Pending. Please verify again.",
          data: result,
        }, { status: 202 });

      case "FAILURE":
        return Response.json({
          ok: false,
          message: "Payment Failed.",
          data: result,
        }, { status: 400 });

      default:
        return Response.json({
          ok: false,
          message: "Unknown Status",
          data: result,
        }, { status: 500 });
    }



  } catch (error) {
    console.error("Esewa verification error:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
