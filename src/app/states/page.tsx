import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { mockAllUsePrice } from "@/lib/mock-data";
import StatesDataTable from "@/components/states-data-table";


export const metadata: Metadata = {
  title: "All States - Fuellytics",
  description: "Browse fuel prices for all US states"
};

export default function Page() {

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3px font-bold tracking-tight">All States</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="mr-1 h-4 w-4"/>
            Filter
          </Button>

          <Button variant="outline">
            <Download className="mr-1 h-4 w-4"/>
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>US States Fuel Prices</CardTitle>
          <CardDescription>Current fuel prices for all 51 states</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-[600px] w-full"/>}>
            <StatesDataTable allUsaPrice={mockAllUsePrice}/>
          </Suspense>
        </CardContent>
      </Card>

    </main>
  );
}

