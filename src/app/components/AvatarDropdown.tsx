"use client";
import { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IUser } from "@/types/user";
import {IAdmin} from "@/types/admin"
import {ISuperAdmin} from "@/types/super-admin"
import {IDoctor} from "@/types/doctor"
import getAvatar from "../utils/getAvatar";

export default function AvatarDropdown({ user }: { user: IUser | IAdmin | ISuperAdmin | IDoctor }) {
  const session = useSession()
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatar = getAvatar(user)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 
             hover:ring-2 hover:ring-blue-400 transition
             bg-cover bg-center flex items-center justify-center cursor-pointer"
        style={
          avatar
            ? {
                backgroundImage: `url(${avatar})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }
            : undefined
        }
      >
        {!avatar && <User className="w-10 h-10 text-white" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-blue-50 border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <Link
            href={`/${session.data?.user.role}/dashboard`}
            className="block px-4 py-2 text-blue-700 hover:bg-blue-100"
          >
            Dashboard
          </Link>
          <Link
            href="/helpline"
            className="block px-4 py-2 text-blue-700 hover:bg-blue-100 "
          >
            Helpline
          </Link>
          <button
            className="w-full text-left px-4 py-2 flex items-center justify-between gap-1 text-red-600 cursor-pointer hover:bg-red-100"
            onClick={() => signOut()}
          >
            Logout <LogOut className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
