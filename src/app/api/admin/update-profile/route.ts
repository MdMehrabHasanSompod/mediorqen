import uploadOnCloudinary from "@/src/app/lib/cloudinary"
import connectDB from "@/src/app/lib/db"
import { User } from "@/src/app/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async(request:NextRequest) => {
    try {
        const formData = await request.formData()
        const id = formData.get("id") as string
        const role = formData.get("role") as string
        const updatedName = formData.get("updatedName") as string
        const updatedPhone = formData.get("updatedPhone") as string 
        const updatedAvatar = formData.get("updatedAvatar") as Blob 
        const removeAvatar = formData.get("removeAvatar") === "true";
        
        if(!id && !role && !updatedName && !updatedPhone  && !updatedAvatar && !removeAvatar){
            return NextResponse.json(
                {success:false,message:"Invalid Update Request"},
                {status:400}
            )
        }

        if(role !== "admin"){
         return NextResponse.json(
            {success:false,message:"Attempted to Unauthorized Access"},
            {status:401}
           )
        }

        interface IUpdateAdminData {
            name?: string;
            phone?: string;
            avatar?:string | null;
        }

        await connectDB()

        const updateData:IUpdateAdminData = {};

       if (updatedName) updateData.name = updatedName;
       if (updatedPhone) updateData.phone = updatedPhone;
       if (removeAvatar && !updatedAvatar) {
          updateData.avatar = null; 
      } 
       if (updatedAvatar) {
          const updatedAvatarUrl = await uploadOnCloudinary(updatedAvatar);
          updateData.avatar = updatedAvatarUrl; 
      }

        const updatedAdmin = await User.findByIdAndUpdate(id,updateData,{
          new:true
        })

        return NextResponse.json(
            {success:true,message:"Admin Updated Successfully",updatedAdmin},
            {status:200}
        )

    } catch (error) {
          return NextResponse.json(
            {success:false,message:"Internal Server Error"},
            {status:500}
          )
    }
}

