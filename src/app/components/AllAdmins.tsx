"use client"
import { MenuSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ResponsiveSearch from './ResponsiveSearch'
import AdminDisplayCard from './AdminDisplayCard'
import { useUsersStore } from '@/src/store/users.store'

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AllAdmins = ({setOpenMobileSidebar}:propType) => {
  const users = useUsersStore((s) => s.users);
  const admins = users.filter((user) => user.role === "admin");
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const perPage = 20;
  const filteredAdmins = admins.filter((admin) => {
  const term = searchTerm.toLowerCase().trim();
      if (!term) return true;
      const nameWords = admin.name.toLowerCase().trim().split(/\s+/);
      const nameMatch = nameWords.some(word => word.startsWith(term));
    
      return nameMatch;
    });
    const totalPages = Math.ceil(filteredAdmins.length / perPage)
    const currentAdmins = filteredAdmins.slice((currentPage-1)*perPage, currentPage*perPage)

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
      <ResponsiveSearch searchTerm={searchTerm} setSearchTerm={handleSearch} placeholderText='Search admin by name...' />
        {filteredAdmins.length === 0 ? (
              <div className="flex items-center justify-center  gap-3 text-gray-600 text-base md:text-lg font-semibold">
                 <p className="text-center text-gray-500 mt-50 text-lg">No Admin found.</p>
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
                {currentAdmins.map((admin) => (
                  <AdminDisplayCard key={admin._id} {...admin} />
                ))}
              </div>
      
              {filteredAdmins.length > perPage && (
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

export default AllAdmins