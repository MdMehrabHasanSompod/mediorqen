import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { Doctor } from "../../models/doctor.model";

export const GET = async(request:NextRequest) => {
    try {
        await connectDB()
        const Doctors = await Doctor.find({}).select("name speciality qualifications slug image availability fees phone email").lean();
        return NextResponse.json(
            {success:true,message:"Doctor Fetched Successfully",Doctors},
            {status:200}
        )
    } catch (error) {
            return NextResponse.json(
            {success:true,message:"Internal Server Error"},
            {status:500}
        )
    }
}