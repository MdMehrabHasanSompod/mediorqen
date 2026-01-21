import { ISuperAdmin } from "@/types/super-admin";
import { create } from "zustand";


interface SuperAdminStore {
  superAdmin: ISuperAdmin | null;
  setSuperAdmin: (superAdmin: ISuperAdmin) => void;
  clearSuperAdmin: () => void;
}

export const useSuperAdminStore = create<SuperAdminStore>((set) => ({
  superAdmin: null,
  setSuperAdmin: (superAdmin) => set({ superAdmin }),
  clearSuperAdmin: () => set({ superAdmin: null }),
}));