import "./globals.css";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header";
import Footer from "@/components/footer";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Fuellytics - US Fuel Price Analytic",
  description: "Track and analyze fuel prices across the US"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="relative flex min-h-screen flex-col">
      <Header/>
      <div className="flex-1">{children}</div>
      <Footer/>
    </div>
    </body>
    </html>
  );
}
