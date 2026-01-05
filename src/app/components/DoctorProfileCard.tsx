"use client"
import { IDoctor } from "@/types/doctor";
import axios from "axios";
import {
  BookCheck,
  CalendarDays,
  Clock,
  Video,
  Hospital,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const days = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});

const DoctorProfileCard = ({_id,fees,name,speciality,qualifications,image,availability}: IDoctor) => {
  const [availableSlots,setAvailableSlots] = useState<string[]>([])
  const [showBooking, setShowBooking] = useState(false);
  const [appointmentType, setAppointmentType] = useState<"Physical" | "Online" | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const canBook = appointmentType !== null && selectedDay !== null && selectedSlot !== null;
  const {data:session,status} = useSession()
  const router = useRouter()
  const [loading,setLoading] = useState<boolean>(false)
  const [slotLoading,setSlotLoading] = useState<boolean>(false)

  const getAvailableSlots = async(index:number) => {
     try {
      setSlotLoading(true)
      setSelectedDay(index);   
      setSelectedSlot(null);  
      setAvailableSlots([])
      const date = days[index].toISOString();
      const result = await axios.get("/api/doctors/doctor/available-slots",{
        params:{
          doctorId:_id,
          date,
        }
      })
      setSlotLoading(false)
      setAvailableSlots(result.data.availableSlots)
     } catch (error) {
        console.log(error);
        setSlotLoading(false)
     }
  }
 
  const bookAppointment = async() => {
    try {
      setLoading(true)
       if (status !== "authenticated"||!session?.user?.id) {
        alert("User not authenticated. Please login first");
        return;
}
    if (selectedDay === null || selectedSlot === null || !appointmentType) {
    return;
  }
  const date = days[selectedDay].toISOString();

      const result = await axios.post("/api/user/book-appointment",{
        doctorId:_id,
        patientId: session.user.id ,
        date,
        slot:selectedSlot,
        appointmentType,
        appointmentFees:fees
      })
      setLoading(false)
      const { appointmentId} = result.data;
      if (appointmentType === "Online") {
       router.push(`/payment/${appointmentId}`);
      } else {
       router.push(`/payment/select-method/${appointmentId}`);
      }
     } catch (error) {
      console.log(error);
      setLoading(false)
     }
  }


  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative shrink-0">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-blue-500 shadow-lg">
            <Image
              src={image || "/doctorImage.png"}
              alt={name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="absolute -top-2 -right-2 flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md">
            <span
              className={`w-3 h-3 rounded-full ${
                availability
                  ? "bg-green-500 animate-[ping_2s_linear_infinite]"
                  : "bg-red-600"
              }`}
            />
            <span className="text-xs font-semibold text-gray-700">
              {availability ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-3 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {name}
          </h1>

          <p className="text-sm sm:text-base">
            <span className="font-semibold text-gray-600">
              Speciality:
            </span>{" "}
            <span className="text-blue-700 font-medium">
              {speciality}
            </span>
          </p>

          <div className="text-sm sm:text-base text-gray-700">
            <p className="font-semibold text-gray-600 mb-1">
              Qualifications:
            </p>
            {qualifications.map((q) => (
              <p key={q._id}>
                {q.degree} — {q.institution}
              </p>
            ))}
          </div>
            <p className="text-sm sm:text-base">
            <span className="font-semibold text-gray-600">
              Appointment Fees:
            </span>{" "}
            <span className="text-blue-600 font-medium">
              $&nbsp;{fees}
            </span>
          </p>
        </div>
      </div>
      <button
        onClick={() => setShowBooking((p) => !p)}
        className={`w-full ${!showBooking && "cursor-pointer"} md:w-auto md:max-w-md mx-auto flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-700 transition`}
      >
        {showBooking ? (
          <>
            <ChevronDown />
            Hide Appointment Details
          </>
        ) : (
          <>
            <BookCheck size={18} />
            Book Appointment
          </>
        )}
      </button>

      {showBooking && (
        <div className="space-y-6 border-t-2 border-blue-400 pt-6">

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Appointment Type
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <button
                onClick={() => setAppointmentType("Physical")}
                className={`flex-1 py-3 rounded-xl border-2 border-blue-300 flex items-center justify-center gap-2 transition ${
                  appointmentType === "Physical"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:border-blue-500"
                }`}
              >
                <Hospital size={18} /> Physical
              </button>

              <button
                onClick={() => setAppointmentType("Online")}
                className={`flex-1 py-3 rounded-xl border-2 border-blue-300 flex items-center justify-center gap-2 transition ${
                  appointmentType === "Online"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:border-blue-500"
                }`}
              >
                <Video size={18} /> Online
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <CalendarDays size={16} /> Select Day
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-w-xl mx-auto">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => getAvailableSlots(index)
                  }
                  className={`px-2 py-3 rounded-lg border-2 border-blue-300 transition ${
                    selectedDay === index
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:border-blue-500"
                  }`}
                >
                  <p className="text-xs">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className="font-bold">{day.getDate()}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Clock size={16} /> Time Slots (30 min)
            </p>
             {selectedDay === null && (
            <div className="min-h-46 md:min-h-22 text-center text-gray-500 py-6 border-2 border-blue-600 border-dashed rounded-xl ">
            Please select a date to see available slots
           </div>
               )}
            {selectedDay !== null && slotLoading && (
            <div className="min-h-46 md:min-h-22 flex items-center justify-center gap-2 py-6 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading available slots...</span>
           </div>
           )}
            {selectedDay !== null && !slotLoading && availableSlots.length === 0 && (
           <div className="min-h-46 md:min-h-22 flex items-center justify-center text-center text-red-500 py-6">
            No slots available for this date
          </div>
           )}
            {!slotLoading && availableSlots.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-w-3xl mx-auto">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-lg border-2 border-blue-300 text-sm transition ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:border-blue-500"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            )}
          </div>
          <button
            disabled={!canBook}
            onClick={()=>bookAppointment()}
            className={`w-full md:w-auto md:max-w-md mx-auto py-3 px-8 cursor-pointer rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
              canBook
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading?<Loader2 className="w-6 h-6 animate-spin"/>:
            <>
             <BookCheck size={18} />
            Book Now
            </>
           }
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfileCard;