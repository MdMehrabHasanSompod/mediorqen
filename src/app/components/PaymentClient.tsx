"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IPropsType {
  appointmentId: string;
  appointmentType: string;
}

const PaymentClient = ({appointmentId,appointmentType}: IPropsType) =>{
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    try {
     const result = await axios.post("/api/payment/success", { appointmentId });

      router.push(`/user/booking-success?appointmentId=${appointmentId}&appointmentType=${appointmentType}`);
      setLoading(false)
    } catch(error){
      setLoading(false);
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl space-y-4">
        <h2 className="text-xl font-bold">Simulated Payment</h2>

        <button
          disabled={loading}
          onClick={handlePayment}
          className="w-full bg-green-600 text-white flex items-center justify-center gap-2 py-2 rounded-lg"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentClient;