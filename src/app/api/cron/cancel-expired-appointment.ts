import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
import { NextResponse } from "next/server";

export default async function GET() {
  try {
    await connectDB();

    const result = await Appointment.updateMany(
      {
        status: "Pending",
        expiresAt: { $lt: new Date() },
      },
      { $set: { status: "Cancelled" } }
    );

    console.log(`Cancelled ${result.modifiedCount} expired appointments`);

    return NextResponse.json({success: true, cancelled: result.modifiedCount},{status:200})

  } catch (error) {
    return NextResponse.json({success: false, message:"Internal Server Error" },{status:500})
  }
}
