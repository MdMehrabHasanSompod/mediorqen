"use client"
import React, { useEffect, useState } from 'react'
import DoctorDisplayCard from './DoctorDisplayCard';
import { useAppointmentStore } from '@/src/store/appointment.store';
import { useDoctorStore } from '@/src/store/doctor.store';
import { MenuSquare } from 'lucide-react';

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const MyDoctors = ({setOpenMobileSidebar}:propType) => {
  const appointments = useAppointmentStore((state) => state.appointments);
  const storedDoctors = useDoctorStore((state) => state.doctors);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const [filteredDoctors, setFilteredDoctors] = useState<typeof storedDoctors>([]);

  useEffect(() => {
    const bookedDoctorIds = Array.from(
      new Set(
        appointments
          .filter(a => a.status === "Confirmed" || a.status === "Completed")
          .map(a => typeof a.doctorId === "string" ? a.doctorId : a.doctorId._id)
      )
    );

    const doctors = storedDoctors.filter(doctor => bookedDoctorIds.includes(doctor._id));
    
     Promise.resolve().then(() => {
      setFilteredDoctors(doctors);
       setCurrentPage(1);
  });

  }, [appointments, storedDoctors]);


  const totalPages = Math.ceil(filteredDoctors.length / perPage);
  const currentDoctors = filteredDoctors.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="w-full mx-auto">
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>
        My Doctors
        <MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/>
      </h1>

      {filteredDoctors.length === 0 ? (
        <div className="flex items-center justify-center gap-3 text-gray-600 text-base md:text-lg font-semibold">
          <p className="text-center text-gray-500 mt-20 text-lg">No doctors found.</p>
        </div>
      ) : (
        <>
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3
            gap-5
            mt-10
          ">
            {currentDoctors.map((doctor) => (   
                <DoctorDisplayCard {...doctor} key={doctor._id} />
            ))}
          </div>
          {filteredDoctors.length > perPage && (
            <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-5 py-2 text-sm md:text-base bg-blue-500 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              <span className="font-medium text-sm md:text-base">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-5 py-2 text-sm md:text-base bg-blue-500 text-white hover:bg-blue-600 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MyDoctors;
