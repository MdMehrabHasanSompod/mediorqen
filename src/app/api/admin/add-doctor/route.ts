import connectDB from "@/src/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Doctor } from "@/src/app/models/doctor.model";
import uploadOnCloudinary from "@/src/app/lib/cloudinary";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const speciality = formData.get("speciality") as string;
    const fees = formData.get("fees") as string;
    const image = formData.get("image") as Blob | null;
    const qualifications = formData.get("qualifications") as string;
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !image ||
      !speciality ||
      !fees
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    const qualificationsArray = JSON.parse(qualifications || "[]");

    if (
      !Array.isArray(qualificationsArray) ||
      qualificationsArray.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "At least one qualification is required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be 8 characters" },
        { status: 400 }
      );
    }
    if (!(image instanceof Blob)) {
      return NextResponse.json(
        { success: false, message: "Image file is required" },
        { status: 400 }
      );
    }

    const feesNumber = Number(fees);
    if (isNaN(feesNumber)) {
      return NextResponse.json(
        { success: false, message: "Fees is undefined" },
        { status: 400 }
      );
    }

    await connectDB();
    const isDoctorExisted = await Doctor.findOne({ email });
    if (isDoctorExisted) {
      return NextResponse.json(
        { success: false, message: "Doctor already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = await uploadOnCloudinary(image);

    const newDoctor = await Doctor.create({
      name,
      email,
      phone,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      fees: feesNumber,
      qualifications: qualificationsArray,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Doctor added successfully",
        newDoctor,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal server error${error}` },
      { status: 500 }
    );
  }
};
