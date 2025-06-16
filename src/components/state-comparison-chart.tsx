"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";


interface ComparisonChartProps {
  location1: string;
  location2: string;
  price1: number;
  price2: number;
}

export default function ComparisonChart({location1, location2, price1, price2}: ComparisonChartProps) {
  const chartData = [
    {
      name: location1,
      price: price1,
      isLocation1: true
    },
    {
      name: location2,
      price: price2,
      isLocation1: false
    }
  ];

  const getBarColor = (isLocation1: boolean) => {
    if (price1 === price2) return "#6b7280";
    if (price1 < price2) {
      return isLocation1 ? "#10b981" : "#ef4444";
    } else {
      return isLocation1 ? "#ef4444" : "#10b981";
    }
  };

  const priceDifference = Math.abs(price1 - price2);
  const percentageDifference = price1 > 0 && price2 > 0 ? (priceDifference / Math.min(price1, price2)) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 60}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0}/>
            <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `$${value.toFixed(2)}`}/>
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
              labelFormatter={(label) => `Location: ${label}`}
            />
            <Bar dataKey="price" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.isLocation1)}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {price1 !== price2 && (
        <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">${priceDifference.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Price difference ({percentageDifference.toFixed(1)}%)</div>
            <div className="text-sm mt-1">
              {price1 < price2 ? (
                <span className="text-green-600 font-medium">{location1} is cheaper</span>
              ) : (
                <span className="text-green-600 font-medium">{location2} is cheaper</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
