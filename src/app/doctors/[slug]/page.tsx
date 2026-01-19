"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useDoctorsStore } from "@/src/store/doctors.store";
import DoctorProfileCard from "../../components/DoctorProfileCard";
import { ArrowLeft} from "lucide-react";
import DoctorDisplayCard from "../../components/DoctorDisplayCard";
import Link from "next/link";

const DoctorProfile = () => {
  const { slug } = useParams();
  const doctors = useDoctorsStore((s) => s.doctors);
  const doctor = doctors.find((doctor)=>doctor.slug === slug)

  const relatedDoctors = doctors.filter(
    (d) => d.speciality === doctor?.speciality && d.slug !== slug
  );


  if (!doctor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-gray-500 text-lg">Doctor not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 hover:scale-105 transition duration-300"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">Doctor Profile</h1>
          <p className="text-gray-600 mt-2">Detailed information and appointment booking</p>
        </div>

        <div className="mb-12">
          <DoctorProfileCard {...doctor} />
        </div>

        {relatedDoctors.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Other {doctor.speciality} Specialists
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDoctors.map((doc) => (
                <DoctorDisplayCard key={doc._id} {...doc} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;