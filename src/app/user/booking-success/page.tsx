"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import React from "react";

export default function BookingSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const appointmentType = searchParams.get("appointmentType");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center space-y-6">
        <CheckCircle2 size={64} className="mx-auto text-green-500" />
        <h1 className="text-3xl font-bold text-gray-900">Booking Successful!</h1>
        <p className="text-gray-700">
          Your appointment has been booked successfully.
        </p>

        {appointmentId && (
          <div className="text-left bg-gray-100 p-4 rounded-lg space-y-1">
            <p className="text-gray-600 text-sm">Appointment ID:</p>
            <p className="font-medium text-gray-900">{appointmentId}</p>

            {appointmentType && (
              <>
                <p className="text-gray-600 text-sm mt-2">Appointment Type:</p>
                <p className="font-medium text-gray-900">{appointmentType}</p>
              </>
            )}
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
