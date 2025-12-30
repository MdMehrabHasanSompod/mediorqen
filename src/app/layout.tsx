import { Metadata } from "next";
import {Inter, Poppins} from 'next/font/google'
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";

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
        className="bg-blue-200 h-screen w-full"
      >
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
