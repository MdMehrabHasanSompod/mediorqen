import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const date = searchParams.get("date");

    if (!doctorId || !date) {
      return NextResponse.json(
        { success: false, message: "Doctor Id and Date required" },
        { status: 400 }
      );
    }

    await connectDB();

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const allTimeSlots: string[] = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let min = 0; min < 60; min += 30) {
        allTimeSlots.push(
          `${hour.toString().padStart(2, "0")}:${min
            .toString()
            .padStart(2, "0")}`
        );
      }
    }

    const bookedAppointments = await Appointment.find({
      doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: {$in: ["Pending", "Confirmed", "Awaiting Payment"]},
    })
      .select("slot")
      .lean();

    const bookedSlots = bookedAppointments.map((b) => b.slot);
    const now = new Date();
    const availableSlots = allTimeSlots.filter((slot)=>{
       if (bookedSlots.includes(slot)) return false;
       if (selectedDate.toDateString() === now.toDateString()) {
        const [hour, min] = slot.split(":").map(Number);
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hour, min, 0, 0);
        if (slotTime <= now) return false; 
       }
       return true;
  });

    return NextResponse.json(
      { success: true, availableSlots },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
