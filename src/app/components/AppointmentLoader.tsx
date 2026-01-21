"use client";
import { useAppointmentStore } from "@/src/store/appointment.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getAppointments } from "../utils/getAppointments";
import { useDoctorStore } from "@/src/store/doctor.store";
import { useAppointmentsStore } from "@/src/store/appointments.store";


export default function AppointmentsLoader() {  
  const session = useSession();
  const setUserAppointments = useAppointmentStore((state) => state.setAppointments);
  const clearUserAppointments = useAppointmentStore((state) => state.clearAppointments);
  const setDoctorAppointments = useDoctorStore((state)=> state.setAppointments);
  const clearDoctorAppointments = useDoctorStore((state)=>state.clearAppointments);
  const setAppointments = useAppointmentsStore((state)=> state.setAppointments);
  const clearAppointments = useAppointmentStore((state)=>state.clearAppointments);


  useEffect(() => {
    if (session.status === "authenticated" && session.data.user) {
      const loadAppointments = async () => {
        try {
          const fetchedAppointments = await getAppointments({
            id: session.data.user.id,
            role: session.data.user.role,
          });
          switch (session.data.user.role) {
            case "user":
               setUserAppointments(fetchedAppointments);
              break;
            
            case "doctor":
               setDoctorAppointments(fetchedAppointments);
              break;
            
            case "admin":
               setAppointments(fetchedAppointments);
              break;

            case "super-admin":
               setAppointments(fetchedAppointments);
              break;
          
            default:
              console.warn("Unknown role:", session.data.user.role);
              break;
          }
        } catch (error) {
          console.error("Failed to load appointments:", error);
        }
      };

      loadAppointments();
    }
  }, [session.status, session.data, setUserAppointments, setDoctorAppointments,setAppointments]);


  useEffect(() => {
    if (session.status === "unauthenticated") {
      clearUserAppointments();
      clearDoctorAppointments();
      clearAppointments();
    }
  }, [session.status, clearUserAppointments, clearDoctorAppointments,clearAppointments]);

  return null;
}
