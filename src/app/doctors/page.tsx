import React from 'react'
import Link from 'next/link';
import { ArrowLeft} from 'lucide-react';
import DisplayDoctors from '../components/DisplayDoctors';
import { getDoctors } from '../utils/getDoctors';

const Doctors = async() => {
    const doctors = await getDoctors();
    const plainDoctors = doctors.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
     qualifications: doc.qualifications.map(q => ({
    ...q,
    _id: q._id.toString() 
  }))
  }));
 
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

    <DisplayDoctors plainDoctors={plainDoctors} />
  </div>
);
}

export default Doctors