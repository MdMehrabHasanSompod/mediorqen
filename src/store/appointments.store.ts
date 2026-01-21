import { create } from "zustand";
import { IAppointment } from "@/types/appointment";

interface AppointmentsStore {
  appointments: IAppointment[];
  setAppointments: (appointments:IAppointment[]) => void;
  clearAppointments: () => void;
}

export const useAppointmentsStore = create<AppointmentsStore>((set) => ({
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  clearAppointments: () => set({ appointments: [] }),
}));