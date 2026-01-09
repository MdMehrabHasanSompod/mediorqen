import { ClipboardPlus, Hospital, Microscope, Video } from 'lucide-react'
import React from 'react'

const OffersSections = () => {
  return (
    <section className='my-30 w-[95%] lg:w-[85%] mx-auto'>
        <h1 className='text-4xl font-semibold text-blue-600 text-center'>What We <span className='text-blue-900'>Offer</span></h1>
        <hr className='w-[40%] mx-auto mt-3 text-blue-600 opacity-40' />
        <div className='mt-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='p-4 border-2 border-blue-600 shadow-2xl rounded-2xl bg-blue-100 hover:bg-blue-200 hover:scale-102 transition-transform duration-300'>
                <Hospital size={45} className='mx-auto mb-4 text-blue-900' />
                <h2 className='text-xl font-semibold text-center text-blue-700'>Seamless Appointment Booking</h2>
                <p className='text-gray-700 text-center my-3'>Schedule in-person hospital or clinic visits effortlessly with a few simple clicks.</p>
            </div>
            <div className='p-4 border-2 border-blue-600 shadow-2xl rounded-2xl bg-blue-100 hover:bg-blue-200 hover:scale-102 transition-transform duration-300'>
                <Video size={45} className='mx-auto mb-4 text-blue-900'/>
                <h2 className='text-xl font-semibold text-center text-blue-700'>Virtual Doctor Consultations</h2>
                <p className='text-gray-700 text-center my-3'>Connect with certified healthcare professionals online for timely and convenient advice.</p>
            </div>
            <div className='p-4 border-2 border-blue-600 shadow-2xl rounded-2xl bg-blue-100 hover:bg-blue-200 hover:scale-102 transition-transform duration-300'>
                <ClipboardPlus size={45} className='mx-auto mb-4 text-blue-900'/>
                <h2 className='text-xl font-semibold text-center text-blue-700'>Digital Prescriptions & Medicine Guidance</h2>
                <p className='text-gray-700 text-center my-3'>Receive secure, doctor-approved prescriptions and personalized medicine recommendations directly through the platform.</p>
            </div>
            <div className='p-4 border-2 border-blue-600 shadow-2xl rounded-2xl bg-blue-100 hover:bg-blue-200 hover:scale-102 transition-transform duration-300'>
                <Microscope size={45} className='mx-auto mb-4 text-blue-900'/>
                <h2 className='text-xl font-semibold text-center text-blue-700'>Lab & Diagnostic Management</h2>
                <p className='text-gray-700 text-center my-3'>Access comprehensive patient lab tests and diagnostic reports in one secure system.</p>
            </div>
        </div>
    </section>
  )
}

export default OffersSections