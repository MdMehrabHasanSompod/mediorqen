"use client"
import React, { useState } from 'react'

import AllAppointments from '../../components/AllAppointments'
import AllDoctors from '../../components/AllDoctors'
import AllPatients from '../../components/AllPatients'
import SuperAdminSidebar from '../../components/SuperAdminSidebar'
import SuperAdminMobileSidebar from '../../components/SuperAdminMobileSidebar'
import AllAdmins from '../../components/AllAdmins'
import SuperAdminProfile from '../../components/SuperAdminProfile'
import Dashboard from '../../components/SuperAdminDashboard'

const SuperAdminDashboard = () => {
  const [currentMenu,setCurrentMenu] = useState("dashboard") 
  const [openMobileSidebar,setOpenMobileSidebar] = useState(false)

  return (
    <div className='min-h-screen flex flex-col md:flex-row w-full'>
       <SuperAdminSidebar setCurrentMenu={setCurrentMenu} />
       {
        openMobileSidebar && <SuperAdminMobileSidebar setCurrentMenu={setCurrentMenu} setOpenMobileSidebar={setOpenMobileSidebar}/>
       }
       <main className='flex-1 w-full  p-5'>
       {
       currentMenu === "dashboard"? < Dashboard setOpenMobileSidebar={setOpenMobileSidebar}/> :  currentMenu === "all-admins" ? <AllAdmins setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "all-appointments" ? <AllAppointments setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "all-doctors" ? <AllDoctors setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "all-patients" ? <AllPatients setOpenMobileSidebar={setOpenMobileSidebar}/>
       : currentMenu === "super-admin-profile" ? <SuperAdminProfile setOpenMobileSidebar={setOpenMobileSidebar}/> : "Invalid Request"
       }
       </main>
    </div>
  )
}

export default SuperAdminDashboard