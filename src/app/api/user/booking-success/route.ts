import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";


export const GET = async(request:NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const appointmentId = searchParams.get("appointmentId");
      const userId =  searchParams.get("userId")
      const role = searchParams.get("role");
        if(!userId || !role || !appointmentId || role !== "user"){
           return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }
        await connectDB()
        const appointment = await Appointment.findOne({_id:appointmentId,patientId:userId}).populate("doctorId","name speciality").populate("patientId","name").lean();
        if (!appointment) {
         return NextResponse.json(
         { success: false, message: "Appointment not found" },
         { status: 404 }
        );
        }
        return NextResponse.json(
            {success:true,message:"Appointment Fetched Successfully",appointment},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}