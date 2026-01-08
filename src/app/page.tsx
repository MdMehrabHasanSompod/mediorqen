import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import OffersSections from './components/OffersSections'

const page = () => {
  return (
    <>
       <Navbar/>
       <HeroSection/>
       <OffersSections/>
    </>
  )
}

export default page