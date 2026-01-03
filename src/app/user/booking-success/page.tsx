import { redirect } from "next/navigation";
import { auth } from "@/src/app/lib/auth";
import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";
import BookingSuccessClient from "../../components/BookingSuccessClient";


const Page = async(props: { searchParams: { [key: string]: string | undefined } })=> {
   const searchParams = await props.searchParams; 
   const appointmentId = searchParams.appointmentId;

  if (!appointmentId) redirect("/");

  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) redirect("/user/appointments");

  if (appointment.patientId.toString() !== session.user.id) {
    redirect("/user/appointments");
  }

  if (appointment.status !== "Confirmed") {
    redirect("/user/appointments");
  }

  return (
    <BookingSuccessClient
      appointmentId={appointment._id.toString()}
      appointmentType={appointment.appointmentType}
    />
  );
}

export default Page;