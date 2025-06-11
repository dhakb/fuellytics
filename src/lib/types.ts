export type FuelType = "gasoline" | "midGrade" | "premium" | "diesel";

export interface StateData {
  name: string;
  gasoline: string;
  midGrade: string;
  premium: string;
  diesel: string;
  currency: string;
}

export interface CityData {
  name: string;
  regular: string;
  midGrade: string;
  premium: string;
  diesel: string;
}

export interface StateDataWithCities {
  state: {
    name: string
    regular: string
    midGrade: string
    premium: string
    diesel: string
  };
  cities: CityData[];
}

export interface PriceStats {
  min: number;
  max: number;
  avg: number;
  range: number;
}
