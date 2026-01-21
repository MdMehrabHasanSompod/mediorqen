import { create } from "zustand";
import { IAdmin } from "@/types/admin";
import { IAppointment } from "@/types/appointment";
import { IUser } from "@/types/user";

interface AdminStore {
  admin: IAdmin | null;
  setAdmin: (admin: IAdmin) => void;
  clearAdmin: () => void;
  appointments: IAppointment[];
  setAppointments: (appointments:IAppointment[]) => void;
  clearAppointments: () => void;
  users: IUser[];
  setUsers: (users:IUser[]) => void;
  clearUsers : () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
  clearAdmin: () => set({ admin: null }),
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  clearAppointments: () => set({ appointments: [] }),
  users : [],
  setUsers: (users) => set({users}),
  clearUsers: () => set({users:[]}) ,
}));