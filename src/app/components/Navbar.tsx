import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
 <nav className="w-[95%] max-w-4xl mt-2 mx-auto fixed left-1/2 transform -translate-x-1/2 flex items-center justify-between gap-20 bg-blue-500 rounded-lg px-4 py-2 shadow-lg">
            <Image src='/logo.png' width={300} height={300} alt='MediOrqen'/>
        <div className='text-white font-semibold flex items-center justify-between gap-2'>
            <Link href="/doctors">Doctors</Link>
            <Link href="/register">Register</Link>
            <div>
            
            </div>
        </div>
    </nav>
  )
}

export default Navbar