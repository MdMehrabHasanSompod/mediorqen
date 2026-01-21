import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";



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

        const Appointments = await Appointment.find({}).populate([{path:"patientId",select:"name email phone avatar"},{path:"doctorId",select:"name image availability speciality phone email"}]).sort({date:-1}).lean();

        if (!Appointments) {
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