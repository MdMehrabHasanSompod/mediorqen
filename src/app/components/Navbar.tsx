"use client"
import {useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AvatarDropdown from './AvatarDropdown'

const Navbar = () => {
  const session = useSession()
  return (
 <nav className="w-[95%] max-w-4xl mt-2 mx-auto fixed left-1/2 transform -translate-x-1/2 flex items-center justify-between gap-20 bg-blue-500 rounded-lg px-4 py-2 shadow-lg">
           <Image src='/logo.png' width={300} height={300} alt='MediOrqen'/>
           <div className='text-white font-bold text-xl flex items-center justify-between gap-3'>
            <Link href="/doctors">Doctors</Link>
            <Link href="/services">Services</Link>
          {!session.data?.user ? <Link href="/login">Login</Link> : 
            (
            <AvatarDropdown user={session.data?.user} />)}
          </div>
    </nav>
  )
}

export default Navbar