import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import connectDB from "@/src/app/lib/db";
import { User } from "@/src/app/models/user.model";

export const POST = async(request:NextRequest)=>{
    try {
        const {name,email,phone,password,role} = await request.json()
        if(!name || !email || !phone || !password || !role ){
            return NextResponse.json(
                {success:false,message:"All fields are required"},
                {status:400}
            )
        }
        if(password.length<8){
            return NextResponse.json(
                {success:false,message:"Password must be 8 characters"},
                {status:400}
            )
        }
        await connectDB()
       const isAdminExisted = await User.findOne({email})
       if(isAdminExisted){
         return NextResponse.json(
                {success:false,message:"Admin already exists"},
                {status:409}
            )
       }
       const hashedPassword = await bcrypt.hash(password,10)

       const newAdmin = await User.create({
        name,
        email,
        phone,
        password:hashedPassword,
        role
       })
    

       return NextResponse.json({
        success:true,message:"Admin added successfully.", newAdmin
       },{status:200})

    } catch (error) {
        return NextResponse.json(
                {success:false,message:`Internal server error ${error}`},
                {status:500}
            )
    }
}