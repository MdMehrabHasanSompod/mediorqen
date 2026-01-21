"use client"
import { useSuperAdminStore } from '@/src/store/super-admin.store';
import axios from 'axios';
import { Loader2, LogOut, MenuSquare, RotateCcw,Trash2, UploadIcon, User, Wrench } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent,useState } from 'react'

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SuperAdminProfile = ({setOpenMobileSidebar}:propType) => {
  const superAdmin = useSuperAdminStore((state)=>state.superAdmin)
  const session = useSession()
  const setSuperAdmin = useSuperAdminStore((state)=>state.setSuperAdmin)
  const [updateProfile,setUpdateProfile] = useState<boolean>(false)
  const [updatedAvatar,setUpdatedAvatar] = useState<File | null >()
  const [displayUpdatedAvatar, setDisplayUpdatedAvatar] = useState<string | undefined>(superAdmin?.avatar as string)
  const [updatedName,setUpdatedName] = useState<string>(superAdmin?.name as string)
  const [updatedPhone,setUpdatedPhone] = useState<string>(superAdmin?.phone as string)
  const [loading,setLoading] =  useState<boolean>(false)
  const [removeAvatar, setRemoveAvatar] = useState<boolean>(false);
  const router = useRouter()

    const removeImage = () => {
     if (displayUpdatedAvatar && displayUpdatedAvatar.startsWith("blob:")) {
      URL.revokeObjectURL(displayUpdatedAvatar);
     }
      setDisplayUpdatedAvatar(undefined);
      setUpdatedAvatar(null);
      const input = document.getElementById("image") as HTMLInputElement | null;
      if (input) input.value = "";
      setRemoveAvatar(true);
    };
  
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
       if (displayUpdatedAvatar && displayUpdatedAvatar.startsWith("blob:")) {
       URL.revokeObjectURL(displayUpdatedAvatar);
      }
      setUpdatedAvatar(file);
      setDisplayUpdatedAvatar(URL.createObjectURL(file));
    };

  
  const handleSuperAdminUpdate = async(e:FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
     const formData = new FormData();
     if (superAdmin?._id) formData.append("id",superAdmin._id)
     if(session.data?.user.role) formData.append("role",session.data.user.role)
     if (updatedName !== superAdmin?.name) formData.append("updatedName", updatedName);
     if (updatedPhone !== superAdmin?.phone) formData.append("updatedPhone", updatedPhone);
     if (updatedAvatar) formData.append("updatedAvatar", updatedAvatar);
     if (removeAvatar) formData.append("removeAvatar", "true");
      
      const result = await axios.patch("/api/super-admin/update-profile",formData)

      console.log(result);

      if(result.data.success){
        setSuperAdmin(result.data.updatedSuperAdmin)
        setUpdatedName(result.data.updatedSuperAdmin.name);
        setUpdatedPhone(result.data.updatedSuperAdmin.phone);
        setDisplayUpdatedAvatar(result.data.updatedSuperAdmin.avatar);
        setUpdatedAvatar(null); 
        setRemoveAvatar(false);
      }
      
      setLoading(false)
      setUpdateProfile(false)


    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }


  return (
   <div className='w-full mx-auto'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>Super Admin Profile<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/></h1>
      <div className='w-full flex flex-col md:flex-row mt-10 gap-4'>
      <div className='m-2 flex flex-col flex-1 gap-3'>
      <div className='bg-blue-200 p-6 rounded-lg flex flex-col gap-2'>
       {updateProfile ? (<>
          <div className='bg-blue-50 p-6 rounded-lg flex flex-col gap-3'>
            <div>
              <input
                type="text"
                name="updatedName"
                placeholder="New Name"
                className="form-input"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="updatedPhone"
                placeholder="New Phone"
                className="form-input"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
                required
              />
            </div>
            <div className='mt-3'>
             <h3 className="text-lg font-semibold text-gray-700 mb-3">Update Avatar</h3>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <label
                            htmlFor="image"
                            className="flex cursor-pointer items-center justify-center gap-2  rounded-lg border-2 border-gray-300 px-5 py-3 text-md font-medium text-gray-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition w-full md:w-auto"
                          >
                            <UploadIcon size={18} />
                            Upload New Avatar
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            id="image"
                            hidden
                            onChange={handleImageChange}
                          />
                          
                          {displayUpdatedAvatar && (
                            <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md border-2 border-blue-600">
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 cursor-pointer right-2 z-10 text-red-500 hover:text-red-700 bg-white p-1.5 rounded-full shadow-sm transition"
                              >
                                <Trash2 size={18} />
                              </button>
                              <Image
                                src={displayUpdatedAvatar}
                                alt="Doctor preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='my-10 flex items-center justify-around gap-3'>
                        <button onClick={()=>setUpdateProfile(false)} className='bg-red-500 shadow-md px-4 py-2 rounded-md text-white font-semibold cursor-pointer hover:bg-red-600'>Cancel Update</button>
                        <button onClick={handleSuperAdminUpdate} className='bg-green-500 shadow-md px-4 py-2 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-green-600'>{loading && <Loader2 size={18} className='animate-spin' />}Save Update</button>
                      </div>
          </div>
       </>) :(<>
       <div className='bg-blue-200 p-6 rounded-lg flex flex-col gap-2'>
          <div className="w-36 h-36 sm:w-40 sm:h-40 mt-6 lg:w-50 lg:h-50 rounded-full overflow-hidden border-4 border-blue-400 mb-5 mx-auto">
            {superAdmin?.avatar ? <Image className="object-cover w-full h-full" src={superAdmin?.avatar} alt={superAdmin?.name} width={200} height={200}/>
            :<User  className="object-cover w-full h-full bg-blue-600 text-white"/>
          }
          </div>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Name:</span> {superAdmin?.name}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Email:</span> {superAdmin?.email}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Phone:</span> {superAdmin?.phone === undefined ? "Not Provided":superAdmin?.phone}</p>
          <button onClick={()=>setUpdateProfile(true)} className='bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-center px-4 py-3 mt-2 cursor-pointer text-md font-semibold'>Update Profile</button>
         </div>
          </>
        )}
     </div>
      </div>
      <div className='m-2 flex flex-col gap-2 flex-1 bg-blue-200 rounded-md p-2'>
      <div className='my-10'>
        <h2 className='text-blue-900 text-2xl font-semibold text-center flex items-center justify-center gap-1'><Wrench size={24}/> Manage Account</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
          <button onClick={()=> signOut()} className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'><LogOut size={18}/>Logout Now</button>
          <button onClick={()=>router.push("/super-admin/reset-password")} className='bg-blue-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-blue-600'><RotateCcw size={18}/> Reset Password</button>
        </div>
     </div>
   
      </div>
    </div>
    </div>
  )
}

export default SuperAdminProfile