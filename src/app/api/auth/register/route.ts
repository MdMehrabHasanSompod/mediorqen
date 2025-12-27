import connectDB from "@/src/app/lib/db";
import { User } from "@/src/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const POST = async(request:NextRequest)=>{
    try {
        const {name,email,phone,password,age} = await request.json()
        if(!name || !email || !phone || !password ){
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
        age
       })
    
       const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET!,
    { expiresIn: "10d" }
    );

       return NextResponse.json({
        success:true,message:"User registered successfully",token
       },{status:200})

    } catch (error) {
        return NextResponse.json(
                {success:false,message:`Internal server error ${error}`},
                {status:500}
            )
    }
}