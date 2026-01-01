import Payment from "@/Models/Payment";
import { getPaymentData } from "@/app/actions/useractions";

export async function POST(req){
    const data = await req.json()
    const paymentDetails = await getPaymentData(data.username)
    return Response.json(paymentDetails)

}