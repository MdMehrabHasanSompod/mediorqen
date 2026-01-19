"use client";
import { useUserStore } from "@/src/store/user.store";
import { useAdminStore } from "@/src/store/admin.store";
import { useSuperAdminStore } from "@/src/store/super-admin.store";
import { useDoctorStore } from "@/src/store/doctor.store";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { getUser } from "../utils/getUser";
import { getAdmin } from "../utils/getAdmin";
import { getSuperAdmin } from "../utils/getSuperAdmin";
import { getDoctor } from "../utils/getDoctor";

export default function AuthLoader() {
  const session = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setAdmin = useAdminStore((state) => state.setAdmin);
  const clearAdmin = useAdminStore((state) => state.clearAdmin);
  const setSuperAdmin = useSuperAdminStore((state) => state.setSuperAdmin);
  const clearSuperAdmin = useSuperAdminStore((state) => state.clearSuperAdmin);
  const setDoctor = useDoctorStore((state) => state.setDoctor);
  const clearDoctor = useDoctorStore((state) => state.clearDoctor);

  const clearAllRoles = useCallback(() => {
    clearUser();
    clearAdmin();
    clearSuperAdmin();
    clearDoctor();
  }, [clearUser, clearAdmin, clearSuperAdmin, clearDoctor]);

  useEffect(() => {
    if (session.status === "authenticated" && session.data.user) {
      const loadUser = async () => {
        try {

         switch (session.data.user.role) {
          case "user":
            const fetchedUser = await getUser({
            id: session.data.user.id,
            role: session.data.user.role,
             });
            clearAllRoles();
            setUser(fetchedUser);
              break;

          case "admin":
           const fetchedAdmin = await getAdmin({
            id: session.data.user.id,
            role: session.data.user.role,
           });
           clearAllRoles();
           setAdmin(fetchedAdmin)
              break;

          case "super-admin":
            const fetchedSuperAdmin = await getSuperAdmin({
            id: session.data.user.id,
            role: session.data.user.role,
           });
           clearAllRoles();
           setSuperAdmin(fetchedSuperAdmin)
              break;

          case "doctor":
            const fetchedDoctor = await getDoctor({
            id: session.data.user.id,
            role: session.data.user.role,
           });
           clearAllRoles();
           setDoctor(fetchedDoctor)
              break;
      
          default:
              console.warn("Unknown role:", session.data.user.role);
              break;
          }
        } catch (error) {
          console.error("Failed to load session user:", error);
        }
      };

      loadUser();
    }

    if (session.status === "unauthenticated") {
      clearAllRoles();
    }
  }, [session.status, session.data, setUser, setAdmin, setSuperAdmin, setDoctor, clearAllRoles]);

  return null;
}
