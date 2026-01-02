import User from "@/Models/User";
import mongoose from "mongoose";

export async function GET(req){

    const {searchParams} = new URL(req.url)
    const username = searchParams.get("username");
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({username})
        if(user){
            return Response.json({
                userExist : true,
                message : "User found"
            });
        }else{
            return Response.json({
                userExists : false,
                message : "user doesnot exist"
            });
        }
    } catch (error) {
        console.log("error in finding the user",error)
        return Response.json({
            userExist : false,
            message : "Unexpected error occur in finding user."
        });
    }

}