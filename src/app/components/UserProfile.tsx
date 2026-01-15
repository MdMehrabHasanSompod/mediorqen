"use client"
import { useUserStore } from '@/src/store/user.store';
import axios from 'axios';
import { Loader2, LogOut, MenuSquare, PlusCircle, RotateCcw, Settings, Trash2, UploadIcon, User, Wrench } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent,useState } from 'react'

const BloodGroup:string[] = [
      "A+" , "A-" , "B+" , "B-" , "AB+" , "AB-" , "O+" , "O-"
]

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const UserProfile = ({setOpenMobileSidebar}:propType) => {
  const user = useUserStore((state)=>state.user)
  const session = useSession()
  const setUser = useUserStore((state)=>state.setUser)
  const [updateProfile,setUpdateProfile] = useState<boolean>(false)
  const [updatedAvatar,setUpdatedAvatar] = useState<File | null >()
  const [displayUpdatedAvatar, setDisplayUpdatedAvatar] = useState<string | undefined>(user?.avatar as string)
  const [updatedName,setUpdatedName] = useState<string>(user?.name as string)
  const [updatedPhone,setUpdatedPhone] = useState<string>(user?.phone as string)
  const [updatedGender,setUpdatedGender] = useState<string>(user?.gender as string)
  const [updatedAge,setUpdatedAge] = useState<string>(user?.age?.toString() as string)
  const [updatedBloodGroup,setUpdatedBloodGroup] = useState<string>(user?.bloodGroup as string)
  const [loading,setLoading] =  useState<boolean>(false)
  const [removeAvatar, setRemoveAvatar] = useState<boolean>(false);
  const router = useRouter()

    const removeImage = () => {
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
      setUpdatedAvatar(file);
      setDisplayUpdatedAvatar(URL.createObjectURL(file));
    };
  
  const handleUserUpdate = async(e:FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData();
     if (user?._id) formData.append("id",user._id)
     if (updatedName !== user?.name) formData.append("updatedName", updatedName);
     if (updatedPhone !== user?.phone) formData.append("updatedPhone", updatedPhone);
     if (updatedGender !== user?.gender) formData.append("updatedGender", updatedGender);
     if (updatedAge !== user?.age?.toString()) formData.append("updatedAge", updatedAge.toString());
     if (updatedBloodGroup !== user?.bloodGroup) formData.append("updatedBloodGroup", updatedBloodGroup);
     if (updatedAvatar) formData.append("updatedAvatar", updatedAvatar);
     if (removeAvatar) formData.append("removeAvatar", "true");
      
      const result = await axios.patch("/api/user/update-user",formData)

      console.log(result);

      if(result.data.success){
          setUser(result.data.updatedUser)
        setUpdatedName(result.data.updatedUser.name);
        setUpdatedPhone(result.data.updatedUser.phone);
        setUpdatedGender(result.data.updatedUser.gender);
        setUpdatedAge(result.data.updatedUser.age);
        setUpdatedBloodGroup(result.data.updatedUser.bloodGroup);
        setDisplayUpdatedAvatar(result.data.updatedUser.avatar);
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

const handleAddAccount = async () => {
  await signOut({ redirect: false });
  router.push("/register");
};

const handleDeleteAccount = async() => {
     setLoading(true)
  try {
    const result = await fetch(`/api/user/delete-account?id=${user?._id}&role=${session.data?.user.role}`,{method:"DELETE"})
    setLoading(false) 
    if(result.ok){
      await signOut({ redirect: false });
       router.push("/")
    }
 
  } catch (error) {
    console.log(error);
    setLoading(false)
  }
}


  return (
   <div className='w-full mx-auto'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>Patient Profile<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/></h1>
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
             <div>
              <input
                type="number"
                name="updatedAge"
                placeholder="New Age"
                className="form-input"
                value={updatedAge}
                onChange={(e) => setUpdatedAge(e.target.value)}
                required
              />
            </div>
             <div>
              <select
                name="updatedGender"
                value={updatedGender}
                onChange={(e) => setUpdatedGender(e.target.value)}
                className="form-select"
                required
              >
                <option value="" className="select-option">Select Gender</option>
                <option value="Male" className="select-option">Male</option>
                <option value="Female" className="select-option">Female</option>
                <option value="Others" className="select-option">Others</option>
              </select>
            </div>
              <div>
              <select
                name="updatedBloodGroup"
                value={updatedBloodGroup}
                onChange={(e) => setUpdatedBloodGroup(e.target.value)}
                className="form-select"
                required
              >
                <option value="" className="select-option">Select Blood Group</option>
                {BloodGroup.map((item) => (
                  <option key={item} value={item} className="select-option">
                    {item}
                  </option>
                ))}
              </select>
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
                        <button onClick={handleUserUpdate} className='bg-green-500 shadow-md px-4 py-2 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-green-600'>{loading && <Loader2 size={18} className='animate-spin' />}Save Update</button>
                      </div>
          </div>
       </>) :(<>
       <div className='bg-blue-200 p-6 rounded-lg flex flex-col gap-2'>
          <div className="w-36 h-36 sm:w-40 sm:h-40 mt-6 lg:w-50 lg:h-50 rounded-full overflow-hidden border-4 border-blue-400 mb-5 mx-auto">
            {user?.avatar ? <Image className="object-cover w-full h-full" src={user?.avatar} alt={user?.name} width={200} height={200}/>
            :<User  className="object-cover w-full h-full bg-blue-600 text-white"/>
          }
          </div>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Name:</span> {user?.name}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Email:</span> {user?.email}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Phone:</span> {user?.phone === undefined ? "Not Provided":user?.phone}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Age:</span>{user?.age === undefined ? "Not Provided":user?.age}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Gender:</span> {user?.gender === undefined ? "Not Provided":user?.gender}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Blood Group:</span> {user?.bloodGroup === undefined ? "Not Provided":user?.bloodGroup}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Joined At:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US"):""}</p>
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
          <button onClick={handleAddAccount} className='bg-yellow-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-yellow-600'>{loading?<Loader2 size={18} className='animate-spin' />: <PlusCircle size={18}/>} Add Account</button>
        </div>
     </div>
     <hr className="text-blue-500 bg-blue-500 h-0.5" />
     <div className='mt-10'>
        <h2 className='text-blue-900 text-2xl font-semibold text-center flex items-center justify-center gap-1'><Settings size={24}/> Account Settings</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
          <button onClick={()=>router.push("/user/reset-password")} className='bg-blue-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-blue-600'><RotateCcw size={18}/> Reset Password</button>
          <button onClick={handleDeleteAccount} className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'>{loading?<Loader2 size={18} className='animate-spin' />: <Trash2 size={18}/>}  Delete Account</button>
        </div>
     </div>
   
      </div>
    </div>
    </div>
  )
}

export default UserProfile