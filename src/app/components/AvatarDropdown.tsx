"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface IUser {
    id: string
    email: string
    name: string
    role: string
    image?: string | null
  }

export default function AvatarDropdown({ user }:{user:IUser}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border border-gray-300 flex items-center justify-center"
      >
              {user.image ? (
                    <Image
                    src={user.image}
                    alt="User avatar"
                    width={40}
                    height={40}
                     className="rounded-full"
                    />
                  ) : ( <User className="w-6 h-6 rounded-full bg-white text-blue-600"/>)}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-blue-50 border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <Link
            href="/user/dashboard"
            className="block px-4 py-2 text-blue-700 hover:bg-blue-100"
          >
            Dashboard
          </Link>
          <Link
            href="/user/appointments"
            className="block px-4 py-2 text-blue-700 hover:bg-blue-100 "
          >
            Appointments
          </Link>
          <button className='w-full text-left px-4 py-2 flex items-center justify-between gap-1 text-red-600 cursor-pointer hover:bg-red-100' onClick={()=>signOut()}
          >
            Logout <LogOut className='w-6 h-6'/>
          </button>
        </div>
      )}
    </div>
  );
}
