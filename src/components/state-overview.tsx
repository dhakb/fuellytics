import { FuelIcon as GasPump } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


interface StateData {
  name: string;
  regular: string;
  midGrade: string;
  premium: string;
  diesel: string;
}

interface StateOverviewProps {
  stateData: StateData;
}

export default function StateOverview({stateData}: StateOverviewProps) {

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center p-6">
          <GasPump className="h-8 w-8 text-muted-foreground mr-4"/>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Regular</p>
            <p className="text-2xl font-bold">${Number.parseFloat(stateData.regular.split("$")[1]).toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <GasPump className="h-8 w-8 text-muted-foreground mr-4"/>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Mid-Grade</p>
            <p className="text-2xl font-bold">${Number.parseFloat(stateData.midGrade.split("$")[1]).toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <GasPump className="h-8 w-8 text-muted-foreground mr-4"/>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Premiums</p>
            <p className="text-2xl font-bold">${Number.parseFloat(stateData.premium.split("$")[1]).toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <GasPump className="h-8 w-8 text-muted-foreground mr-4"/>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Diesel</p>
            <p className="text-2xl font-bold">${Number.parseFloat(stateData.diesel.split("$")[1]).toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}