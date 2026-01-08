"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {motion} from "motion/react"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container  mt-20 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="block lg:hidden">
          <Image
            src="/heroSectionDoctor1.png"
            alt="Doctor"
            width={520}
            height={520}
            className="rounded-2xl shadow-xl mx-auto"
            priority
          />
        </div>

        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-blue-900 leading-tight">
            Your Health, <br />
            <span className="text-blue-600">Our Priority</span>
          </h1>

          <p className="text-gray-700 text-lg max-w-xl mx-auto lg:mx-0">
            Book appointments with experienced doctors, get online consultations,
            and manage your healthcare seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/doctors"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Book Appointment
            </Link>
            <Link
              href="/register"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Register Now
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center min-h-105 xl:min-h-120">

          <motion.div
               animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
           className="
            absolute
            left-0 bottom-0
            w-64 h-64
            xl:w-72 xl:h-72
            2xl:w-80 2xl:h-80
            -translate-x-8 translate-y-10
          ">
            <Image
              src="/heroSectionDoctor2.png"
              alt="Doctor"
              fill
              className="rounded-2xl shadow-xl object-cover"
              priority
            />
          </motion.div>

          <motion.div
          animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
          className="
            absolute
            right-0 top-0
            w-72 h-72
            xl:w-80 xl:h-80
            2xl:w-96 2xl:h-96
            -translate-y-8
          ">
            <Image
              src="/heroSectionDoctor1.png"
              alt="Doctor"
              fill
              className="rounded-2xl shadow-2xl object-cover"
              priority
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
