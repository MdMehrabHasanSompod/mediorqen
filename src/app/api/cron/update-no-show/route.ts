import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
import { NextResponse } from "next/server";

export default async function POST() {
  try {
    await connectDB();
    const now = new Date();

    const appointments = await Appointment.find({ status: "Confirmed" });

    let noShowCount = 0;

    for (const appointment of appointments) {
      const [hour, min] = appointment.slot.split(":").map(Number);
      const slotTime = new Date(appointment.date);
      slotTime.setHours(hour, min, 0, 0);

      if (slotTime < now) {
        appointment.status = "No-Show";
        await appointment.save();
        noShowCount++;
      }
    }

    console.log(`Marked ${noShowCount} appointments as No-Show`);

    return NextResponse.json(
      { success: true, noShowMarked: noShowCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
