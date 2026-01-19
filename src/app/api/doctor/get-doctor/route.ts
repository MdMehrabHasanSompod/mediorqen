import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/app/lib/db";
import { Doctor } from "@/src/app/models/doctor.model";


export const GET = async(request:NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const role = searchParams.get("role");
        if(!id || !role || role !== "doctor"){
           return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }
        await connectDB()
        const existedDoctor = await Doctor.findOne({userId:id}).populate("userId","name email phone role gender avatar createdAt").lean();
        
         if (!existedDoctor) {
         return NextResponse.json(
          { success: false, message: "Doctor not found" },
           { status: 404 }
        );
      }

        if(existedDoctor.userId.role !== "doctor"){
            return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }

        return NextResponse.json(
            {success:true,message:"Doctor Fetched Successfully",existedDoctor},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}