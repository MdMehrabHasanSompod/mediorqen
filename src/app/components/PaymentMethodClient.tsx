"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { ArrowLeft, CreditCard, Hospital, Loader2 } from "lucide-react";
import Link from "next/link";

interface IPropsType {
  appointmentId: string;
}

const PaymentMethodClient = ({ appointmentId }: IPropsType) => {
  const router = useRouter();
  const [loadingOnline, setLoadingOnline] = useState(false);
  const [loadingCash, setLoadingCash] = useState(false);

  const selectMethod = async (method: "Online" | "Cash") => {
     if (method === "Online") setLoadingOnline(true);
     else setLoadingCash(true);
    try {
      const result = await axios.post("/api/payment/select-method", {
        appointmentId,
        paymentMethod: method,
      });

      if (method === "Online") {
        router.push(`/payment/${appointmentId}`);
      } else {
        router.push(
          `/user/booking-success?appointmentId=${appointmentId}&appointmentType=Physical`
        );
      }
       setLoadingOnline(false);
       setLoadingCash(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
       setLoadingOnline(false);
       setLoadingCash(false);
    }
  };

  return (
     <div className="min-h-screen py-8 px-4">
      {/* Back link */}
      <div className="mb-6 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 hover:scale-105 transition duration-300"
        >
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      {/* Payment buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 text-2xl min-h-[calc(100vh-120px)]">
        <button
          disabled={loadingOnline}
          onClick={() => selectMethod("Online")}
          className={`w-64 h-64 shadow-lg flex items-center justify-center gap-2 rounded-xl font-semibold transition
            ${
              loadingOnline
                ? "bg-blue-300 cursor-not-allowed text-white"
                : "bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-blue-50"
            }`}
        >
          {loadingOnline ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <>
              <CreditCard className="w-8 h-8" />
              Pay Online
            </>
          )}
        </button>

        <button
          disabled={loadingCash}
          onClick={() => selectMethod("Cash")}
          className={`w-64 h-64 shadow-lg flex items-center justify-center gap-2 rounded-xl font-semibold transition
            ${
              loadingCash
                ? "bg-blue-200 cursor-not-allowed text-white"
                : "bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-blue-50"
            }`}
        >
          {loadingCash ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <>
              <Hospital className="w-8 h-8" />
              Pay at Hospital
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PaymentMethodClient;