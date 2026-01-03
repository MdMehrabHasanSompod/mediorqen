import { redirect } from "next/navigation";
import { auth } from "@/src/app/lib/auth";
import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
import PaymentClient from "../../components/PaymentClient";


const Page = async(props: { params: { appointmentId: string } }) => {
  const params= await props.params;
  const appointmentId = params.appointmentId;
  if(!appointmentId) redirect("/")
  const session = await auth();

  if (!session) redirect("/login");

  await connectDB();

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) redirect("/");

  if (appointment.patientId.toString() !== session.user.id) {
    redirect("/user/appointments");
  }

  if (appointment.paymentStatus !== "Unpaid") {
    redirect("/user/appointments");
  }

  if(!appointment.paymentMethod){
    redirect(`/payment/select-method/${appointmentId}`);
  }

  return (
    <PaymentClient appointmentId={appointmentId} appointmentType={appointment.appointmentType}/>
  );
}

export default Page;