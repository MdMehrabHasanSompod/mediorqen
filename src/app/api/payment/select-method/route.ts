import { auth } from "@/src/app/lib/auth";
import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
  const { appointmentId, paymentMethod } = await request.json();
   if (!appointmentId) {
        return NextResponse.json(
          { success: false, message: "AppointmentId is required" },
          { status: 400 }
        );
      }
 
    if (!paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Payment Method is required" },
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

      if (appointment.paymentStatus !== "Unpaid") {
       return NextResponse.json(
        { success: false, message: "Invalid payment attempt" },
        { status: 400 }
       );
      }  

    appointment.paymentMethod = paymentMethod;
   if (paymentMethod === "Cash") {
    appointment.expiresAt = undefined; 
    appointment.status = "Confirmed";
  } else {
    appointment.status = "Awaiting Payment";
 }
    await appointment.save();

  return NextResponse.json({ success: true, message: `Payment Method: ${appointment.paymentMethod}`});
  } catch (error) {
  return NextResponse.json({ success: false, message: `Internal Server Error ${error}` },{status:500});
  }
};
