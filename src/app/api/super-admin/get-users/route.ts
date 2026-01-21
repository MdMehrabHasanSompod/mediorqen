import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/app/lib/db";
import { User } from "@/src/app/models/user.model";



export const GET = async(request:NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const role = searchParams.get("role");
        if(!id || !role || role !== "super-admin"){
           return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }
        await connectDB()

        const Users = await User.find({}).sort({date:-1}).lean();

        if (!Users) {
        return NextResponse.json(
        { success: false, message: "Users not found" },
        { status: 404 }
      );
    }

        return NextResponse.json(
            {success:true,message:"Users Fetched Successfully",Users},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}