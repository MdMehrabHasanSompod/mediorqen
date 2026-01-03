import { Appointment } from "@/src/app/models/appointment.model";
import connectDB from "@/src/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/app/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    const { appointmentId } = await req.json();
    
    if (!appointmentId) {
      return NextResponse.json(
        { success: false, message: "appointmentId is required" },
        { status: 400 }
      );
    }
     const session = await auth();
       if (!session?.user?.id) {
          return NextResponse.json(
            { success: false, message: "Attempted to Unauthorized Access"},
            { status: 401 }
          );
        }
    await connectDB();

    const appointment = await Appointment.findById(appointmentId);
    
      if (!appointment) {
       return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    } 

     if (appointment.patientId.toString() !== session.user.id) {
          return NextResponse.json(
            { success: false, message: "You are not allowed to access this appointment" },
            { status: 403 }
          );
        }

     appointment.paymentStatus = "Paid";
     appointment.status= "Confirmed";
     appointment.expiresAt = undefined;

     await appointment.save();

  
  return NextResponse.json({ success: true,message:"Payment Completed Successfully",appointmentType: appointment.appointmentType },{status:200});
  } catch (error) {
    return NextResponse.json({ success:false, message:"Internal Server Error" },{status:500});
  }
};
