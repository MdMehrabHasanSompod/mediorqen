"use client"
import React, { useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import Dashboard from '../../components/Dashboard'
import Appointments from '../../components/Appointments'
import MyDoctors from '../../components/MyDoctors'
import UserProfile from '../../components/UserProfile'
import UserMobileSidebar from '../../components/UserMobileSidebar'

const SuperAdminDashboard = () => {
  const [currentMenu,setCurrentMenu] = useState("dashboard") 
  const [openMobileSidebar,setOpenMobileSidebar] = useState(false)

  return (
    <div className='min-h-screen flex flex-col md:flex-row w-full'>
       <UserSidebar setCurrentMenu={setCurrentMenu} />
       {
        openMobileSidebar && <UserMobileSidebar setCurrentMenu={setCurrentMenu} setOpenMobileSidebar={setOpenMobileSidebar}/>
       }
       <main className='flex-1 w-full  p-5'>
       {
       currentMenu === "dashboard"? <Dashboard setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "appointments" ? <Appointments setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "my-doctor" ? <MyDoctors setOpenMobileSidebar={setOpenMobileSidebar}/>
       : currentMenu === "profile" ? <UserProfile setOpenMobileSidebar={setOpenMobileSidebar}/> : "Invalid Request"
       }
       </main>
    </div>
  )
}

export default SuperAdminDashboard