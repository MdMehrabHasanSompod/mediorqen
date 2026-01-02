import { create } from "zustand";
import { IDoctor } from "@/types/doctor";

interface DoctorStore {
  doctors: IDoctor[];
  setDoctors: (doctors: IDoctor[]) => void;
  clearDoctors: () => void;
}

export const useDoctorStore = create<DoctorStore>((set) => ({
  doctors: [],
  setDoctors: (doctors) => set({ doctors }),
  clearDoctors: () => set({ doctors: [] }),

}));
