import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import OffersSections from './components/OffersSections'
import DoctorsSpecialization from './components/DoctorsSpecialization'
import VideoSection from './components/VideoSection'
import CounterSection from './components/CounterSection'
import FAQs from './components/FAQs'
import ClientReview from './components/ClientReview'

const page = () => {
  return (
    <>
       <Navbar/>
       <HeroSection/>
       <OffersSections/>
       <DoctorsSpecialization/>
       <VideoSection/>
       <CounterSection/>
       <ClientReview/>
       <FAQs/>
    </>
  )
}

export default page