import { assets } from '@/src/assets/assets'
import Image from 'next/image'
import React from 'react'
import StarRating from './Stars'

const clientReviews = [
  {
    "name": "Ayesha Khan",
    "image": assets.client8 ,
    "review": "The video consultation was smooth and very convenient. The doctor listened carefully and explained everything clearly.",
    "rating": 5
  },
  {
    "name": "Rajesh Patel",
    "image": assets.client4 ,
    "review": "Booking an appointment was quick and easy. I received my prescription instantly after the consultation.",
    "rating": 5
  },
  {
    "name": "Fatima Ali",
     "image": assets.client10 ,
    "review": "Very professional doctors and excellent hospital service. The entire process was well organized.",
    "rating": 5
  },
  {
    "name": "Chen Wei",
    "image": assets.client5 ,
    "review": "The support team was very responsive and helpful. Great experience from start to finish.",
    "rating": 5
  },
  {
    "name": "Mohammed Yusuf",
    "image": assets.client1 ,
    "review": "I saved a lot of time by consulting online. The doctor was patient and knowledgeable.",
    "rating": 5
  },
  {
    "name": "Lucia Martinez",
    "image": assets.client7 ,
    "review": "Clean hospital environment and friendly staff. The appointment system works perfectly.",
    "rating": 5
  },
  {
    "name": "Jesica Lopez",
    "image": assets.client6 ,
    "review": "The lab reports were delivered quickly and securely. Very reliable service.",
    "rating": 5
  },
  {
    "name": "Olufemi Adeyemi",
    "image": assets.client9 ,
    "review": "Easy to use platform with excellent doctors. Highly recommended for busy people.",
    "rating": 5
  },
  {
    "name": "Robert Smith",
    "image": assets.client3 ,
    "review": "The doctors are very caring and professional. I felt confident about my treatment.",
    "rating": 5
  },
  {
    "name": "Alex Taylor",
    "image": assets.client2 ,
    "review": "From appointment to prescription, everything was seamless and stress-free.",
    "rating": 5
  }
]


const ClientReview = () => {
  return (
    <section className='w-full my-40 md:my-50'>
        <h3 className='text-2xl md:text-4xl mx-2 font-semibold text-blue-700 text-center'>Trusted by Patients, Valued by Families</h3>
        <div className='flex items-center overflow-hidden  w-full px-5 mt-10 '>
        <div className='flex items-center infinite-scroll gap-10 w-max'>
     {
        [...clientReviews, ...clientReviews].map((review,index)=>(
            <div key={index} className='flex flex-col shrink-0 bg-blue-400 p-2 md:p-8 rounded-lg overflow-hidden w-60 h-50 md:w-80 md:h-80'>
             <div className='relative w-10 h-10 md:w-30 md:h-30 mx-auto '>
                <Image src={review.image} alt={review.name} fill className='object-cover rounded-full'/>
             </div>
             <p className="text-xl md:text-2xl font-semibold text-blue-900 max-w-2xl text-center">{review.name}</p>
             <StarRating rating={review.rating}/>
             <p className="text-xs md:tex-md max-w-sm text-blue-50 whitespace-break-spaces text-center">{review.review}</p>
            </div>  
        )) 
     }            
        </div>
        </div>
    </section>
  )
}

export default ClientReview