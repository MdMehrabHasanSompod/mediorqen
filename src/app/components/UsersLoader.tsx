"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUsers } from "../utils/getUsers";
import { useUsersStore } from "@/src/store/users.store";


export default function UsersLoader() {  
  const session = useSession();
  const setUsers = useUsersStore((state)=> state.setUsers);
  const clearUsers = useUsersStore((state)=>state.clearUsers);



  useEffect(() => {
    if (session.status === "authenticated" && session.data.user && (session.data.user.role === "admin" || session.data.user.role === "super-admin")) {
      const loadUsers = async () => {
        try {
          const fetchedUsers = await getUsers({
            id: session.data.user.id,
            role: session.data.user.role,
          });

            setUsers(fetchedUsers);

        } catch (error) {
          console.error("Failed to load users:", error);
        }
      };

      loadUsers();
    }
  }, [session.status, session.data,  setUsers]);


  useEffect(() => {
    if (session.status === "unauthenticated") {
      clearUsers();
    }
  }, [session.status, clearUsers]);

  return null;
}
