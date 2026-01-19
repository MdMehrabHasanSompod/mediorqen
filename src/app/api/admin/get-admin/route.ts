import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/app/models/user.model";
import connectDB from "@/src/app/lib/db";


export const GET = async(request:NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const role = searchParams.get("role");
        if(!id || !role || role !== "admin"){
           return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }
        await connectDB()
        const existedAdmin = await User.findOne({_id:id,role}).select("name email phone gender avatar createdAt").lean();
        return NextResponse.json(
            {success:true,message:"Admin Fetched Successfully",existedAdmin},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}