import uploadOnCloudinary from "@/src/app/lib/cloudinary"
import connectDB from "@/src/app/lib/db"
import { User } from "@/src/app/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async(request:NextRequest) => {
    try {
        const formData = await request.formData()
        const id = formData.get("id") as string
        const updatedName = formData.get("updatedName") as string
        const updatedPhone = formData.get("updatedPhone") as string 
        const updatedGender = formData.get("updatedGender") as string 
        const updatedAge = formData.get("updatedAge") as string 
        const updatedBloodGroup = formData.get("updatedBloodGroup") as string
        const updatedAvatar = formData.get("updatedAvatar") as Blob 
        const removeAvatar = formData.get("removeAvatar") === "true";
        
        if(!id && !updatedName && !updatedPhone && !updatedGender && !updatedAge && !updatedBloodGroup && !updatedAvatar && !removeAvatar){
            return NextResponse.json(
                {success:false,message:"Invalid Update Request"},
                {status:400}
            )
        }

        interface IUpdateUserData {
            name?: string;
            phone?: string;
            gender?:string;
            age?:string;
            bloodGroup?:string;
            avatar?:string | null;
        }

        await connectDB()

        const updateData:IUpdateUserData = {};

       if (updatedName) updateData.name = updatedName;
       if (updatedPhone) updateData.phone = updatedPhone;
       if (updatedGender) updateData.gender = updatedGender;
       if (updatedAge) updateData.age = updatedAge;
       if (updatedBloodGroup) updateData.bloodGroup = updatedBloodGroup;
       if (removeAvatar && !updatedAvatar) {
          updateData.avatar = null; 
      } 
       if (updatedAvatar) {
          const updatedAvatarUrl = await uploadOnCloudinary(updatedAvatar);
          updateData.avatar = updatedAvatarUrl; 
      }

        const updatedUser = await User.findByIdAndUpdate(id,updateData,{
          new:true
        })

        return NextResponse.json(
            {success:true,message:"User Updated Successfully",updatedUser},
            {status:200}
        )

    } catch (error) {
          return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
          )
    }
}

