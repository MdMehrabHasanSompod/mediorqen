"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAdminStore } from "@/src/store/admin.store";
import { useSuperAdminStore } from "@/src/store/super-admin.store";
import { getUsers } from "../utils/getUsers";


export default function UsersLoader() {  
  const session = useSession();
  const setAdminUsers = useAdminStore((state)=> state.setUsers);
  const clearAdminUsers = useAdminStore((state)=>state.clearUsers);
  const setSuperAdminUsers= useSuperAdminStore((state)=> state.setUsers);
  const clearSuperAdminUsers = useSuperAdminStore((state)=>state.clearUsers);


  useEffect(() => {
    if (session.status === "authenticated" && session.data.user && (session.data.user.role === "admin" || session.data.user.role === "super-admin")) {
      const loadUsers = async () => {
        try {
          const fetchedUsers = await getUsers({
            id: session.data.user.id,
            role: session.data.user.role,
          });
          switch (session.data.user.role) {
            case "admin":
               setAdminUsers(fetchedUsers);
              break;

            case "super-admin":
               setSuperAdminUsers(fetchedUsers);
              break;
          
            default:
              console.warn("Unknown role:", session.data.user.role);
              break;
          }
        } catch (error) {
          console.error("Failed to load users:", error);
        }
      };

      loadUsers();
    }
  }, [session.status, session.data,  setAdminUsers, setSuperAdminUsers]);


  useEffect(() => {
    if (session.status === "unauthenticated") {
      clearAdminUsers();
      clearSuperAdminUsers();
    }
  }, [session.status, clearAdminUsers, clearSuperAdminUsers]);

  return null;
}
