import connectDB from "@/src/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Doctor } from "@/src/app/models/doctor.model";
import uploadOnCloudinary from "@/src/app/lib/cloudinary";
import { User } from "@/src/app/models/user.model";
import mongoose from "mongoose";

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

    if (!name || !email || !phone || !password || !image || !speciality || !fees) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const qualificationsArray = JSON.parse(qualifications || "[]");
    if (!Array.isArray(qualificationsArray) || qualificationsArray.length === 0) {
      return NextResponse.json({ success: false, message: "At least one qualification is required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, message: "Password must be at least 8 characters" }, { status: 400 });
    }
    if (!(image instanceof Blob)) {
      return NextResponse.json({ success: false, message: "Image file is required" }, { status: 400 });
    }

    const feesNumber = Number(fees);
    if (isNaN(feesNumber)) {
      return NextResponse.json({ success: false, message: "Fees is undefined" }, { status: 400 });
    }

    await connectDB();

    const isExisted = await Doctor.findOne({ email }) || await User.findOne({ email });
    if (isExisted) {
      return NextResponse.json({ success: false, message: "Doctor already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {

        const newUser = await User.create([{
          name,
          email,
          phone,
          password: hashedPassword,
          role: "doctor"
        }], { session });

        const imageUrl = await uploadOnCloudinary(image);
        const newUserId = newUser[0]._id;

        await Doctor.create([{
          userId: newUserId,
          name,
          email,
          phone,
          image: imageUrl,
          speciality,
          fees: feesNumber,
          qualifications: qualificationsArray,
        }], { session });
      });

      session.endSession();

      return NextResponse.json({
        success: true,
        message: "Doctor added successfully"
      }, { status: 200 });

    } catch (error) {
      session.endSession();
      throw error;
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
};
