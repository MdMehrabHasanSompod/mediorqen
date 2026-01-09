import React from 'react'
import Counter from './Counter'

const CounterSection = () => {
  return (
    <section className='my-50 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto'>
        <h1 className='text-2xl md:text-4xl font-semibold text-blue-700 text-center'>Why MediOrqen</h1>
         <hr className='w-[40%] mx-auto mt-3 text-blue-600 opacity-40' />
      <div className='grid grid-cols-1 sm:grid-cols-3 mt-10'>
       <div className='p-2  sm:p-4 md:p-6 lg:p-8 bg-blue-300 mx-1 md:mx-4 lg:mx-7 my-2 shadow-md md:shadow-2xl rounded-3xl text-center'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mt-6'><Counter end={70}/>+</p>
        <p className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 my-6'>Expert Doctors</p>
       </div>
        <div className='p-2 sm:p-4 md:p-6 lg:p-8 bg-blue-300 mx-1 md:mx-4  lg:mx-7 my-2 shadow-md md:shadow-2xl rounded-3xl text-center'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mt-6'><Counter end={2000}/>+</p>
        <p className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 my-6'>Satisfied Patients</p>
       </div>
         <div className='p-2 sm:p-4 md:p-6 lg:p-8 bg-blue-300 mx-1 md:mx-4  lg:mx-7 my-2 shadow-md md:shadow-2xl rounded-3xl text-center'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mt-6'><Counter end={30}/>+</p>
        <p className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 my-6'>Medical Specialties</p>
       </div>
      </div>
    </section>
  )
}

export default CounterSection