"use client";

import { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FuelType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAllUsePrice } from "@/lib/mock-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";


export default function StateComparison() {
  const [fuelType, setFuelType] = useState<FuelType>("gasoline");
  const [location1, setLocation1] = useState<string>("National Average");
  const [location2, setLocation2] = useState<string>("National Average");

  const nationalAverage = useMemo(() => {
    const prices = mockAllUsePrice.map((state) => Number.parseFloat(state[fuelType]));
    return prices.reduce((sum, price) => sum + price, 0) / prices.length;
  }, [fuelType]);

  const getLocationPrice = (location: string) => {
    if (location === "National Average") {
      return nationalAverage;
    }
    const state = mockAllUsePrice.find((s) => s.name === location);
    return state ? Number.parseFloat(state[fuelType]) : 0;
  };

  const price1 = getLocationPrice(location1);
  const price2 = getLocationPrice(location2);

  const fuelTypes = [
    {value: "gasoline" as FuelType, label: "Regular"},
    {value: "midGrade" as FuelType, label: "Mid-Grade"},
    {value: "premium" as FuelType, label: "Premium"},
    {value: "diesel" as FuelType, label: "Diesel"}
  ];

  const locationOptions = ["National Average", ...mockAllUsePrice.map((state) => state.name).sort()];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Fuel Type:</span>
          <div className="flex rounded-lg border p-1">
            {fuelTypes.map((fuel) => (
              <Button
                key={fuel.value}
                variant={fuelType === fuel.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setFuelType(fuel.value)}
                className="h-8"
              >
                {fuel.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location 1</label>
          <LocationSelector
            value={location1}
            onValueChange={setLocation1}
            options={locationOptions}
            placeholder="Select first location..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Location 2</label>
          <LocationSelector
            value={location2}
            onValueChange={setLocation2}
            options={locationOptions}
            placeholder="Select second location..."
          />
        </div>
      </div>
    </div>
  );
}

interface LocationSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

function LocationSelector({value, onValueChange, options, placeholder}: LocationSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search locations..."/>
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onValueChange(option);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")}/>
                  {option}
                  {option === "National Average" && (
                    <Badge variant="secondary" className="ml-2">
                      Avg
                    </Badge>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
