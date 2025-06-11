"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CityData, StateDataWithCities } from "@/lib/types";


type StateData = StateDataWithCities["state"];

interface PriceRangeChartProps {
  state: StateData;
  cities: CityData[];
}

export default function PriceRangeChartsByState({state, cities}: PriceRangeChartProps) {
  const fuelTypes = ["regular", "midGrade", "premium", "diesel"];

  const chartData = fuelTypes.map((fuelType) => {
    const cityPrices = cities.map((city) => Number.parseFloat(city[fuelType as keyof CityData].split("$")[1]));
    const statePrice = Number.parseFloat(state[fuelType as keyof StateData].split("$")[1] as string);

    const minPrice = Math.min(...cityPrices, statePrice);
    const maxPrice = Math.max(...cityPrices, statePrice);
    const avgPrice = cityPrices.length > 0 ? cityPrices.reduce((sum, price) => sum + price, 0) / cityPrices.length : statePrice;

    return {
      fuelType: fuelType.charAt(0).toUpperCase() + fuelType.slice(1),
      min: minPrice,
      max: maxPrice,
      avg: avgPrice,
      state: statePrice
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="4 4"/>
        <XAxis dataKey="fuelType"/>
        <YAxis tickFormatter={(value) => `$${value.toFixed(2)}`}/>
        <Tooltip formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}/>
        <Bar dataKey="min" fill="#10b981" name="Minimum"/>
        <Bar dataKey="avg" fill="#3b82f6" name="Average"/>
        <Bar dataKey="max" fill="#ef4444" name="Maximum"/>
      </BarChart>
    </ResponsiveContainer>
  );
}
