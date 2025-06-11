"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { FuelType, StateData, PriceStats } from "@/lib/types";


interface EnhancedTooltipProps {
  state: StateData;
  fuelType: FuelType;
  priceStats: PriceStats;
  showTrends: boolean;
  position: { x: number; y: number };
}

export default function UsMapTooltip({state, fuelType, priceStats, showTrends, position}: EnhancedTooltipProps) {
  const price = Number.parseFloat(state[fuelType]);
  const percentile = ((price - priceStats.min) / priceStats.range) * 100;

  const getTrendIcon = () => {
    if (price < priceStats.avg * 0.95) return <TrendingDown className="h-4 w-4 text-green-500"/>;
    if (price > priceStats.avg * 1.05) return <TrendingUp className="h-4 w-4 text-red-500"/>;
    return <Minus className="h-4 w-4 text-yellow-500"/>;
  };

  const getRankText = () => {
    if (percentile < 20) return "Very Low";
    if (percentile < 40) return "Low";
    if (percentile < 60) return "Average";
    if (percentile < 80) return "High";
    return "Very High";
  };

  const getRankColor = () => {
    if (percentile < 20) return "bg-green-500";
    if (percentile < 40) return "bg-green-400";
    if (percentile < 60) return "bg-yellow-500";
    if (percentile < 80) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{opacity: 0, scale: 0.8, y: 10}}
      animate={{opacity: 1, scale: 1, y: 0}}
      exit={{opacity: 0, scale: 0.8, y: 10}}
      className="absolute z-50 pointer-events-none"
      style={{
        left: position.x + 30,
        top: position.y - 70,
        transform: "translate(-50%, -100%)",
        marginTop: "-15px"
      }}
    >
      <Card className="w-58 h-60 shadow-xl border-2 bg-white dark:bg-gray-900 p-0">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{state.name}</h3>
              {showTrends && getTrendIcon()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${price.toFixed(2)}</span>
                <Badge className={getRankColor()}>{getRankText()}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {price - priceStats.avg >= 0 ? "+" : ""}${(price - priceStats.avg).toFixed(2)} vs national avg
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Regular:</span>
                  <span className="font-medium">${Number.parseFloat(state.gasoline).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mid-Grade:</span>
                  <span className="font-medium">${Number.parseFloat(state.midGrade).toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Premium:</span>
                  <span className="font-medium">${Number.parseFloat(state.premium).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Diesel:</span>
                  <span className="font-medium">${Number.parseFloat(state.diesel).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Price Percentile</span>
                <span>{percentile.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${getRankColor()}`} style={{width: `${percentile}%`}}/>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div
        className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-0 h-0
             border-t-8 border-b-8 border-r-8
             border-t-transparent border-b-transparent
             border-r-gray-200 dark:border-r-gray-900"
      />
    </motion.div>
  );
}
