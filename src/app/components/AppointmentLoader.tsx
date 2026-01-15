"use client";
import { useAppointmentStore } from "@/src/store/appointment.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getAppointments } from "../utils/getAppointments";


export default function AppointmentsLoader() {  
  const session = useSession();
  const setAppointments = useAppointmentStore((state) => state.setAppointments);
  const clearAppointments = useAppointmentStore((state) => state.clearAppointments);

  useEffect(() => {
    if (session.status === "authenticated" && session.data.user) {
      const loadAppointments = async () => {
        try {
          const fetchedAppointments = await getAppointments({
            id: session.data.user.id,
            role: session.data.user.role,
          });

          setAppointments(fetchedAppointments);
        } catch (error) {
          console.error("Failed to load appointments:", error);
        }
      };

      loadAppointments();
    }
  }, [session.status, session.data, setAppointments]);


  useEffect(() => {
    if (session.status === "unauthenticated") {
      clearAppointments();
    }
  }, [session.status, clearAppointments]);

  return null;
}
