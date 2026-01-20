import connectDB from "@/src/app/lib/db";
import { Doctor } from "@/src/app/models/doctor.model";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  try {
    const { doctorId, availability, role } = await request.json();

    if (!doctorId ||  !role) {
      return NextResponse.json(
        { success: false, message: "Doctor id and role are required" },
        { status: 400 }
      );
    }

     const availabilityStatus = availability === true || availability === "true";

    await connectDB();

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { availability: availabilityStatus },
      { new: true }
    );

    return NextResponse.json({
      success: true, message: `Doctor is now ${updatedDoctor.availability ? "Available" : "Unavailable"}`, updatedDoctor
    },{status:200});

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
