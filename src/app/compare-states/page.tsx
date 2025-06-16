import type { Metadata } from "next";
import { Suspense } from "react";
import { BarChart3, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StateComparison from "@/components/state-comparison";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export const metadata: Metadata = {
  title: "Compare States - Fuellytics",
  description: "Compare fuel prices across different states"
};

export default function ComparePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compare Fuel Prices</h2>
          <p className="text-muted-foreground">Compare fuel prices between states and national averages</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4"/>
            View Trends
          </Button>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4"/>
            Export Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>State Price Comparison</CardTitle>
          <CardDescription>Select two locations to compare fuel prices side by side</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-[600px] w-full"/>}>
            <StateComparison/>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
