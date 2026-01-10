"use client"
import { Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import UserSidebar from '../../components/UserSidebar'

const UserDashboard = () => {
  const [currentMenu,setCurrentMenu] = useState("dashboard") 

  return (
    <div className='min-h-screen relative grid grid-cols-12 w-full'>
       <UserSidebar/>
       <div className='col-span-10'></div>
    </div>
  )
}

export default UserDashboard