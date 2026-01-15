import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";


export const GET = async(request:NextRequest) => {
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
        const userAppointments = await Appointment.find({patientId:id}).select("_id doctorId date slot appointmentFees appointmentType paymentMethod paymentStatus meetingRoomId status").populate("doctorId","name speciality image availability phone slug qualifications").sort({date:-1}).lean();
        return NextResponse.json(
            {success:true,message:"Appointments Fetched Successfully",userAppointments},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}