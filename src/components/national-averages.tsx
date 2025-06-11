"use client";

import { ArrowDown, ArrowUp, Download, Filter, Info } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import type { StateData } from "@/lib/types";


interface NationalAveragesProps {
  fuelType: string;
  allUsaPrice: StateData[];
}

export function NationalAverages({fuelType, allUsaPrice}: NationalAveragesProps) {
  const prices = allUsaPrice.map((state) => Number.parseFloat(state[fuelType as keyof typeof state] as string));
  const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const priceSpread = maxPrice - minPrice;


  const minPriceState = allUsaPrice.find(
    (state) => Number.parseFloat(state[fuelType as keyof typeof state] as string) === minPrice
  );
  const maxPriceState = allUsaPrice.find(
    (state) => Number.parseFloat(state[fuelType as keyof typeof state] as string) === maxPrice
  );

  const topStates = [...allUsaPrice];
  // .sort(
  //   (a, b) =>
  //     Number.parseFloat(a[fuelType as keyof typeof a] as string) -
  //     Number.parseFloat(b[fuelType as keyof typeof b] as string)
  // )
  // .slice(0, 10);

  const chartData = topStates.map((state) => ({
    name: state.name,
    price: Number.parseFloat(state[fuelType as keyof typeof state] as string)
  }));

  const getFuelTypeDisplay = () => {
    switch (fuelType) {
      case "gasoline":
        return "Regular Gasoline";
      case "midGrade":
        return "Mid-Grade Gasoline";
      case "premium":
        return "Premium Gasoline";
      case "diesel":
        return "Diesel";
      default:
        return fuelType;
    }
  };

  const getFuelTypeColor = () => {
    switch (fuelType) {
      case "gasoline":
        return "#3b82f6";
      case "midGrade":
        return "#10b981";
      case "premium":
        return "#8b5cf6";
      case "diesel":
        return "#f97316";
      default:
        return "#3b82f6";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">National Average</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePrice.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDown className="mr-1 h-4 w-4 text-red-500"/>
              <span className="text-red-500">2.1%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Price</CardTitle>
            <ArrowDown className="h-4 w-4 text-green-500"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${minPrice.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">{minPriceState?.name || "N/A"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Price</CardTitle>
            <ArrowUp className="h-4 w-4 text-red-500"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${maxPrice.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">{maxPriceState?.name || "N/A"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Spread</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${priceSpread.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Difference between highest and lowest</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{getFuelTypeDisplay()} Price Chart</CardTitle>
            <CardDescription>View {getFuelTypeDisplay().toLowerCase()} prices across the United States</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4"/>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 60}}>
                <CartesianGrid strokeDasharray="1 1"/>
                <XAxis dataKey="name" angle={-55} textAnchor="end" height={70}/>
                <YAxis domain={["auto", "auto"]} tickFormatter={(value: number) => `$${value.toFixed(2)}`}/>
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                  labelFormatter={(label: string) => `State: ${label}`}
                />
                <Legend verticalAlign="top" height={50}/>
                <Bar dataKey="price" name={`${getFuelTypeDisplay()} Price`} radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={getFuelTypeColor()}/>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
