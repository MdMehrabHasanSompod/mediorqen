"use client";
import { useDoctorStore } from "@/src/store/doctor.store";
import { useEffect } from "react";
import { getDoctors } from "../utils/getDoctors";



export default function DoctorsLoader() {  
  const setDoctors = useDoctorStore((state) => state.setDoctors);

  useEffect(() => {
      const loadDoctors = async () => {
        try {
          const fetchedDoctors = await getDoctors();
          setDoctors(fetchedDoctors);
        } catch (error) {
          console.error("Failed to load doctors:", error);
        }
      };
      loadDoctors();
  }, [setDoctors]);


  return null;
}
