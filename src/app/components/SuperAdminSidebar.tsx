"use client"
import { BriefcaseMedical, ClipboardPlus, Home, LayoutDashboard, LogOut, PanelLeft, PlusCircle, ShieldUser, User, Users } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type propType = {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>
}

const SuperAdminSidebar = ({setCurrentMenu}:propType) => {
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
    <aside className={`h-screen sticky top-0 overflow-y-auto  bg-blue-300 border-r-3 border-blue-500 py-2 hidden lg:flex flex-col transition-all duration-300 ease-in ${toggleSidebar?"w-18":"w-60"}`}>
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
        <div className={`my-3 ${toggleSidebar && "mx-auto"} font-semibold overflow-y-auto`}>
          <div className={`flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3` } onClick={()=>setCurrentMenu("dashboard")}>
            <LayoutDashboard className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            Dashboard
            </p>
          </div> 
         <div className={`flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800 transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>setCurrentMenu("all-admins")}>
            <ShieldUser className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            All Admins
            </p>
          </div>   
          <div className={`flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800 transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>setCurrentMenu("all-doctors")}>
            <BriefcaseMedical className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            All Doctors
            </p>
          </div>  
         <div className={`flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800 transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>setCurrentMenu("all-patients")}>
            <Users className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            All Patients
            </p>
          </div>  
          <div className={`flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800 transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>setCurrentMenu("all-appointments")}>
            <ClipboardPlus className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
           All Appointments
            </p>
          </div> 
         <div className={`flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800 transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>router.push("/super-admin/add-admin")}>
            <PlusCircle className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            Add Admin
            </p>
          </div> 
         <div className={`flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800 transition-opacity duration-600 px-2 lg:px-4 py-3`} onClick={()=>setCurrentMenu("super-admin-profile")}>
            <User className='w-6 h-6'/>
            <p className={`text-md lg:text-lg transition-opacity duration-300 ${toggleSidebar ? "opacity-0" : "opacity-100"} ${showText ? "block" : "hidden"}`}>
            Super Admin Profile
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
     </aside>
  )
}

export default SuperAdminSidebar