"use client";

import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { mockAllUsePrice } from "@/lib/mock-data";
import { getStateCodeByName } from "@/lib/state-codes";


export function TopStatesCards() {
  const router = useRouter();
  const sortedStates = [...mockAllUsePrice].sort((a, b) => Number.parseFloat(a.gasoline) - Number.parseFloat(b.gasoline));

  const cheapestStates = sortedStates.slice(0, 5);
  const expensiveStates = sortedStates.slice(-5).reverse();

  const nationalAvg =
    sortedStates.reduce((sum, state) => sum + Number.parseFloat(state.gasoline), 0) / sortedStates.length;

  const handleStateClick = (stateName: string) => {
    const stateCode = getStateCodeByName(stateName);
    if (stateCode) {
      router.push(`/states/${stateCode.toLowerCase()}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
          >
            <ArrowDown className="h-3 w-3 mr-1"/>
            Lowest
          </Badge>
          <h4 className="font-medium text-sm">Cheapest States</h4>
        </div>

        <div className="space-y-2">
          {cheapestStates.map((state, index) => {
            const price = Number.parseFloat(state.gasoline);
            const diff = price - nationalAvg;

            return (
              <div
                key={state.name}
                className="flex items-center justify-between rounded-md bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => handleStateClick(state.name)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium">{state.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-green-600 dark:text-green-400">${price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">{diff.toFixed(2)} vs avg</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
          >
            <ArrowUp className="h-3 w-3 mr-1"/>
            Highest
          </Badge>
          <h4 className="font-medium text-sm">Most Expensive States</h4>
        </div>

        <div className="space-y-2">
          {expensiveStates.map((state, index) => {
            const price = Number.parseFloat(state.gasoline);
            const diff = price - nationalAvg;

            return (
              <div
                key={state.name}
                className="flex items-center justify-between rounded-md bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => handleStateClick(state.name)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-400 text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="font-medium">{state.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-red-600 dark:text-red-400">${price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">+{diff.toFixed(2)} vs avg</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
