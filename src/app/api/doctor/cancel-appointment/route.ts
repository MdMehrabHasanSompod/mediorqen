import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";


export const PATCH = async(request:NextRequest) => {
    try {
        const {id,role,appointmentId} = await request.json()
        if(!id || !role || !appointmentId || role !== "doctor"){
           return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }
        await connectDB()

        const appointment = await Appointment.findOneAndUpdate({_id:appointmentId,doctorId:id, status: { $nin: ["Cancelled", "Completed"]}},{
            status:"Cancelled"
        },{new:true})

        if (!appointment) {
        return NextResponse.json(
         { success: false, message: "Appointment not found or not authorized" },
         { status: 404 }
         );}

        
        return NextResponse.json(
            {success:true,message:"Appointment Cancelled"},
            {status:200}
        )
    }catch(error) {
            return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
        )
    }
}