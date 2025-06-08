"use client";

import { mockAllUsePrice } from "@/lib/mock-data";


export function TopStatesCards({allUsaPrice = mockAllUsePrice}) {
  const sortedStates = [...allUsaPrice].sort((a, b) => Number.parseFloat(a.regular) - Number.parseFloat(b.regular));

  const cheapestStates = sortedStates.slice(0, 5);
  const expensiveStates = sortedStates.slice(-5).reverse();

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-green-600 mb-2">Cheapest States</h4>
        <div className="space-y-1">
          {cheapestStates.map((state) => (
            <div key={state.name} className="flex items-center justify-between text-sm">
              <span>{state.name}</span>
              <span className="font-medium text-green-600">${Number.parseFloat(state.regular).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-red-600 mb-2">Most Expensive States</h4>
        <div className="space-y-1">
          {expensiveStates.map((state, index) => (
            <div key={state.name} className="flex items-center justify-between text-sm">
              <span>{state.name}</span>
              <span className="font-medium text-red-600">${Number.parseFloat(state.regular).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
