"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { mockAllUsePrice } from "@/lib/mock-data";
import { getStateNameByCode } from "@/lib/state-codes";
import USMapTooltip from "@/components/us-map-tooltip";

import type { FuelType } from "@/lib/types";


interface USAMapProps {
  fuelType?: FuelType;
  className?: string;
}

const stateGrid = [
  ["", "", "", "", "", "", "", "", "", "ME"],
  ["", "", "", "", "", "", "", "", "NH", "VT"],
  ["WA", "ID", "MT", "ND", "MN", "WI", "MI", "NY", "MA", ""],
  ["OR", "NV", "WY", "SD", "IA", "IL", "IN", "OH", "PA", "CT"],
  ["CA", "UT", "CO", "NE", "MO", "KY", "WV", "VA", "MD", "RI"],
  ["", "AZ", "NM", "KS", "AR", "TN", "NC", "SC", "DE", ""],
  ["", "", "", "OK", "LA", "MS", "AL", "GA", "", ""],
  ["HI", "", "", "TX", "", "", "", "FL", "", ""],
  ["AK", "", "", "", "", "", "", "", "", ""]
];

export default function USAMap({fuelType = "gasoline", className}: USAMapProps) {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});

  const prices = mockAllUsePrice.map((state) => Number.parseFloat(state[fuelType]));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const getColor = (price: number) => {
    const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);
    if (normalizedPrice < 0.2) return "#10b981";
    if (normalizedPrice < 0.4) return "#84cc16";
    if (normalizedPrice < 0.6) return "#eab308";
    if (normalizedPrice < 0.8) return "#f97316";
    return "#ef4444";
  };

  const handleStateClick = (stateCode: string) => {
    router.push(`/states/${stateCode.toLowerCase()}`);
  };

  const getStateData = (stateCode: string) => {
    if (!stateCode) return null;
    const stateName = getStateNameByCode(stateCode);
    return mockAllUsePrice.find((state) => state.name === stateName);
  };


  const handleStateHover = (stateCode: string | null, element?: HTMLElement) => {
    if (stateCode && element) {
      const stateName = getStateNameByCode(stateCode);
      setHoveredState(stateName || null);

      const rect = element.getBoundingClientRect();
      const containerRect = element.closest(".grid")?.getBoundingClientRect();

      if (containerRect) {
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top;
        setTooltipPosition({x, y});
      }
    } else {
      setHoveredState(null);
    }
  };

  const priceStats = useMemo(() => {
    const prices = mockAllUsePrice.map((state) => Number.parseFloat(state[fuelType]));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    return {min, max, avg, range: max - min};
  }, [fuelType]);

  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-10 gap-1 max-w-2xl mx-auto relative">
        {stateGrid.map((row, rowIndex) =>
          row.map((stateCode, colIndex) => {
            if (!stateCode) {
              return <div key={`${rowIndex}-${colIndex}`} className="aspect-square"/>;
            }

            const stateData = getStateData(stateCode);
            const price = stateData ? Number.parseFloat(stateData[fuelType]) : 0;
            const stateName = getStateNameByCode(stateCode);
            const isHovered = hoveredState === stateName;

            return (
              <div
                key={stateCode}
                className={cn(
                  "aspect-square rounded-sm border border-white/20 cursor-pointer transition-all hover:scale-110 hover:z-10 relative flex items-center justify-center text-xs font-medium text-white shadow-sm",
                  isHovered && "scale-110 z-10"
                )}
                style={{
                  backgroundColor: price ? getColor(price) : "#e2e8f0"
                }}
                onClick={() => handleStateClick(stateCode)}
                onMouseEnter={(e) => handleStateHover(stateCode, e.currentTarget)}
                onMouseLeave={() => handleStateHover(null)}
              >
                {stateCode}
              </div>
            );
          })
        )}

        <AnimatePresence>
          {hoveredState && (
            <USMapTooltip
              state={mockAllUsePrice.find((s) => s.name === hoveredState)!}
              fuelType={fuelType}
              priceStats={priceStats}
              showTrends={false}
              position={tooltipPosition}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 right-0 flex items-center space-x-2 p-2 text-xs">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#10b981] mr-1"></div>
          <span>Lowest</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#84cc16] mr-1"></div>
          <span>Low</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#eab308] mr-1"></div>
          <span>Average</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#f97316] mr-1"></div>
          <span>High</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#ef4444] mr-1"></div>
          <span>Highest</span>
        </div>
      </div>
    </div>
  );
}
