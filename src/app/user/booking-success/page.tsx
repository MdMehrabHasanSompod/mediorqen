"use client"
import { redirect, useSearchParams } from "next/navigation";
import BookingSuccessClient from "../../components/BookingSuccessClient";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Loader2 } from "lucide-react";


const BookingSuccess = () => {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  if (!appointmentId) redirect("/");

  const [appointmentType,setAppointmentType] = useState<string>("")
  const [doctorName,setDoctorName] = useState<string>("")
  const [doctorSpeciality,setDoctorSpeciality] = useState<string>("")
  const [patientName,setPatientName] = useState<string>("")
  const [date,setDate] = useState<Date | null>(null)
  const [slot,setSlot] = useState<string>("")
  const [paymentStatus,setPaymentStatus] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)

  const session = useSession()
  if (!session.data?.user) redirect("/login");
  const userId = session.data?.user?.id;
  const role = session.data?.user?.role;

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true)
        const result = await axios.get(`/api/user/booking-success?appointmentId=${appointmentId}&userId=${userId}&role=${role}`)
        if(result.data.success){
          setAppointmentType(result.data.appointment.appointmentType)
          setDoctorName(result.data.appointment.doctorId.name)
          setDoctorSpeciality(result.data.appointment.doctorId.speciality)
          setPatientName(result.data.appointment.patientId.name)
          setDate(result.data.appointment.date)
          setSlot(result.data.appointment.slot)
          setPaymentStatus(result.data.appointment.paymentStatus)
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
     fetchAppointment(); 
    
    },[appointmentId,userId,role])

   if(loading) {
    return  <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <div className="flex items-center  gap-3 text-gray-600 text-base md:text-lg font-semibold">
              <Loader2 size={26} className="animate-spin text-blue-500" />
              Loading...
            </div>
          </div>
   } 

  return (
    <BookingSuccessClient
      appointmentType={appointmentType}
      doctorName={doctorName}
      doctorSpeciality={doctorSpeciality}
      patientName={patientName}
      date={date as Date}
      slot={slot}
      paymentStatus={paymentStatus}
    />
  );
}

export default BookingSuccess;