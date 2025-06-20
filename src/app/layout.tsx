import "./globals.css";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";


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
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="relative flex min-h-screen flex-col">
        <Header/>
        <div className="flex-1">{children}</div>
        <Footer/>
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}
