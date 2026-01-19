"use client";
import { useDoctorsStore } from "@/src/store/doctors.store";
import { useEffect } from "react";
import { getDoctors } from "../utils/getDoctors";



export default function DoctorsLoader() {  
  const setDoctors = useDoctorsStore((state) => state.setDoctors);

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
