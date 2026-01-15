import { create } from "zustand";
import { IAppointment } from "@/types/appointment";

interface IAppointmentStore {
  appointments: IAppointment[];
  setAppointments: (appointments: IAppointment[]) => void;
  addAppointment: (appointment: IAppointment) => void
  clearAppointments: () => void;
}

export const useAppointmentStore = create<IAppointmentStore>((set) => ({
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) =>   set((state) => ({appointments: [appointment, ...state.appointments],})),
  clearAppointments: () => set({ appointments: [] }),
}));
