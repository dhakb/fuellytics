"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";


interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({className, ...props}: MainNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/"
    },
    {
      href: "/states",
      label: "States",
      active: pathname === "/states" || pathname.startsWith("/states/")
    },
    {
      href: "/compare-states",
      label: "Compare States",
      active: pathname === "/compare-states" || pathname.startsWith("/compare-states/")
    },
    {
      href: "/analytics",
      label: "Analytics",
      active: pathname === "/analytics" || pathname.startsWith("/analytics/")
    }
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className, {...props})}>
      {
        routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))
      }
    </nav>
  );
}