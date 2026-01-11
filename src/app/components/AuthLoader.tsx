"use client";
import { useUserStore } from "@/src/store/user.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUser } from "../utils/getUser";


export default function AuthLoader() {
  const session = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (session.status === "authenticated" && session.data.user) {
      const loadUser = async () => {
        try {
          const fetchedUser = await getUser({
            id: session.data.user.id,
            role: session.data.user.role,
          });

          setUser(fetchedUser);
        } catch (error) {
          console.error("Failed to load user:", error);
        }
      };

      loadUser();
    }
  }, [session.status, session.data, setUser]);


  useEffect(() => {
    if (session.status === "unauthenticated") {
      clearUser();
    }
  }, [session.status, clearUser]);

  return null;
}
