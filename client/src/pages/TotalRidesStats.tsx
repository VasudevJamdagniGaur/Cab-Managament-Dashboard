import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import RidesSummary from "@/components/total-rides/RidesSummary";
import RidesTable from "@/components/total-rides/RidesTable";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Import dummy data (would be replaced with API calls in a real app)
import { ridesStats, scheduledRides } from "@/lib/dummyData";

export default function TotalRidesStats() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // In a real app, we'd fetch this data from the API
  /*
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['/api/rides/stats'],
  });
  
  const { data: rides, isLoading: isLoadingRides } = useQuery({
    queryKey: ['/api/rides', { date: date?.toISOString() }],
  });
  */
  
  // For demonstration, we're using dummy data
  const stats = ridesStats;
  const rides = scheduledRides;

  return (
    <DashboardLayout title="Total Rides Statistics">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Total Rides Statistics</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <RidesSummary stats={stats} />
      <RidesTable rides={rides} />
      
      {/* Comparative Analysis */}
      <Card className="mt-6 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Comparative Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Vs Previous Period</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">+12.5%</span>
                <div className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
                  Improved
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Total rides have increased by 12.5% compared to the previous period.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Carpool Utilization</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">23%</span>
                <div className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs font-medium">
                  Needs Attention
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Only 23% of eligible rides are using the carpooling option.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">On-Time Performance</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">94.2%</span>
                <div className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
                  Excellent
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                94.2% of rides arrived within 5 minutes of scheduled time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
