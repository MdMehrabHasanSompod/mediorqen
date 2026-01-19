"use client"
import { BriefcaseMedical, ClipboardPlus, Home, LayoutDashboard, LogOut, User, X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type propType = {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DoctorMobileSidebar = ({setCurrentMenu,setOpenMobileSidebar}:propType) => {
      const router = useRouter()



  return (
    <>
    <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={()=>setOpenMobileSidebar(false)}/>
    <aside className="fixed top-0 left-0 z-50 h-screen w-[70%] md:w-[30%] bg-blue-300 border-r-2 border-blue-500  flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden">
     <div className="flex items-center justify-between gap-4 mx-2 lg:mx-4 py-2 text-blue-900 font-semibold">
      <div className="flex items-center justify-center gap-1 cursor-pointer transition-opacity duration-600" onClick={()=>router.push("/")}>
       <Home className='w-5 h-5'/>
       <p className="text-md lg:text-xl transition-opacity duration-300">
         Home
       </p>
       </div>     
       <X className='w-5 h-5 cursor-pointer' onClick={()=>setOpenMobileSidebar(false)}/>
       </div>
       <hr className="text-blue-500 bg-blue-500 h-0.5" />
        <div className="my-3 font-semibold overflow-hidden">
          <div className="flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3" onClick={()=>setCurrentMenu("dashboard")}>
            <LayoutDashboard className='w-6 h-6'/>
            <p className="text-md lg:text-lg transition-opacity duration-300">
            Dashboard
            </p>
          </div>   
          <div className="flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3" onClick={()=>setCurrentMenu("doctor-appointments")}>
            <ClipboardPlus className='w-6 h-6'/>
            <p className="text-md lg:text-lg transition-opacity duration-300">
            Appointments
            </p>
          </div>  
         <div className="flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3" onClick={()=>setCurrentMenu("my-patients")}>
            <BriefcaseMedical className='w-6 h-6'/>
            <p className="text-md lg:text-lg transition-opacity duration-300">
            My Patients
            </p>
          </div>  
         <div className="flex items-center justify-start gap-1 hover:bg-blue-200 cursor-pointer text-blue-900 hover:text-blue-800  transition-opacity duration-600 px-2 lg:px-4 py-3" onClick={()=>setCurrentMenu("doctor-profile")}>
            <User className='w-6 h-6'/>
            <p className="text-md lg:text-lg transition-opacity duration-300">
            Profile
            </p>
          </div>  
        </div>
        <div className='mt-auto px-4 py-2'>
        <button
        onClick={()=>signOut()}
         className="w-full flex items-center justify-center  gap-1 mx-auto py-2 my-2 text-red-600 font-semibold bg-red-100 hover:bg-red-200 rounded-full cursor-pointer">   
        <p className="text-md lg:text-xl transition-opacity duration-300">
         Logout
       </p>
        <LogOut className='w-5 h-5'/>
        </button>
        </div>
     </aside>
     </>
  )
}

export default DoctorMobileSidebar