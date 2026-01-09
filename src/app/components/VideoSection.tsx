import { assets } from '@/src/assets/assets'
import { Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VideoSection = () => {
  return (
    <section className='my-50 w-[85%] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10'>
        <div className='relative h-60 md:h-100 lg:h-130 w-full lg:w-[50%]'>
            <Image src={assets.teleMedicineImage} alt="Video Appointments" fill className='object-cover border-6 border-blue-700 rounded-2xl shadow-2xl'/>
        </div>
        <div className="mx-auto">
        <h2 className='text-4xl md:text-5xl font-semibold text-blue-700 text-center'>Inbuilt Video Consultation</h2>
        <p className="text-gray-700 text-center max-w-3xl text-xl mx-auto my-6">Our inbuilt video consultation system enables secure, real-time doctor appointments with clear audio and high-quality video for a smooth and reliable care experience.</p>
        <Link href="doctors" className='flex items-center justify-center gap-2 mt-12 bg-blue-100 text-sm md:text-xl font-bold shadow-md max-w-sm  rounded-full px-6 py-3 text-center mx-auto hover:scale-102 transition-transform duration-300'><Video size={28} className='text-red-600'/>Get Appointment Now</Link>
        </div>
     
    </section>
  )
}

export default VideoSection