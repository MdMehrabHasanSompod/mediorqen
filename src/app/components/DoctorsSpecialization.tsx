import Link from 'next/link';
import React from 'react'

type specialty = {
  name: string;
  slug: string;
};

const specialities:specialty[] = [
  {"name": "Allergy & Immunology", "slug": "allergy-immunology"},
  {"name": "Anesthesiology", "slug": "anesthesiology"},
  {"name": "Cardiology", "slug": "cardiology"},
  {"name": "Dermatology", "slug": "dermatology"},
  {"name": "Emergency Medicine", "slug": "emergency-medicine"},
  {"name": "Endocrinology", "slug": "endocrinology"},
  {"name": "Family Medicine", "slug": "family-medicine"},
  {"name": "Gastroenterology", "slug": "gastroenterology"},
  {"name": "Geriatrics", "slug": "geriatrics"},
  {"name": "Hematology", "slug": "hematology"},
  {"name": "Infectious Disease", "slug": "infectious-disease"},
  {"name": "Internal Medicine", "slug": "internal-medicine"},
  {"name": "Nephrology", "slug": "nephrology"},
  {"name": "Neurology", "slug": "neurology"},
  {"name": "Obstetrics & Gynecology", "slug": "obstetrics-gynecology"},
  {"name": "Oncology", "slug": "oncology"},
  {"name": "Ophthalmology", "slug": "ophthalmology"},
  {"name": "Orthopedics", "slug": "orthopedics"},
  {"name": "Otolaryngology (ENT)", "slug": "otolaryngology-ent"},
  {"name": "Pediatrics", "slug": "pediatrics"},
  {"name": "Physical Medicine & Rehabilitation", "slug": "physical-medicine-rehabilitation"},
  {"name": "Plastic Surgery", "slug": "plastic-surgery"},
  {"name": "Psychiatry", "slug": "psychiatry"},
  {"name": "Pulmonology", "slug": "pulmonology"},
  {"name": "Radiology", "slug": "radiology"},
  {"name": "Rheumatology", "slug": "rheumatology"},
  {"name": "Surgery", "slug": "surgery"},
  {"name": "Urology", "slug": "urology"},
  {"name": "Vascular Surgery", "slug": "vascular-surgery"}
]


const DoctorsSpecialization = () => {
  return (
    <section className='my-40 w-[95%] mx-auto '>
        <h1 className='text-3xl md:text-4xl font-semibold text-blue-700 text-center'>Multidisciplinary Medical Experts</h1>
        <p className='text-gray-700 text-center max-w-4xl mx-auto my-6'>Comprehensive healthcare and expert medical care delivered by skilled clinicians across a wide range of specialized disciplines, ensuring precise and patient-focused treatment.</p>
        <div className="text-center flex flex-wrap justify-center gap-6 max-w-7xl mt-10 mx-auto">
        {specialities.map((speciality) => (
        <Link key={speciality.slug} href={`/doctors/${speciality.slug}`} className="px-3 py-1.5 sm:px-5 sm:py-2 md:px-8 md:py-4 bg-blue-500 text-white shadow-md rounded-full text-xs sm:text-sm md:text-md font-semibold hover:bg-blue-600 transition">{speciality.name}</Link>
  ))}
</div>

    </section>
  )
}

export default DoctorsSpecialization