"use client"
import { MenuSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DoctorDisplayCard from './DoctorDisplayCard'
import ResponsiveSearch from './ResponsiveSearch'
import { useDoctorsStore } from '@/src/store/doctors.store'

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const MyDoctors = ({setOpenMobileSidebar}:propType) => {
  const doctors = useDoctorsStore((s)=> s.doctors)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const perPage = 20;
  const filteredDoctors = doctors.filter((doctor) => {
  const term = searchTerm.toLowerCase().trim();
      if (!term) return true;
      const nameWords = doctor.name.toLowerCase().trim().split(/\s+/);
      const specialityWords = doctor.speciality.toLowerCase().trim().split(/\s+/);
      const nameMatch = nameWords.some(word => word.startsWith(term));
      const specialityMatch = specialityWords.some(word => word.startsWith(term));
    
      return nameMatch || specialityMatch;
    });
    const totalPages = Math.ceil(filteredDoctors.length / perPage)
    const currentDoctors = filteredDoctors.slice((currentPage-1)*perPage, currentPage*perPage)

  const handleSearch = (value:React.SetStateAction<string>) => {
    setSearchTerm(value);
    setCurrentPage(1); 
  };


useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);

  return (
    <div>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md mt-2 mb-6 flex items-center justify-between gap-4'>All Doctors<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/></h1>
      <ResponsiveSearch searchTerm={searchTerm} setSearchTerm={handleSearch} placeholderText='Search doctor by name or speciality...' />
        {filteredDoctors.length === 0 ? (
              <div className="flex items-center justify-center  gap-3 text-gray-600 text-base md:text-lg font-semibold">
                 <p className="text-center text-gray-500 mt-50 text-lg">No doctors found.</p>
              </div>
              ) :  (
            <>
              <div className="
                mt-8
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3
                lg:grid-cols-4
                gap-5
              ">
                {currentDoctors.map((doctor) => (
                  <DoctorDisplayCard key={doctor._id} {...doctor} />
                ))}
              </div>
      
              {filteredDoctors.length > perPage && (
                <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="
                      px-5 py-2 
                      text-sm md:text-base 
                      bg-blue-500 text-white 
                      rounded-full 
                      disabled:bg-gray-300 
                      disabled:cursor-not-allowed
                    "
                  >
                    Prev
                  </button>
      
                  <span className="font-medium text-sm md:text-base">
                    Page {currentPage} of {totalPages}
                  </span>
      
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className=" 
                      px-5 py-2 
                      text-sm md:text-base 
                      bg-blue-500 text-white 
                      hover:bg-blue-600
                      rounded-full 
                      disabled:bg-gray-300 
                      disabled:cursor-not-allowed
                    "
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

export default MyDoctors