import { IUser } from '@/types/user';
import { Mail, PhoneCall, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';


const PatientDisplayCard = ({ name, age, gender, bloodGroup, avatar, email, phone}: IUser) => {


  return (
    <div className="bg-blue-300 w-full rounded-2xl shadow-lg p-6 lg:p-7 flex flex-col items-center text-center relative">
      <div className="w-36 h-36 sm:w-40 sm:h-40 mt-6 lg:w-50 lg:h-50 rounded-full overflow-hidden border-4 border-blue-400 mb-5">
        {avatar?<Image
          src={avatar}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full"
        /> : <User  className="object-cover w-full h-full bg-blue-600 text-white"/>}
      </div>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
      Name: {name}
      </h2>

      <p className="text-sm sm:text-base lg:text-lg text-blue-600 font-medium mt-2">
       Age : {age}
      </p>

     <p className="text-sm sm:text-base lg:text-lg text-blue-600 font-medium mt-2">
      Gender : {gender}
      </p>

     <p className="text-sm sm:text-base lg:text-lg text-blue-600 font-medium mt-2">
       Blood Group : {bloodGroup}
      </p>

      <div className="flex flex-col gap-3 w-full mt-4">
        <button onClick={() => window.location.href = `mailto:${email}`} className="cursor-pointer w-full sm:flex-1 flex items-center whitespace-nowrap justify-center gap-2 px-5 py-2.5 text-sm lg:text-base bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition">
          <Mail size={18} />
          {email}
        </button>
        <button onClick={() => window.location.href = `tel:${phone}`} className="cursor-pointer w-full sm:flex-1 flex items-center whitespace-nowrap justify-center gap-2 px-5 py-2.5 text-sm lg:text-base bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition">
          <PhoneCall size={18} />
          Call Patient
        </button>
      </div>
    </div>
  );
};


export default PatientDisplayCard