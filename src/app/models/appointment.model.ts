import mongoose from "mongoose";

interface IAppointment {
  doctorId: mongoose.Schema.Types.ObjectId;
  patientId: mongoose.Schema.Types.ObjectId;
  date: Date;
  slot: `${number}:${"00" | "30"}`;
  appointmentFees:number;
  appointmentType: "Physical" | "Online";
  paymentMethod?: "Online" | "Cash";
  paymentStatus: "Unpaid" | "Paid";
  meetingRoomId?: string;
  status: "Pending" | "Awaiting Payment" | "Confirmed" | "Cancelled" | "Completed";
  expiresAt?: Date;
}
  
const appointmentSchema = new mongoose.Schema<IAppointment>({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date:{
        type: Date,
        required:true,
    },
    slot:{
        type: String,
        required:true,
    },
    appointmentType: {
    type: String,
    enum: ["Physical", "Online"],
    required: true,
  },
  appointmentFees:{
    type : Number,
    required: true,
  },
  paymentMethod:{
    type: String,
    enum: ["Online", "Cash"],
  },
  paymentStatus:{
    type: String,
    enum: ["Unpaid", "Paid"],
    required: true,
    default: "Unpaid",
  },
  meetingRoomId:{
    type: String,
  },
  status:{
    type:String,
    enum:["Pending","Awaiting Payment" ,"Confirmed", "Cancelled", "Completed"],
    required:true,
    default: "Pending",
  },
  expiresAt:{
    type:Date,
  }
},{timestamps:true})

export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment",appointmentSchema)