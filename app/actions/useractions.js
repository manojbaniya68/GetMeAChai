"use server"
import User from "@/Models/User"
import Payment from "@/Models/Payment"
import mongoose from "mongoose"
export async function savePayment(data) {
  await mongoose.connect(process.env.MONGO_URI)
    const newPayment = new Payment({
        name: data.name,
        to_user: data.to_user,
        oid: data.oid,
        message: data.message,
        amount: data.amount      
    });
    await newPayment.save();
}

export async function markPaymentDone(oid) {
  await mongoose.connect(process.env.MONGO_URI)
    const payment = await Payment.findOneAndUpdate({ oid: oid } , { done: true }, { new: true }).lean();
    return payment;         
}

export async function getUserData(username){
  await mongoose.connect(process.env.MONGO_URI)
  const User = mongoose.models.User;
  const userData = await User.findOne({username});
  return JSON.parse(JSON.stringify(userData));
}

export async function getPaymentData(username){
  await mongoose.connect(process.env.MONGO_URI)
  const payments = await Payment.find({to_user:username, done: true});
  console.log(payments)
  return payments;
}

export async function updateUser(email, updatedData){
  await mongoose.connect(process.env.MONGO_URI)
  const User = mongoose.models.User;
  const updatedUser = await User.findOneAndUpdate({email:email}, {...updatedData,email:email}, {new: true});
  
  return JSON.parse(JSON.stringify(updatedUser));
}
