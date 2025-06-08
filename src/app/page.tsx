import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowDown, ArrowUp, FuelIcon as GasPump, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TopStatesCards } from "@/components/top-states-cards";
import { NationalAverages } from "@/components/national-averages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAllUsePrice } from "@/lib/mock-data";


export const metadata: Metadata = {
  title: "Dashboard - Fuellytics",
  description: "Track and analyze fuel prices across the United States"
};

export default function Home() {
  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Info/>
            About the data
          </Button>
          <Button>
            <GasPump/>
            Find the Cheapest
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gasoline">Regular</TabsTrigger>
          <TabsTrigger value="midgrade">Mid-grade</TabsTrigger>
          <TabsTrigger value="premium">Premiums</TabsTrigger>
          <TabsTrigger value="diesel">Diesel</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regular Gasoline</CardTitle>
                <GasPump className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3.15</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500"/>
                  <span className="text-red-500 pr-1">2.3%</span> from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mid-Grade</CardTitle>
                <GasPump className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3.45</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500"/>
                  <span className="text-red-500 pr-1">1.8%</span> from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Premium</CardTitle>
                <GasPump className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3.75</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowDown className="mr-1 h-4 w-4 text-red-500"/>
                  <span className="text-red-500 pr-1">1.5%</span> from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Diesel</CardTitle>
                <GasPump className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3.95</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500"/>
                  <span className="text-green-500 pr-1">0.5%</span> from last week
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top 5 States</CardTitle>
                <CardDescription>Cheapest and most expensive states</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[400px] w-full"/>}>
                  <TopStatesCards/>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gasoline" className="space-y-4">
          <NationalAverages fuelType="gasoline" allUsaPrice={mockAllUsePrice}/>
        </TabsContent>

        <TabsContent value="midgrade" className="space-y-4">
          <NationalAverages fuelType="midGrade" allUsaPrice={mockAllUsePrice}/>
        </TabsContent>

        <TabsContent value="premium" className="space-y-4">
          <NationalAverages fuelType="premium" allUsaPrice={mockAllUsePrice}/>
        </TabsContent>

        <TabsContent value="diesel" className="space-y-4">
          <NationalAverages fuelType="diesel" allUsaPrice={mockAllUsePrice}/>
        </TabsContent>
      </Tabs>
    </main>
  );
}