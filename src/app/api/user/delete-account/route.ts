import { NextRequest, NextResponse } from "next/server";
import { User } from "@/src/app/models/user.model";
import connectDB from "@/src/app/lib/db";


export const DELETE = async(request:NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const role = searchParams.get("role");
        if(!id || !role || role !== "user"){
           return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }
        await connectDB()
        const deletedUser = await User.findByIdAndDelete(id)
        return NextResponse.json(
            {success:true,message:"User Deleted Successfully"},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}