"use client"
import {useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AvatarDropdown from './AvatarDropdown'

const Navbar = () => {
  const session = useSession()
  return (
 <nav className="w-[95%] max-w-5xl h-18 md:h-22 lg:h-25 z-50 mt-2 mx-auto fixed left-1/2 transform -translate-x-1/2 flex items-center justify-between gap-20 bg-blue-500 rounded-lg px-6 py-2 shadow-lg">
           <Link href="/" onClick={()=>scrollTo(0,0)}>
           <Image src='/logo.png' width={300} height={80} alt='MediOrqen' className='w-54 h-13 md:w-60 md:h-16 hover:cursor-pointer'/>
           </Link>
           <div className='text-white font-bold text-xl hidden md:flex items-center justify-between gap-3'>
            <Link href="/doctors">Doctors</Link>
            <Link href="/services">Services</Link>
            <Link href="/Helpline">Helpline</Link>
          {!session.data?.user ? <Link href="/login">Login</Link> : 
            (
            <AvatarDropdown user={session.data?.user} />)}
          </div>
    </nav>
  )
}

export default Navbar