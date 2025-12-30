"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DoctorDisplayCard from '../components/DoctorDisplayCard';
import Link from 'next/link';
import { ArrowLeft,Loader2 } from 'lucide-react';
import ResponsiveSearch from '../components/ResponsiveSearch';

type qualificationType = {
  _id: string;
  degree: string;
  institution: string;
};

interface IDisplayCardInfo{
    _id: string
    name: string;
    speciality: string;
    qualifications: qualificationType[];
    image: string;
    availability:boolean;
}

const Doctors = () => {
    const [doctors,setDoctors] = useState<IDisplayCardInfo[]>([])
    const [loading,setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const perPage = 5;

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

  
    useEffect(()=>{
       const fetchDoctor = async() => {
        try {
        const result = await axios.get("/api/doctors")
        console.log(result);
        setDoctors(result?.data?.Doctors||[])          
     } catch (error) {
        console.log(error);
        setDoctors([])
     }finally{
        setLoading(false)
     }}
     fetchDoctor()
    },[])

      useEffect(() => {
      setCurrentPage(1)
    }, [searchTerm])
  
  return(
  <div className="px-4 md:px-6 lg:px-8 max-w-400 mx-auto pb-12 md:pb-20">
    <Link
      href="/"
      className="text-sm text-gray-700 font-semibold inline-flex items-center gap-2 hover:text-blue-600 hover:scale-105 transition duration-300 my-6"
    >
      <ArrowLeft size={22} /> Back to Home
    </Link>

    <h1 className="font-bold text-blue-600 text-2xl sm:text-3xl md:text-4xl text-center mb-10">
      Meet Our Healthcare Specialists
    </h1>

    <ResponsiveSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholderText='Search doctor by name or speciality...' />

    {loading ? (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        <div className="flex items-center gap-3 text-gray-600 text-base md:text-lg font-semibold">
          <Loader2 size={26} className="animate-spin text-blue-500" />
          Loading doctors...
        </div>
      </div>
    ) : (
      <>
        {filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">No doctors found.</p>
        ) :  (
      <>
        <div className="
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
      </>
    )}
  </div>
);
}

export default Doctors