import User from "@/Models/User";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { query } = await req.json();
    const user = await User.find(
      {
        username: { $regex: `^${query}`, $options: "i" },
      },
      { username: 1, _id: 0 }
    ).limit(5);

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    } else {
      return Response.json({
        success: true,
        user: user,
      });
    }
  } catch (error) {
    console.error("Ünexpected error occurs", error);
    return Response.json({
      success: false,
      message: "Unexpected error occurs.",
    });
  }
}
