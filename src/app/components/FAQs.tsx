"use client"
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

const QA = [
  {
    question:"How do I book an appointment with a doctor?",
    answer:"You can book an appointment by selecting your preferred specialty, choosing a doctor, and picking an available time slot through our platform."
  },
    {
    question:"Can I consult a doctor online through video call?",
    answer:"Yes, you can consult with our doctors through our secure inbuilt video consultation system."
  },
    {
    question:"Are online consultations secure and private?",
    answer:"Yes, all consultations are protected with industry-standard security to ensure complete patient privacy."
  },
    {
    question:"How do I receive my prescription after consultation?",
    answer:"Your doctor will issue a digital prescription, which you can view and download from your account."
  },
    {
    question:"Can I reschedule or cancel my appointment?",
    answer:"Yes, you can reschedule or cancel your appointment from your dashboard before the scheduled time."
  },
      {
    question:"What payment methods are supported?",
    answer:"We support secure online payments as well as in-clinic payment options."
  },
      {
    question:"How can I contact customer support?",
    answer:"You can reach our support team through the help section or contact form on our website."
  },
]

const FAQs = () => {
  const [activeIndex,setActiveIndex] = useState<number | null>(null)
  const handleToggle = (index:number) => {
      setActiveIndex(activeIndex === index ? null : index)
  }
  return (
    <section>
      <h3 className='text-2xl md:text-4xl font-semibold text-blue-700 text-center'>Frequently Asked Questions</h3>
      <div className='mx-auto px-4 w-full md:w-[60%] my-10'>
{
  QA.map((qa, index) => {
    return (
      <div key={index} className="mb-4 text-start">
        <button
          onClick={() => handleToggle(index)}
          className="w-full bg-blue-300 text-blue-700 cursor-pointer px-6 py-3 font-semibold rounded-lg flex items-center gap-2"
        >
          <span>{activeIndex === index? <Minus /> : <Plus />}</span>
          {qa.question}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            activeIndex === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <p className="bg-blue-200 text-gray-700 px-6 py-3 rounded-lg">
            {qa.answer}
          </p>
        </div>
      </div>
    )
  })
}
      </div>
    </section>
  )
}

export default FAQs