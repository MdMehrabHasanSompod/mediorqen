"use client"
import React, { useState } from 'react'
import Dashboard from '../../components/AdminDashboard'
import AllAppointments from '../../components/AllAppointments'
import AllDoctors from '../../components/AllDoctors'
import AdminProfile from '../../components/AdminProfile'
import AdminSidebar from '../../components/AdminSidebar'
import AdminMobileSidebar from '../../components/AdminMobileSidebar'
import AllPatients from '../../components/AllPatients'

const AdminDashboard = () => {
  const [currentMenu,setCurrentMenu] = useState("dashboard") 
  const [openMobileSidebar,setOpenMobileSidebar] = useState(false)

  return (
    <div className='min-h-screen flex flex-col md:flex-row w-full'>
       <AdminSidebar setCurrentMenu={setCurrentMenu} />
       {
        openMobileSidebar && <AdminMobileSidebar setCurrentMenu={setCurrentMenu} setOpenMobileSidebar={setOpenMobileSidebar}/>
       }
       <main className='flex-1 w-full  p-5'>
       {
       currentMenu === "dashboard"? < Dashboard setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "all-appointments" ? <AllAppointments setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "all-doctors" ? <AllDoctors setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "all-patients" ? <AllPatients setOpenMobileSidebar={setOpenMobileSidebar}/>
       : currentMenu === "admin-profile" ? <AdminProfile setOpenMobileSidebar={setOpenMobileSidebar}/> : "Invalid Request"
       }
       </main>
    </div>
  )
}

export default AdminDashboard