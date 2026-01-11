import connectDB from "@/src/app/lib/db";
import { User } from "@/src/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export const POST = async(request:NextRequest)=>{
    try {
        const {name,email,phone,password,age,gender} = await request.json()
        if(!name || !email || !phone || !password || !age || !gender){
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
       const isUserExisted = await User.findOne({email})
       if(isUserExisted){
         return NextResponse.json(
                {success:false,message:"User already exists"},
                {status:409}
            )
       }
       const hashedPassword = await bcrypt.hash(password,10)

       const newUser = await User.create({
        name,
        email,
        phone,
        password:hashedPassword,
        age,
        gender
       })
    

       return NextResponse.json({
        success:true,message:"User registered successfully. Please login to continue", newUser
       },{status:200})

    } catch (error) {
        return NextResponse.json(
                {success:false,message:`Internal server error ${error}`},
                {status:500}
            )
    }
}