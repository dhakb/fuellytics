"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { StateDataWithCities, CityData as City } from "@/lib/types";


type State = StateDataWithCities["state"];

interface CityPriceComparisonProps {
  cities: City[];
  state: State;
}

export default function CityPriceComparison({cities, state}: CityPriceComparisonProps) {
  const sortedCities = [...cities]
    .sort((a, b) => Number.parseFloat(a.regular.split("$")[1]) - Number.parseFloat(b.regular.split("$")[1]))
    .slice(0, 5);

  const chartData = sortedCities.map((city) => ({
    name: city.name,
    price: Number.parseFloat(city.regular.split("$")[1]),
    stateAvg: Number.parseFloat(state.regular.split("$")[1])
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" angle={-25} fontSize={14} textAnchor="end" height={70} tickSize={10}/>
        <YAxis tickFormatter={(value) => `$${value.toFixed(2)}`}/>
        <Tooltip formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}/>
        <Bar dataKey="price" fill="#3b82f6" name="City Price"/>
        <Bar dataKey="stateAvg" fill="#6b7280" name="State Average"/>
      </BarChart>
    </ResponsiveContainer>
  );
}
