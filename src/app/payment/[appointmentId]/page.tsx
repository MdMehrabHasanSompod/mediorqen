"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const { appointmentId } = useParams();
  const [loading,setLoading] = useState(false)
  const router = useRouter();

  const simulatePayment = async () => {
     setLoading(true)
    try {
      const result = await axios.post("/api/payment/success", {
       appointmentId,
    });
    setLoading(false)
    router.push(`/user/booking-success?appointmentId=${appointmentId}&appointmentType=${result.data.appointmentType}`);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl space-y-4">
        <h2 className="text-xl font-bold">Simulated Payment</h2>
        <p>This is a fake payment gateway.</p>

        <button
          onClick={()=>simulatePayment()}
          className="w-full bg-green-600 text-white flex items-center gap-1 py-2 rounded-lg"
        >
          <Loader2 className="w-6 h-6 animate-spin"/>
          Pay Now
        </button>
      </div>
    </div>
  );
}
