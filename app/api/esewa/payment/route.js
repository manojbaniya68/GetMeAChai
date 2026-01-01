import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUserData } from "@/app/actions/useractions";

export async function POST(req) {
  const { amount,username } = await req.json();
  const users = await getUserData(username);


  if (!users.esewa_merchant_code || !users.esewa_secret_key) {
    console.log("Merchant details not set");
    return NextResponse.json({ 
      error: "Merchant details not set",
      setDetail:false 
    });
  } else {
    const total_amount = amount;
    const tax_amount = 0;
    const product_code = users.esewa_merchant_code;
    const transaction_uuid = crypto.randomUUID();

    const signed_field_names = "total_amount,transaction_uuid,product_code";

    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

    const signature = crypto
      .createHmac("sha256", users.esewa_secret_key)
      .update(message)
      .digest("base64");

    return NextResponse.json({
      amount,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_code,
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: "http://localhost:3000/callbacks",
      failure_url: "http://localhost:3000/callbacks",
      signed_field_names,
      signature,
      setDetail: true,
    });
  }
}
