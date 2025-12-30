import connectDB from "@/src/app/lib/db";
import { NextResponse } from "next/server";
import { Doctor } from "@/src/app/models/doctor.model";

export const GET = async () => {
  try {

    await connectDB();

    const Doctors = await Doctor.find({})
  

      return NextResponse.json({
        success: true,
        message: "Doctos fetched successfully",
        Doctors
      }, { status: 200 });
} catch (error) {
    return NextResponse.json({ success: false, message: `Internal server error${error}` }, { status: 500 });
  }
}
