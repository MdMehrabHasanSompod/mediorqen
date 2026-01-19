"use client";
import { useAppointmentStore } from "@/src/store/appointment.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getAppointments } from "../utils/getAppointments";
import { useDoctorStore } from "@/src/store/doctor.store";
import { useAdminStore } from "@/src/store/admin.store";
import { useSuperAdminStore } from "@/src/store/super-admin.store";


export default function AppointmentsLoader() {  
  const session = useSession();
  const setAppointments = useAppointmentStore((state) => state.setAppointments);
  const clearAppointments = useAppointmentStore((state) => state.clearAppointments);
  const setDoctorAppointments = useDoctorStore((state)=> state.setAppointments);
  const clearDoctorAppointments = useDoctorStore((state)=>state.clearAppointments);
  const setAdminAppointments = useAdminStore((state)=> state.setAppointments);
  const clearAdminAppointments = useAdminStore((state)=>state.clearAppointments);
  const setSuperAdminAppointments = useSuperAdminStore((state)=> state.setAppointments);
  const clearSuperAdminAppointments = useSuperAdminStore((state)=>state.clearAppointments);

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
               setAppointments(fetchedAppointments);
              break;
            
            case "doctor":
               setDoctorAppointments(fetchedAppointments);
              break;
            
            case "admin":
               setAdminAppointments(fetchedAppointments);
              break;

            case "super-admin":
               setSuperAdminAppointments(fetchedAppointments);
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
  }, [session.status, session.data, setAppointments, setDoctorAppointments,setAdminAppointments,setSuperAdminAppointments]);


  useEffect(() => {
    if (session.status === "unauthenticated") {
      clearAppointments();
      clearDoctorAppointments();
      clearAdminAppointments();
      clearSuperAdminAppointments();
    }
  }, [session.status, clearAppointments, clearDoctorAppointments,clearAdminAppointments,clearSuperAdminAppointments]);

  return null;
}
