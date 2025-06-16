"use client";

import { ArrowDown, ArrowUp, Minus, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FuelType } from "@/lib/types";


interface ComparisonDetailsProps {
  location1: string;
  location2: string;
  price1: number;
  price2: number;
  fuelType: FuelType;
  nationalAverage: number;
}

export default function ComparisonDetails({
  location1,
  location2,
  price1,
  price2,
  fuelType,
  nationalAverage
}: ComparisonDetailsProps) {
  const diff1 = price1 - nationalAverage;
  const diff2 = price2 - nationalAverage;

  const getTrendIcon = (diff: number) => {
    if (diff < -0.05) return <ArrowDown className="h-4 w-4 text-green-500"/>;
    if (diff > 0.05) return <ArrowUp className="h-4 w-4 text-red-500"/>;
    return <Minus className="h-4 w-4 text-yellow-500"/>;
  };

  const getPriceBadge = (diff: number) => {
    if (diff < -0.3) return <Badge className="bg-green-500">Very Low</Badge>;
    if (diff < -0.1) return <Badge className="bg-green-400">Low</Badge>;
    if (diff < 0.1) return <Badge className="bg-yellow-500">Average</Badge>;
    if (diff < 0.3) return <Badge className="bg-orange-500">High</Badge>;
    return <Badge className="bg-red-500">Very High</Badge>;
  };

  const calculateTripSavings = (distance: number, mpg: number) => {
    const gallonsNeeded = distance / mpg;
    const cost1 = gallonsNeeded * price1;
    const cost2 = gallonsNeeded * price2;
    return Math.abs(cost1 - cost2);
  };

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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Detailed Comparison</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{location1}</CardTitle>
              {getTrendIcon(diff1)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${price1.toFixed(2)}</span>
              {getPriceBadge(diff1)}
            </div>
            <div className="text-sm text-muted-foreground">{getFuelTypeDisplay()}</div>
            <div className="text-sm">
              <span className="text-muted-foreground">vs National Avg: </span>
              <span className={diff1 >= 0 ? "text-red-600" : "text-green-600"}>
                {diff1 >= 0 ? "+" : ""}${diff1.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{location2}</CardTitle>
              {getTrendIcon(diff2)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${price2.toFixed(2)}</span>
              {getPriceBadge(diff2)}
            </div>
            <div className="text-sm text-muted-foreground">{getFuelTypeDisplay()}</div>
            <div className="text-sm">
              <span className="text-muted-foreground">vs National Avg: </span>
              <span className={diff2 >= 0 ? "text-red-600" : "text-green-600"}>
                {diff2 >= 0 ? "+" : ""}${diff2.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {price1 !== price2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5"/>
              Trip Savings Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">100 miles</div>
                <div className="text-sm text-muted-foreground">25 MPG</div>
                <div className="text-lg font-bold text-green-600">
                  ${calculateTripSavings(100, 25).toFixed(2)} saved
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold">300 miles</div>
                <div className="text-sm text-muted-foreground">25 MPG</div>
                <div className="text-lg font-bold text-green-600">
                  ${calculateTripSavings(300, 25).toFixed(2)} saved
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold">500 miles</div>
                <div className="text-sm text-muted-foreground">25 MPG</div>
                <div className="text-lg font-bold text-green-600">
                  ${calculateTripSavings(500, 25).toFixed(2)} saved
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-2">
              Savings by choosing the cheaper location
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
