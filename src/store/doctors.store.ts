import { create } from "zustand";
import { IPublicDoctor } from "@/types/public-doctor";

interface DoctorsStore {
  doctors: IPublicDoctor[];
  setDoctors: (doctors: IPublicDoctor[]) => void;
  clearDoctors: () => void;
}

export const useDoctorsStore = create<DoctorsStore>((set) => ({
  doctors: [],
  setDoctors: (doctors) => set({ doctors }),
  clearDoctors: () => set({ doctors: [] }),

}));
