import { IAppointment } from "@/types/appointment";
import { ISuperAdmin } from "@/types/super-admin";
import { IUser } from "@/types/user";
import { create } from "zustand";


interface SuperAdminStore {
  superAdmin: ISuperAdmin | null;
  setSuperAdmin: (superAdmin: ISuperAdmin) => void;
  clearSuperAdmin: () => void;
  appointments: IAppointment[];
  setAppointments: (appointments:IAppointment[]) => void;
  clearAppointments: () => void;
  users: IUser[];
  setUsers: (users:IUser[]) => void;
  clearUsers : () => void;
  
}

export const useSuperAdminStore = create<SuperAdminStore>((set) => ({
  superAdmin: null,
  setSuperAdmin: (superAdmin) => set({ superAdmin }),
  clearSuperAdmin: () => set({ superAdmin: null }),
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  clearAppointments: () => set({ appointments: [] }),  
  users : [],
  setUsers: (users) => set({users}),
  clearUsers: () => set({users:[]}) ,
}));