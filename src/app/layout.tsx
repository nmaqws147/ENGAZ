// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SideBar from "./sidebar/page";
import "./globals.css";
import  AllProviders  from "./Allproviders/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENGAZ",
  description: "Your Ultimate Productivity Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AllProviders> 
          <div className="flex min-h-screen"> 
            <SideBar/> 
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </AllProviders>
      </body>
    </html>
  );
}