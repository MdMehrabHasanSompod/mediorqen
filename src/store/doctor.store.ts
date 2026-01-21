import { create } from "zustand";
import { IDoctor } from "@/types/doctor";
import { IAppointment } from "@/types/appointment";

interface DoctorStore {
  doctor: IDoctor | null;
  setDoctor: (user: IDoctor) => void;
  clearDoctor: () => void;
  appointments: IAppointment[];
  setAppointments: (appointments:IAppointment[]) => void;
  clearAppointments: () => void;
}
 
export const useDoctorStore = create<DoctorStore>((set) => ({
  doctor: null,
  setDoctor: (doctor) => set({ doctor }),
  clearDoctor: () => set({ doctor: null }),
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  clearAppointments: () => set({ appointments: [] }),
}));
