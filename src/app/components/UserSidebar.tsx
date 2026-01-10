"use client"
import { BriefcaseMedical, ClipboardPlus, Home, LayoutDashboard, LogOut, PanelLeft, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const UserSidebar = () => {
      const [toggleSidebar,setToggleSidebar] = useState<boolean>(false)
      const [showText,setShowText] = useState<boolean>(true)
      const router = useRouter()

useEffect(() => {
     if (toggleSidebar) {
    
    setTimeout(() => setShowText(false), 200);
  } else {
    setTimeout(() => setShowText(true), 200);
  }
}, [toggleSidebar]);


  return (
    <div className={`h-screen md:col-span-3 lg:col-span-2 bg-blue-300 border-r-3 border-blue-500 py-2 hidden md:flex flex-col  transition-all duration-300 ease-in ${toggleSidebar?"w-18":"w-full"}`}>
     <div className={`flex ${toggleSidebar && 'flex-col'} items-center justify-between gap-4 mx-2 lg:mx-4 py-2 text-blue-900 font-semibold`}>
      <div className={`flex items-center justify-center gap-1 cursor-pointer transition-opacity duration-600`} onClick={()=>router.push("/")}>
       <Home className='w-5 h-5'/>
       <p className={`text-md lg:text-xl transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
         Home
       </p>
       </div>     
       <PanelLeft className='w-5 h-5 cursor-pointer' onClick={()=>setToggleSidebar(!toggleSidebar)}/>
       </div>
       <hr className="text-blue-500 bg-blue-500 h-0.5" />
        <div className={`my-3 ${toggleSidebar && "mx-auto"} font-semibold overflow-hidden`}>
          <div className={`flex items-center justify-start gap-1 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3` } onClick={()=>router.push("/")}>
            <LayoutDashboard className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            Dashboard
            </p>
          </div>   
          <div className={`flex items-center justify-start gap-1 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>router.push("/")}>
            <ClipboardPlus className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            Appointments
            </p>
          </div>  
         <div className={`flex items-center justify-start gap-1 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>router.push("/")}>
            <BriefcaseMedical className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            View Doctors
            </p>
          </div>  
         <div className={`flex items-center justify-start gap-1 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>router.push("/")}>
            <User className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            Profile
            </p>
          </div>  
        </div>
        <div className='mt-auto px-4 py-2'>
        <button
        onClick={()=>signOut()}
         className={`w-full flex items-center justify-center  gap-1 mx-auto my-2 text-red-600 font-semibold bg-red-100 hover:bg-red-200  ${toggleSidebar ? "p-2":"px-2 py-1"} rounded-full cursor-pointer`}>   
        <p className={`text-md lg:text-xl transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
         Logout
       </p>
        <LogOut className='w-5 h-5'/>
        </button>
        </div>
     </div>
  )
}

export default UserSidebar