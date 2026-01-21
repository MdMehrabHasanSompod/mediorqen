"use client"
import React, { useState } from 'react'
import {Loader2, MenuSquare} from 'lucide-react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useAdminStore } from '@/src/store/admin.store'

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AllAppointments = ({setOpenMobileSidebar}:propType) => {
  const appointments = useAdminStore((state)=>state.appointments)
  const setAppointments = useAdminStore((state)=>state.setAppointments)
  const session = useSession()
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const upcomingAppointments = appointments.filter(
  (appointment) => appointment.status === "Confirmed"
);
  const cancelledAppointments =  appointments.filter(
  (appointment) => appointment.status === "Cancelled"
  );
  const completedAppointments =  appointments.filter(
  (appointment) => appointment.status === "Completed"
  );

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
    <div className='w-full mx-auto'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>All Appointments<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/></h1>
      <div className='flex flex-col md:flex-row items-center justify-center gap-4 mt-10'>
        <div className='bg-yellow-500 w-full p-5 shadow-lg rounded-lg hover:bg-yellow-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white'>{appointments.length}</p>
            <p className='text-center text-xl font-semibold text-white'>Total Appointments</p>
        </div>
       <div className='bg-green-500 w-full p-5 shadow-lg rounded-lg hover:bg-green-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white'>{appointments.filter((appointment)=>appointment.status==="Completed").length}</p>
            <p className='text-center text-xl font-semibold text-white'>Appointments Completed</p>
        </div>
         <div className='bg-blue-500 w-full text-2xl p-5 shadow-lg rounded-lg hover:bg-blue-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white'>{appointments.filter((appointment)=>appointment.status==="Confirmed").length}</p>
            <p className='text-center text-xl font-semibold text-white'>Appointments Pending</p>
        </div>
    <div className='bg-red-500 w-full p-5 shadow-lg rounded-lg hover:bg-red-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white'>{appointments.filter((appointment)=>appointment.status==="Cancelled").length}</p>
            <p className='text-center text-xl font-semibold text-white'>Appointments Cancelled</p>
        </div>
      </div>
      <div className='w-full flex flex-col md:flex-row mt-10'>
      <div className='m-6 flex-1 flex-col gap-2'>
       <h2 className=' bg-blue-500 rounded-lg my-2 px-5 py-3 text-lg font-semibold text-white text-center'>Upcoming Appointments</h2>
       {upcomingAppointments.length === 0 ? (
        <div className="mt-10 p-6 rounded-lg text-center text-gray-600 font-medium">
           No upcoming appointments found
            </div>
          ) : (
          upcomingAppointments.map((appointment) =>(
           <div key={appointment._id} className='bg-blue-300 p-5 mt-5 rounded-lg flex flex-col gap-2'>
           <p ><span className='font-semibold'>Doctor Name:</span> {appointment.doctorId.name}</p>
           <p><span className='font-semibold'>Speciality:</span> {appointment.doctorId.speciality}</p>
           <p className='font-semibold flex items-center gap-2'>Availability: <span className={`w-3 h-3 rounded-full ${
            appointment.doctorId.availability ? 'bg-green-500 animate-[ping_2s_linear_2s_infinite]' : 'bg-red-700'
          }`}
        ></span>
        <span className={`text-xs font-semibold ${appointment.doctorId.availability ? "text-green-600":"text-red-600"}`}>
          {appointment.doctorId.availability ? 'Available' : 'Unavailable'}
        </span></p>
           <p><span className='font-semibold'>Date:</span> {new Date(appointment.date).toLocaleDateString("en-US",{
             day: "2-digit",
             month: "short",
             year: "numeric",
          })}</p>
          <p><span className='font-semibold'>Slot:</span> {appointment.slot}</p>
          <p><span className='font-semibold'>Appointment Type:</span> {appointment.appointmentType}</p>
          <p><span className='font-semibold'>Payment:</span> <span className={`text-white ${appointment.paymentStatus === "Paid" ? "bg-green-600" : "bg-red-700" } rounded-md px-2 py-1`}>{appointment.paymentStatus}</span></p>
          <button onClick={()=>handleCancelAppointment(appointment._id)} className='bg-red-600 hover:bg-red-500 rounded-full text-white flex items-center justify-center gap-1 text-center px-4 py-2 mt-2 cursor-pointer text-sm font-semibold'>{loadingId === appointment._id && <Loader2 size={18} className='animate-spin'/>}Cancel Appointment</button>
        </div>
        ))
       )}
      </div>
        <div className='m-6 flex-1 flex-col gap-2'>
       <h2 className=' bg-green-600 rounded-lg my-2 px-5 py-3 text-lg font-semibold text-white text-center'>Completed Appointments</h2>
       {completedAppointments.length === 0 ? (
        <div className="mt-10 p-6 rounded-lg text-center text-gray-600 font-medium">
           No completed appointments found
            </div>
          ) : (
          completedAppointments.map((appointment) =>(
           <div key={appointment._id} className='bg-green-500 p-5 mt-5 rounded-lg flex flex-col gap-2'>
           <p ><span className='font-semibold'>Doctor Name:</span> {appointment.doctorId.name}</p>
           <p><span className='font-semibold'>Speciality:</span> {appointment.doctorId.speciality}</p>
           <p><span className='font-semibold'>Date:</span> {new Date(appointment.date).toLocaleDateString("en-US",{
             day: "2-digit",
             month: "short",
             year: "numeric",
          })}</p>
          <p><span className='font-semibold'>Slot:</span> {appointment.slot}</p>
          <p><span className='font-semibold'>Appointment Type:</span> {appointment.appointmentType}</p>
          <button></button>
        </div>
        ))
       )}
      </div>
      <div className='m-6 flex-1 flex-col gap-2'>
       <h2 className=' bg-red-500 rounded-lg my-2 px-5 py-3 text-lg font-semibold text-white text-center'>Cancelled Appointments</h2>
       {cancelledAppointments.length === 0 ? (
        <div className="mt-10 p-6 rounded-lg text-center text-gray-600 font-medium">
           No cancelled appointments found
            </div>
          ) : (
          cancelledAppointments.map((appointment) =>(
           <div key={appointment._id} className='bg-red-200 p-5 mt-5  rounded-lg flex flex-col gap-2'>
           <p ><span className='font-semibold'>Doctor Name:</span> {appointment.doctorId.name}</p>
           <p><span className='font-semibold'>Speciality:</span> {appointment.doctorId.speciality}</p>
           <p><span className='font-semibold'>Date:</span> {new Date(appointment.date).toLocaleDateString("en-US",{
             day: "2-digit",
             month: "short",
             year: "numeric",
          })}</p>
          <p><span className='font-semibold'>Slot:</span> {appointment.slot}</p>
          <p><span className='font-semibold'>Appointment Type:</span> {appointment.appointmentType}</p>
          <p><span className='font-semibold'>Payment:</span> <span className={`text-white ${appointment.paymentStatus === "Paid" ? "bg-green-600" : "bg-red-700" } rounded-md px-2 py-1`}>{appointment.paymentStatus}</span></p>
        </div>
        ))
       )}
      </div>
    </div>
    </div>
  )
}

export default AllAppointments