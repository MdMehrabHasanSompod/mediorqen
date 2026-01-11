"use client"
import { useUserStore } from '@/src/store/user.store';
import axios from 'axios';
import { LogOut, PlusCircle, RotateCcw, Settings, Trash2, User, Wrench } from 'lucide-react'
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const UserProfile = () => {
  const user = useUserStore((state)=>state.user)
  console.log("Avatar URL:", user?.avatar);

  return (
   <div className='w-full mx-auto'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2'>Patient Profile</h1>
      <div className='w-full flex flex-col md:flex-row mt-10 gap-4'>
      <div className='m-2 flex flex-col flex-1 gap-3'>
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
          <button className='bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-center px-4 py-3 mt-2 cursor-pointer text-md font-semibold'>Update Profile</button>
        </div>
      </div>
      <div className='m-2 flex flex-col gap-2 flex-1 bg-blue-200 rounded-md p-2'>
      <div className='my-10'>
        <h2 className='text-blue-900 text-2xl font-semibold text-center flex items-center justify-center gap-1'><Wrench size={24}/> Manage Account</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
          <button className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'><LogOut size={18}/>Logout Now</button>
          <button className='bg-yellow-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-yellow-600'><PlusCircle size={18}/>Add Account</button>
        </div>
     </div>
     <hr className="text-blue-500 bg-blue-500 h-0.5" />
     <div className='mt-10'>
        <h2 className='text-blue-900 text-2xl font-semibold text-center flex items-center justify-center gap-1'><Settings size={24}/> Account Settings</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
          <button className='bg-blue-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-blue-600'><RotateCcw size={18}/> Reset Password</button>
          <button className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'><Trash2 size={18}/> Delete Account</button>
        </div>
     </div>
   
      </div>
    </div>
    </div>
  )
}

export default UserProfile