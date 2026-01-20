"use client"
import React, { useState } from 'react'
import {  Heart,  Loader2, MenuSquare} from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDoctorStore } from '@/src/store/doctor.store';
import { IDoctor } from '@/types/doctor';

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DoctorDashboard = ({setOpenMobileSidebar}:propType) => {
  const session = useSession()
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const doctor = useDoctorStore((state)=> state.doctor)
  const setDoctor = useDoctorStore((state)=>state.setDoctor)
  const setDoctorAppointments = useDoctorStore((state)=>state.setAppointments)
  const doctorAppointments = useDoctorStore((state)=>state.appointments)
  
  const nextAppointment = useDoctorStore((state) => {
  const now = new Date();

  const upcoming = state.appointments.filter((a) => {
    if (a.status !== "Confirmed") return false;

    const appointmentDate = new Date(a.date);
    const [hour, min] = a.slot.split(":").map(Number);
    appointmentDate.setHours(hour, min, 0, 0);

    return appointmentDate >= now;
  });

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
      const result = await axios.patch("/api/doctor/cancel-appointment",{
        doctorId: doctor?._id, role: session.data?.user.role, appointmentId
      })
      
      if(result.data.success){
        const updatedDoctorAppointments = doctorAppointments.map((appointment)=>appointment._id === appointmentId ? {...appointment,status:"Cancelled" as const}:appointment)
        setDoctorAppointments([...updatedDoctorAppointments])
      }

     setLoadingId(null)
    } catch (error) {
      console.log(error);
      setLoadingId(null)
    }
  }

  const toggleAvailability = async () => {
  try {

    const newStatus = doctor?.availability === true ? false : true ;

    const result = await axios.patch("/api/doctor/update-availability", {
      doctorId: doctor?._id,
      role: session.data?.user.role,
      availability: newStatus,
    });

    if (!doctor) return;
  
    if (result.data.success) {
     const updatedDoctor = result.data.updatedDoctor as IDoctor;
      setDoctor({...doctor, availability : updatedDoctor.availability })
    }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className='w-full mx-auto overflow-x-hidden'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>Doctor Dashboard<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/></h1>
      <div className='flex flex-col items-center justify-center gap-4 mt-10'>
        <p className='text-3xl font-semibold text-blue-900 flex items-center justify-center gap-1'>Welcome Back <Heart size={40} fill='red' strokeWidth={0}/></p>
        <p className='text-4xl font-bold text-blue-800'>{session.data?.user.name}</p>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-center gap-8 md:gap-2 mt-20 '>
      <div className='flex-1 flex-col gap-1 '>
      <h2 className='text-xl  text-blue-900 font-semibold  text-center bg-blue-200 w-full py-4 px-8 shadow-md rounded-md my-2'>Next Appointment</h2>
     {
      nextAppointment ? (  <div className='flex flex-col gap-2 w-full mx-auto bg-blue-50 p-5 rounded-lg shadow-lg'>
        <h3 className='mt-5 text-blue-900 font-semibold text-md lg:text-lg'>Patient Name: {nextAppointment.patientId.name}</h3>
        <p className='text-blue-900 font-semibold text-md lg:text-lg'>Age : {nextAppointment.patientId.age}</p>
        <p className='text-blue-900 font-semibold text-md lg:text-lg'>Gender : {nextAppointment.patientId.gender}</p>
        <p className='text-blue-900 font-semibold text-md lg:text-lg'>Blood Group : {nextAppointment.patientId.bloodGroup}</p>
        <p className='text-blue-900 font-semibold text-md lg:text-lg'>Email : {nextAppointment.patientId.email}</p>
        <p className='text-blue-900 font-semibold text-md lg:text-lg'>Phone : {nextAppointment.patientId.phone}</p>
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
        <button onClick={()=>handleCancelAppointment(nextAppointment._id)} className='bg-red-500 px-4 py-2 w-full flex items-center justify-center  gap-1 cursor-pointer hover:bg-red-600 text-white rounded-full'>{loadingId === nextAppointment._id && <Loader2 size={18} className='animate-spin'/>}Cancel Appointment</button>
        </div>
       </div>) : (<p className='text-center text-gray-600 mt-10'>No Appointment Found</p>)
     }
      </div>
      <div className="flex-1 w-full md:w-[80%] mx-auto bg-blue-50 shadow-md p-6 rounded-xl">
  <h3 className="text-2xl font-semibold text-center text-blue-900 mb-6">
    Quick Actions
  </h3>
  <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
<div className="flex items-center gap-3 text-md lg:text-lg font-semibold text-blue-900">
  <p>Set Availability:</p>

  <div
    onClick={toggleAvailability}
    className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg cursor-pointer select-none"
  >
    <span
      className={`w-3 h-3 rounded-full ${
        doctor?.availability
          ? 'bg-green-500 animate-[ping_2s_linear_2s_infinite]'
          : 'bg-red-700'
      }`}
    ></span>
    <span
      className={`font-semibold ${
        doctor?.availability ? 'text-green-600' : 'text-red-600'
      }`}
    >
      {doctor?.availability ? 'Available' : 'Unavailable'}
    </span>
  </div>
</div>


  </div>
</div>
    </div>
    </div>
  )
}

export default DoctorDashboard 