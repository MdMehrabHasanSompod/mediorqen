"use client";

import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function PaymentMethodPage() {
  const router = useRouter();
  const { appointmentId } = useParams();

  const payOnline = async () => {
    await axios.post("/api/payment/select-method", {
      appointmentId,
      paymentMethod: "Online",
    });
    router.push(`/payment/${appointmentId}`);
  };

  const payAtHospital = async () => {
    await axios.post("/api/payment/select-method", {
      appointmentId,
      paymentMethod: "Cash",
    });
   router.push(`/user/booking-success?appointmentId=${appointmentId}&appointmentType=Physical`);
  };

  return (
    <div className="space-y-4">
      <button onClick={payOnline}>Pay Online</button>
      <button onClick={payAtHospital}>Pay at Hospital</button>
    </div>
  );
}
