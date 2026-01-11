"use client"
import { Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import Dashboard from '../../components/Dashboard'
import Appointments from '../../components/Appointments'
import MyDoctors from '../../components/MyDoctors'
import UserProfile from '../../components/UserProfile'

const UserDashboard = () => {
  const [currentMenu,setCurrentMenu] = useState("dashboard") 

  return (
    <div className='min-h-screen grid grid-cols-12 w-full'>
       <UserSidebar setCurrentMenu={setCurrentMenu} />
       <main className='md:col-span-9 lg:col-span-10 p-6'>
       {
       currentMenu === "dashboard"? <Dashboard/> : currentMenu === "appointments" ? <Appointments/> : currentMenu === "my-doctor" ? <MyDoctors/>
       : currentMenu === "profile" ? <UserProfile/> : "Invalid Request"
       }
       </main>
    </div>
  )
}

export default UserDashboard