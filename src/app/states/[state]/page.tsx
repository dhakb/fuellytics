import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ChevronRight, Download, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StateOverview from "@/components/state-overview";
import CitiesDataTable from "@/components/cities-data-table";
import PriceRangeChartsByState from "@/components/price-range-charts-by-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CityPriceComparisonByState from "@/components/city-price-comparison-by-state";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { mockDataByStateWithCities } from "@/lib/mock-data-by-state-with-cities";


interface CityData {
  name: string;
  regular: string;
  midGrade: string;
  premium: string;
  diesel: string;
}

interface StateDataWithCities {
  state: {
    name: string
    regular: string
    midGrade: string
    premium: string
    diesel: string
  };
  cities: CityData[];
}

export default async function Page({params}: any) {
  const {state: stateCode}: { state: string } = await params;

  const stateData: StateDataWithCities = mockDataByStateWithCities[stateCode as keyof typeof mockDataByStateWithCities];
  const {state, cities} = stateData;
  // console.log(stateData);
  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/states">
              <ArrowLeft className="mr-2 h-4 w-4"/>
              <h3>Back to States</h3>
            </Link>
          </Button>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold tracking-tight">{state.name}</h2>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground"/>
            <span className="text-muted-foreground">Fuel Prices</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4"/>
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4"/>
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cities">Cities</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>State Overview</CardTitle>
              <CardDescription>Current fuel prices in {state.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[200px] w-full"/>}>
                <StateOverview stateData={state}/>
              </Suspense>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Price Range</CardTitle>
                <CardDescription>Min, max and average prices in {state.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[300px] w-full"/>}>
                  <PriceRangeChartsByState state={state} cities={cities}/>
                </Suspense>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Cities</CardTitle>
                <CardDescription>Cities with lowest regular gas prices</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[300px] w-full"/>}>
                  <CityPriceComparisonByState cities={cities} state={state}/>
                </Suspense>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Cities
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cities in {state.name}</CardTitle>
              <CardDescription>Fuel prices for all cities in {state.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px] w-full"/>}>
                <CitiesDataTable cities={cities}/>
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}