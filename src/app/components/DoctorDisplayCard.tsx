import { IDoctor } from '@/types/doctor';
import { BookCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const DoctorDisplayCard = ({ name, speciality, qualifications, image,availability,slug }: IDoctor) => {


  return (
    <div className="bg-blue-100 w-full rounded-2xl shadow-lg p-6 lg:p-7 flex flex-col items-center text-center relative">
        <div className="absolute top-0 right-0 mt-4 mr-4 z-10 flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md">
        <span
          className={`w-3 h-3 rounded-full ${
            availability ? 'bg-green-500 animate-[ping_2s_linear_2s_infinite]' : 'bg-red-700'
          }`}
        ></span>
        <span className="text-xs font-semibold text-gray-800">
          {availability ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div className="w-36 h-36 sm:w-40 sm:h-40 mt-6 lg:w-50 lg:h-50 rounded-full overflow-hidden border-4 border-blue-400 mb-5">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>

      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
        {name}
      </h2>

      <p className="text-sm sm:text-base lg:text-lg text-blue-600 font-medium mt-2 mb-4">
        {speciality}
      </p>

      <div className="text-sm text-gray-600 space-y-1 mb-5">
        {qualifications.slice(0, 2).map((q) => (
          <p key={q._id}>
            <span className="font-medium">{q.degree}</span> — {q.institution}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full mt-auto">
        <Link href={`/doctors/${slug}`} className="cursor-pointer w-full sm:flex-1 px-5 py-2.5 break text-sm lg:text-base bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition">
          View Doctor
        </Link>

        <button className="cursor-pointer w-full sm:flex-1 flex items-center whitespace-nowrap justify-center gap-2 px-5 py-2.5 text-sm lg:text-base bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition">
          <BookCheck size={18} />
          Book Appointment
        </button>
      </div>
    </div>
  );
};


export default DoctorDisplayCard