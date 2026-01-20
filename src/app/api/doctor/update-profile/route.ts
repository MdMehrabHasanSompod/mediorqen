import uploadOnCloudinary from "@/src/app/lib/cloudinary"
import connectDB from "@/src/app/lib/db"
import { Doctor } from "@/src/app/models/doctor.model"
import { User } from "@/src/app/models/user.model"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async(request:NextRequest) => {
    try {
        const formData = await request.formData()
        const id = formData.get("id") as string
        const userId = formData.get("userId") as string
        const updatedName = formData.get("updatedName") as string
        const updatedPhone = formData.get("updatedPhone") as string 
        const updatedFees = formData.get("updatedFees") as string
        const updatedQualifications = formData.get("updatedQualifications") as string
        const updatedAvatar = formData.get("updatedAvatar") as Blob 
        const removeAvatar = formData.get("removeAvatar") === "true";
        
        if(!id && !userId){
             return NextResponse.json(
                {success:false,message:"Id and UserId must required!"},
                {status:400}
            )           
        }

        if(!updatedName && !updatedPhone && !updatedFees && !updatedQualifications && !updatedAvatar && !removeAvatar){
            return NextResponse.json(
                {success:false,message:"Invalid Update Request"},
                {status:400}
            )
        }

       const qualificationsArray = JSON.parse(updatedQualifications || "[]");
         if (!Array.isArray(qualificationsArray)) {
              return NextResponse.json({ success: false, message: "Invalid qualifications" }, { status: 400 });
            }

      let feesNumber: number | undefined;     
      if (updatedFees) {
       feesNumber = Number(updatedFees);
      if (isNaN(feesNumber) || feesNumber < 0) {
        return NextResponse.json(
          { success: false, message: "Invalid fees" },
          { status: 400 }
        );
      }
    }

     type qualification = {
      degree: string;
      institution: string;
     };

     interface IUpdateDoctorData {
            name?: string;
            phone?: string;
            fees?: number;
            qualifications?: qualification[];
            image?:string | null;
        }

        await connectDB()

        const session = await mongoose.startSession();

        try {
            let updatedDoctor ;

            await session.withTransaction(async () => {

                const updateData:IUpdateDoctorData = {};

               if (updatedName) updateData.name = updatedName;
               if (updatedPhone) updateData.phone = updatedPhone;
               if (updatedFees) updateData.fees = feesNumber;
               if (updatedQualifications) updateData.qualifications = qualificationsArray;
               if (removeAvatar && !updatedAvatar) {
                  updateData.image = null; 
              } 
               if (updatedAvatar) {
                  const updatedAvatarUrl = await uploadOnCloudinary(updatedAvatar);
                  updateData.image = updatedAvatarUrl; 
              }

               const updatedUser = await User.findByIdAndUpdate(userId,{
                name: updateData.name,
                phone: updateData.phone,
                avatar: updateData.image,
               },{
                  new:true,
                  session
                })

                 if (!updatedUser) {
                        throw new Error("User not found") 
                    }
                

                updatedDoctor = await Doctor.findByIdAndUpdate(id,updateData,{
                  new:true,
                  session
                }).populate("userId")
            });

            session.endSession();

            return NextResponse.json(
                {success:true,message:"Doctor Updated Successfully",updatedDoctor},
                {status:200}
            )
        } catch (error) {
            session.endSession();
            throw error;
        }

    } catch (error) {
        console.log(error);
          return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
          )
    }
}
