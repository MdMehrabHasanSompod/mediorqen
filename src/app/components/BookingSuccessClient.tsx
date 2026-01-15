"use client";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";


interface IPropsType {
  appointmentType: string;
  doctorName: string;
  doctorSpeciality: string;
  patientName: string;
  date: Date;
  slot: string;
  paymentStatus:string;
}

const BookingSuccessClient = ({appointmentType,doctorName,doctorSpeciality,patientName,date,slot,paymentStatus }: IPropsType) => {
 const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="bg-blue-50 rounded-2xl shadow-xl p-10 max-w-lg w-full text-center space-y-6">
        <CheckCircle2 size={64} className="mx-auto text-green-500" />
        <h1 className="text-3xl font-bold text-gray-900">Booking Successful!</h1>
        <p className="text-gray-700">Your appointment has been confirmed successfully.</p>

        <div className="text-left bg-blue-100 p-4 rounded-lg space-y-2">
          <p className="text-gray-600 text-sm">Doctor Name</p>
          <p className="font-medium text-gray-900">{doctorName}</p>

          <p className="text-gray-600 text-sm">Speciality</p>
          <p className="font-medium text-gray-900">{doctorSpeciality}</p>

          <p className="text-gray-600 text-sm">Paitent Name</p>
          <p className="font-medium text-gray-900">{patientName}</p>

           <p className="text-gray-600 text-sm">Date</p>
          <p className="font-medium text-gray-900">{new Date(date).toLocaleDateString("en-US",{
             day: "2-digit",
             month: "short",
             year: "numeric",
          })}</p>

          <p className="text-gray-600 text-sm">Slot</p>
          <p className="font-medium text-gray-900">{slot}</p>

          <p className="text-gray-600 text-sm mt-2">Appointment Type:</p>
          <p className="font-medium text-gray-900">{appointmentType}</p>

          <p className="text-gray-600 text-sm mt-2 flex items-center justify-start gap-1">Payment Status: <span className={`text-white font-medium ${paymentStatus === "Paid" ? "bg-green-600" : "bg-red-700" } rounded-md px-2 py-1`}>{paymentStatus}</span></p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full cursor-pointer py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default BookingSuccessClient;