"use client"
import { useEffect, useState } from "react"

const AppointmentTimer = ({ appointmentDateTime }:{ appointmentDateTime: string}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft() {
    const now = new Date().getTime()
    const appointmentTime = new Date(appointmentDateTime).getTime()
    const diff = appointmentTime - now

    if (diff <= 0) {
      return null
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return <p className="text-green-600 font-semibold">Appointment Started</p>
  }

  return (
    <div className="flex flex-col gap-4 text-center">
      <h3 className="text-xl lg:text-2xl font-bold text-blue-900">Next Appointment In</h3>
      <div className="flex items-center justify-center gap-3">
      <TimeBox label="Days" value={timeLeft.days} />
      <TimeBox label="Hours" value={timeLeft.hours} />
      <TimeBox label="Minutes" value={timeLeft.minutes} />
      <TimeBox label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  )
}

const TimeBox = ({ label, value }:{label:string,value:number}) => (
  <div className="bg-blue-300 px-4 py-2 rounded-lg">
    <p className="text-xl font-bold text-blue-800">{value}</p>
    <p className="text-sm text-blue-600">{label}</p>
  </div>
)

export default AppointmentTimer
