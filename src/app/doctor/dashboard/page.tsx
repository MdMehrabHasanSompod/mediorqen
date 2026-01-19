"use client"
import React, { useState } from 'react'
import DoctorSidebar from '../../components/DoctorSidebar'
import DoctorDashboard from '../../components/DoctorDashboard'
import DoctorMobileSidebar from '../../components/DoctorMobileSidebar'
import DoctorAppointments from '../../components/DoctorAppointments'
import MyPatients from '../../components/MyPatients'
import DoctorProfile from '../../components/DoctorProfile'

const Dashboard = () => {
  const [currentMenu,setCurrentMenu] = useState("dashboard") 
  const [openMobileSidebar,setOpenMobileSidebar] = useState(false)

  return (
    <div className='min-h-screen flex flex-col md:flex-row w-full'>
       <DoctorSidebar setCurrentMenu={setCurrentMenu} />
       {
        openMobileSidebar && <DoctorMobileSidebar setCurrentMenu={setCurrentMenu} setOpenMobileSidebar={setOpenMobileSidebar}/>
       }
       <main className='flex-1 w-full  p-5'>
       {
       currentMenu === "dashboard"? <DoctorDashboard setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "doctor-appointments" ? <DoctorAppointments setOpenMobileSidebar={setOpenMobileSidebar}/> : currentMenu === "my-patients" ? <MyPatients setOpenMobileSidebar={setOpenMobileSidebar}/>
       : currentMenu === "doctor-profile" ? <DoctorProfile setOpenMobileSidebar={setOpenMobileSidebar}/> : "Invalid Request"
       }
       </main>
    </div>
  )
}

export default Dashboard