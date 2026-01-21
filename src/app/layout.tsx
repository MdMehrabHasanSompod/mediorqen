import { Metadata } from "next";
import {Inter, Poppins} from 'next/font/google'
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import AuthLoader from "./components/AuthLoader";
import AppointmentsLoader from "./components/AppointmentLoader";
import DoctorsLoader from "./components/DoctorsLoader";
import UsersLoader from "./components/UsersLoader";

const poppins = Poppins({
  subsets:['latin'],
  weight:['400','500','600','700'],
  variable: '--font-heading'
})

const inter = Inter({
  subsets:['latin'],
  weight:['400','500','600'],
  variable: '--font-body'
})

export const metadata: Metadata = {
  title: "MediOrqen",
  description: "Online doctor appointments booking. Fast, secure, simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <body
        className="bg-linear-to-br from-blue-50 to-blue-200 bg-no-repeat w-full"
      >
        <SessionWrapper>
          <DoctorsLoader/>
          <AuthLoader/>
          <AppointmentsLoader/>
          <UsersLoader/>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
