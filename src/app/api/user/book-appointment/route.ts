import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request:NextRequest) => {
  try {
    const {doctorId,patientId,date,slot,appointmentType,appointmentFees} = await request.json();

   if (!doctorId || !patientId || !date || !slot || !appointmentType || !appointmentFees) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

      const feesNumber = Number(appointmentFees);
         if (isNaN(feesNumber)) {
          return NextResponse.json({ success: false, message: "Fees is undefined" }, { status: 400 });
        }

   await connectDB();

   const isSlotAvailable = await Appointment.findOne({
        doctorId,
        date,
        slot,
        status: { $in: ["Pending", "Confirmed"] },
    });

    if(isSlotAvailable){
         return NextResponse.json(
        { success: false, message: "Slot already booked" },
        { status: 409 }
      );
    }

   const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    const newAppointment = await Appointment.create({
          doctorId,
          patientId,
          date,
          slot,
          appointmentFees:feesNumber,
          appointmentType,
          expiresAt,
    })

    return NextResponse.json({
     success:true,message:"Appointment Booked Successfully",
     appointmentId: newAppointment._id,
    expiresAt: newAppointment.expiresAt,
    },{status:200})

  } catch (error) {
     return NextResponse.json({
     success:false,message:`Internal Server Error${error}`
    },{status:500})
  }
}