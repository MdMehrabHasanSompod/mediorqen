"use client"
import React from 'react'
import AppointmentTimer from './AppointmentTimer'
import { HeartHandshake, LucideClipboardPenLine, PlusCircle, UserCircle } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className='w-full mx-auto'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2'>Patient Dashboard</h1>
      <div className='flex flex-col md:flex-row items-center justify-center gap-4 mt-10'>
        <div className='bg-yellow-500 w-75 p-5 shadow-lg rounded-lg hover:bg-yellow-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-5xl font-semibold text-white'>6</p>
            <p className='text-center text-xl font-semibold text-white'>Total Appointments</p>
        </div>
       <div className='bg-green-500 w-75 p-5 shadow-lg rounded-lg hover:bg-green-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-5xl font-semibold text-white'>6</p>
            <p className='text-center text-xl font-semibold text-white'>Appointments Completed</p>
        </div>
         <div className='bg-blue-500 w-75 p-5 shadow-lg rounded-lg hover:bg-blue-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-5xl font-semibold text-white'>6</p>
            <p className='text-center text-xl font-semibold text-white'>Appointments Pending</p>
        </div>
    <div className='bg-red-500 w-75 p-5 shadow-lg rounded-lg hover:bg-red-600 hover:scale-102 ease-in-out transition duration-300'>
            <p className='text-center my-2 text-5xl font-semibold text-white'>6</p>
            <p className='text-center text-xl font-semibold text-white'>Appointments Cancelled</p>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-10'>
      <div className='m-6 flex flex-col gap-2'>
       <h2 className=' bg-blue-500 rounded-lg my-2 px-5 py-3 text-lg font-semibold text-white text-center'>Upcoming Appointments</h2>
        <div className='bg-blue-300 p-5 rounded-lg flex flex-col gap-2'>
          <p ><span className='font-semibold'>Doctor Name:</span> Doctor name</p>
          <p><span className='font-semibold'>Speciality:</span> Cardiology</p>
          <p><span className='font-semibold'>Date:</span> 15 Jan 2026</p>
          <p><span className='font-semibold'>Time:</span> 3:00 - 3:30 </p>
          <p><span className='font-semibold'>Payment:</span> <span className="text-white bg-green-600 rounded-md px-2 py-1">Paid</span></p>
          <button className='bg-red-600 hover:bg-red-500 rounded-full text-white text-center px-4 py-2 mt-2 cursor-pointer text-sm font-semibold'>Cancel Appointment</button>
        </div>
        <div className='bg-blue-300 p-5 rounded-lg flex flex-col gap-2'>
          <p ><span className='font-semibold'>Doctor Name:</span> Doctor name</p>
          <p><span className='font-semibold'>Speciality:</span> Cardiology</p>
          <p><span className='font-semibold'>Date:</span> 15 Jan 2026</p>
          <p><span className='font-semibold'>Time:</span> 3:00 - 3:30 </p>
          <p><span className='font-semibold'>Payment:</span> <span className="text-white bg-red-700 rounded-md px-2 py-1">Unpaid</span></p>
          <button className='bg-red-600 hover:bg-red-500 rounded-full text-white text-center px-4 py-2 mt-2 cursor-pointer text-sm font-semibold'>Cancel Appointment</button>
        </div>
         <div className='bg-blue-300 p-5 rounded-lg flex flex-col gap-2'>
          <p ><span className='font-semibold'>Doctor Name:</span> Doctor name</p>
          <p><span className='font-semibold'>Speciality:</span> Cardiology</p>
          <p><span className='font-semibold'>Date:</span> 15 Jan 2026</p>
          <p><span className='font-semibold'>Time:</span> 3:00 - 3:30 </p>
          <p><span className='font-semibold'>Payment:</span> <span className="text-white bg-red-700 rounded-md px-2 py-1">Unpaid</span></p>
          <button className='bg-red-600 hover:bg-red-500 rounded-full text-white text-center px-4 py-2 mt-2 cursor-pointer text-sm font-semibold'>Cancel Appointment</button>
        </div>
      </div>
      <div className='m-6 flex flex-col gap-1 col-span-2'>
       <div className='flex flex-col gap-2 w-full md:w-[80%] mx-auto bg-blue-50 p-5 rounded-lg shadow-lg'>
        <AppointmentTimer appointmentDateTime="2026-01-15T15:00:00"/>
        <h3 className='mt-5 text-blue-900 font-semibold text-lg'>Doctor Name: Anil Basu</h3>
        <p className='text-blue-900 font-semibold text-lg'>Speciality: Cardiology</p>
        <p className=' text-blue-900 font-semibold text-lg'>Date: 15 Jan 2026</p>
        <p className=' text-blue-900 font-semibold text-lg'>Slot: 3:00 - 3:30</p>
        <p className=' text-blue-900 font-semibold text-lg'>Appointment Type: <span className='bg-blue-500 text-white rounded-full px-3 py-1'>Online</span></p>
        <div className='flex items-center gap-2 justify-center mt-5'>
        <button className='bg-blue-500 px-4 py-2  cursor-pointer hover:bg-blue-600 text-white rounded-full'>View Doctor</button>
        <button className='bg-red-500 px-4 py-2  cursor-pointer hover:bg-red-600 text-white rounded-full'>Cancel Appointment</button>
        </div>
       </div>
       <div className='flex flex-col gap-2 w-full md:w-[80%] mt-5 mx-auto bg-blue-50 shadow-lg p-5 rounded-lg'>
        <h3 className='text-xl text-blue-900 font-semibold'>Quick Actions</h3>
        <div className='flex gap-3 mt-5 items-center justify-center'>
        <button className='bg-blue-200 flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><PlusCircle size={20}/>Book Appointment</button>
        <button className='bg-blue-200 flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><UserCircle size={20} /> Update Profile</button>
        <button className='bg-blue-200 flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><LucideClipboardPenLine size={20}/> See Prescription</button>
        <button className='bg-blue-200 flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer hover:bg-blue-300 text-blue-900 font-semibold hover:scale-105 transition-transform duration-500'><HeartHandshake size={20}/> Contact</button>
        </div>
       </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard