import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
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

        const doctor = await Doctor.findOne({ userId:id }).select("_id");

        if (!doctor) {
        return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );
    }
        const Appointments = await Appointment.find({doctorId:doctor._id}).select("_id patientId date slot appointmentFees appointmentType paymentMethod paymentStatus meetingRoomId status").populate("patientId","name email phone gender age bloodGroup avatar").sort({date:-1}).lean();

        if (!Appointment) {
        return NextResponse.json(
        { success: false, message: "Appointments not found" },
        { status: 404 }
      );
    }

        return NextResponse.json(
            {success:true,message:"Appointments Fetched Successfully",Appointments},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}