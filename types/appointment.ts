import { IPublicDoctor } from "./public-doctor";
import { IUser } from "./user";

export interface IAppointment {
  _id: string;
  doctorId: IPublicDoctor;
  patientId: IUser;
  date: Date;
  slot: `${number}:${"00" | "30"}`;
  appointmentType: "Physical" | "Online";
  appointmentFees: number;
  paymentMethod: "Online" | "Cash";
  paymentStatus: "Unpaid" | "Paid";
  meetingRoomId?: string;
  status: "Pending" | "Awaiting Payment" | "Confirmed" | "Cancelled" | "Completed";
  expiresAt: Date;
}
