"use client"
import React, { useState } from 'react'
import { FileEdit, Heart, HeartHandshake, Loader2, LucideClipboardPenLine, MenuSquare, Microscope, PlusCircle, Users} from 'lucide-react'
import { useAppointmentStore } from '@/src/store/appointment.store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Dashboard = ({setOpenMobileSidebar}:propType) => {
  const session = useSession()
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const setAppointments = useAppointmentStore((state)=>state.setAppointments)
  const appointments = useAppointmentStore((state)=>state.appointments)
  const nextAppointment = useAppointmentStore((state) => {
  const upcoming = state.appointments.filter(
    (a) =>
      a.status === "Confirmed" &&
      new Date(a.date) >= new Date()
  );

  upcoming.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }

    return a.slot.localeCompare(b.slot);
  });

  return upcoming[0] || null; 
});

  const handleCancelAppointment = async(appointmentId:string) => {
    try {
      setLoadingId(appointmentId)
      const result = await axios.patch("/api/user/cancel-appointment",{
        userId: session.data?.user.id, role: session.data?.user.role, appointmentId
      })
      
      if(result.data.success){
        const updatedAppointments = appointments.map((appointment)=>appointment._id === appointmentId ? {...appointment,status:"Cancelled" as const}:appointment)
        setAppointments(updatedAppointments)
      }

     setLoadingId(null)
    } catch (error) {
      console.log(error);
      setLoadingId(null)
    }
  }

  return (
    <div className='w-full mx-auto overflow-x-hidden'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>Patient Dashboard<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/></h1>
      <div className='flex flex-col items-center justify-center gap-4 mt-10'>
        <p className='text-3xl font-semibold text-blue-900 flex items-center justify-center gap-1'>Welcome Back <Heart size={40} fill='red' strokeWidth={0}/></p>
        <p className='text-4xl font-bold text-blue-800'>{session.data?.user.name}</p>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-center gap-8 md:gap-2 mt-20 '>
      <div className='flex-1 flex-col gap-1 '>
      <h2 className='text-xl  text-blue-900 font-semibold  text-center bg-blue-200 w-full py-4 px-8 shadow-md rounded-md my-2'>Next Appointment</h2>
     {
      nextAppointment ? (  <div className='flex flex-col gap-2 w-full mx-auto bg-blue-50 p-5 rounded-lg shadow-lg'>
        <h3 className='mt-5 text-blue-900 font-semibold text-md lg:text-lg'>Doctor Name: {nextAppointment.doctorId.name}</h3>
        <p className='text-blue-900 font-semibold text-md lg:text-lg'>Speciality: {nextAppointment.doctorId.speciality}</p>
         <p className='text-blue-900 font-semibold text-md lg:text-lg flex items-center gap-2'>Availability: <span className={`w-3 h-3 rounded-full ${
            nextAppointment.doctorId.availability ? 'bg-green-500 animate-[ping_2s_linear_2s_infinite]' : 'bg-red-700'
          }`}
        ></span>
        <span className={`text-xs font-semibold ${nextAppointment.doctorId.availability ? "text-green-600":"text-red-600"}`}>
          {nextAppointment.doctorId.availability ? 'Available' : 'Unavailable'}
        </span></p>
        <p className=' text-blue-900 font-semibold text-md lg:text-lg'>Date: {new Date(nextAppointment.date).toLocaleDateString("en-US",{
             day: "2-digit",
             month: "short",
             year: "numeric",
          })}</p>
        <p className=' text-blue-900 font-semibold text-md lg:text-lg'>Slot: {nextAppointment.slot}</p>
        <p className=' text-blue-900 font-semibold text-md lg:text-lg'>Appointment Type: <span className='bg-blue-500 text-white text-md rounded-md px-3 py-1'> {nextAppointment.appointmentType}</span></p>
                  <p><span className='font-semibold'>Payment:</span> <span className={`text-white ${nextAppointment.paymentStatus === "Paid" ? "bg-green-600" : "bg-red-700" } rounded-md px-2 py-1`}>{nextAppointment.paymentStatus}</span></p>
        <div className='flex flex-col lg:flex-row items-center gap-2 justify-center mt-5'>
        <button onClick={()=>router.push(`/doctors/${nextAppointment.doctorId.slug}`)} className='bg-blue-500 px-4 py-2 w-full  cursor-pointer hover:bg-blue-600 text-white rounded-full'>View Doctor</button>
        <button onClick={()=>handleCancelAppointment(nextAppointment._id)} className='bg-red-500 px-4 py-2 w-full flex items-center justify-center justify-around gap-1 cursor-pointer hover:bg-red-600 text-white rounded-full'>{loadingId === nextAppointment._id && <Loader2 size={18} className='animate-spin'/>}Cancel Appointment</button>
        </div>
       </div>) : (<p className='text-center text-gray-600 mt-10'>No Appointment Found</p>)
     }
      </div>
       <div className='flex-1 flex-col gap-2 w-full md:w-[80%] mx-auto bg-blue-50 shadow-lg p-5 rounded-lg'>
        <h3 className='text-xl text-center text-blue-900 mt-5 font-semibold'>Quick Actions</h3>
        <div className='flex flex-col lg:flex-row gap-3 mt-5 items-center justify-center'>
        <button onClick={()=>router.push("/doctors")} className='bg-blue-200 w-full flex items-center justify-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><PlusCircle size={20}/>Book Appointment</button>
        <button onClick={()=>router.push("/user/prescriptions")} className='bg-blue-200 w-full flex items-center justify-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><LucideClipboardPenLine size={20}/>View Prescriptions</button>
        </div>
        <div className='flex flex-col lg:flex-row gap-3 mt-5 items-center justify-center'>
        <button onClick={()=>router.push("/user/test-reports")} className='bg-blue-200 w-full flex items-center justify-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><Microscope size={20}/>View Test Reports</button>
        <button onClick={()=>router.push("/bootcamps")} className='bg-blue-200 w-full flex items-center justify-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><Users size={20}/> Join Bootcamps</button>
        </div>
        <div className='flex flex-col lg:flex-row gap-3 mt-5 items-center justify-center'>
        <button onClick={()=>router.push("/user/test-reports")} className='bg-blue-200 w-full flex items-center justify-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><FileEdit size={20}/>Feedback</button>
        <button onClick={()=>router.push("/contact")} className='bg-blue-200 w-full flex items-center justify-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><HeartHandshake size={20}/> Contact</button>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Dashboard