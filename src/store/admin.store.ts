import { create } from "zustand";
import { IAdmin } from "@/types/admin";
import { IAppointment } from "@/types/appointment";

interface AdminStore {
  admin: IAdmin | null;
  setAdmin: (admin: IAdmin) => void;
  clearAdmin: () => void;
  appointments: IAppointment[];
  setAppointments: (appointments:IAppointment[]) => void;
  clearAppointments: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
  clearAdmin: () => set({ admin: null }),
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  clearAppointments: () => set({ appointments: [] }),  
}));