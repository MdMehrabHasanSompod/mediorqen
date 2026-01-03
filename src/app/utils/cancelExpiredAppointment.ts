import connectDB from "@/src/app/lib/db";
import { Appointment } from "@/src/app/models/appointment.model";

export async function cancelExpiredAppointment() {
  await connectDB();
  const result = await Appointment.updateMany(
    {
      status: "Pending",
      expiresAt: { $lt: new Date() },
    },
    { $set: { status: "Cancelled" } }
  );

  console.log(`Cancelled ${result.modifiedCount} expired appointments`);
}
