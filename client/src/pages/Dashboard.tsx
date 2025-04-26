import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import SummaryCard from "@/components/dashboard/SummaryCard";
import CarpooledRidesTable from "@/components/dashboard/CarpooledRidesTable";
import EmployeeFeedback from "@/components/dashboard/EmployeeFeedback";
import LiveTripMonitoring from "@/components/dashboard/LiveTripMonitoring";
import MonthlyCostReport from "@/components/dashboard/MonthlyCostReport";
import CarpoolingSuggestions from "@/components/dashboard/CarpoolingSuggestions";
import { formatCurrency } from "@/lib/utils";
import { CarTaxiFront, Car, BanknoteIcon, Star, BuildingIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import dummy data (would be replaced with API calls in a real app)
import { 
  dashboardStats, 
  carpooledRides, 
  recentReviews,
  liveTrips,
  monthlyCostData,
  dailyCostData,
  weeklyCostData,
  yearlyCostData,
  carpoolSuggestions,
  branchOptions
} from "@/lib/dummyData";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [selectedBranch, setSelectedBranch] = useState("all");

  // In a real app, we'd fetch this data from the API
  /*
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['/api/dashboard/summary', { branch: selectedBranch }],
  });
  
  const { data: rides, isLoading: isLoadingRides } = useQuery({
    queryKey: ['/api/rides', { branch: selectedBranch }],
  });
  
  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['/api/reviews', { branch: selectedBranch }],
  });
  
  const { data: carpoolSuggestions, isLoading: isLoadingCarpoolSuggestions } = useQuery({
    queryKey: ['/api/carpool-suggestions', { branch: selectedBranch }],
  });
  */

  // Define the dashboard stats type for type safety
  type BranchStats = {
    totalRidesToday: number;
    liveTrips: number;
    monthlyCost: number;
    avgRating: number;
  };

  // For demonstration, we're using dummy data
  // Get the stats for the selected branch
  const branchStats: BranchStats = 
    (selectedBranch === "Delhi" && dashboardStats.Delhi) ||
    (selectedBranch === "Mumbai" && dashboardStats.Mumbai) ||
    (selectedBranch === "Bangalore" && dashboardStats.Bangalore) ||
    (selectedBranch === "Hyderabad" && dashboardStats.Hyderabad) ||
    dashboardStats.all;
  
  // Filter other data based on branch (in a real app, this would be done on the server)
  const allRides = carpooledRides;
  const rides = selectedBranch === "all" 
    ? allRides 
    : allRides.filter(ride => {
        // Simple filter based on location - in a real app, rides would have branch information
        if (selectedBranch === "Delhi") {
          return ride.endLocation.includes("Gurugram") || 
                 ride.endLocation.includes("Delhi") || 
                 ride.endLocation.includes("Noida") || 
                 ride.endLocation.includes("Ghaziabad");
        } else if (selectedBranch === "Mumbai") {
          return ride.endLocation.includes("Mumbai") || 
                 ride.endLocation.includes("Powai") || 
                 ride.endLocation.includes("Bandra");
        } else if (selectedBranch === "Bangalore") {
          return ride.endLocation.includes("Bangalore") || 
                 ride.endLocation.includes("Electronic City") || 
                 ride.endLocation.includes("Whitefield");
        } else if (selectedBranch === "Hyderabad") {
          return ride.endLocation.includes("Hyderabad");
        }
        return true;
      });
      
  const reviews = recentReviews;
  
  // Handle branch change
  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
  };
  
  // Navigate to different dashboard sections when clicking on summary cards
  const navigateToRides = () => setLocation("/rides");
  const navigateToLiveTracking = () => setLocation("/live-tracking");
  const navigateToBilling = () => setLocation("/billing");
  const navigateToReviews = () => setLocation("/reviews");

  return (
    <DashboardLayout title="Cab Dashboard">
      {/* Summary Cards */}
      {/* Branch Selector */}
      <div className="flex justify-end mb-4">
        <div className="w-full sm:w-[200px]">
          <Select value={selectedBranch} onValueChange={handleBranchChange}>
            <SelectTrigger>
              <div className="flex items-center">
                <BuildingIcon className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Branch" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard 
          title="Total Rides Today"
          value={branchStats.totalRidesToday}
          icon={CarTaxiFront}
          iconBgColor="bg-primary-50"
          iconColor="text-primary-600"
          trend={{ value: "12%", label: "vs yesterday", positive: true }}
          onClick={navigateToRides}
        />
        
        <SummaryCard 
          title="Live Trips"
          value={branchStats.liveTrips}
          icon={Car}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
          trend={{ value: "Active now", label: "" }}
          onClick={navigateToLiveTracking}
        />
        
        <SummaryCard 
          title="Monthly Cost (₹)"
          value={formatCurrency(branchStats.monthlyCost, "₹")}
          icon={BanknoteIcon}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
          trend={{ value: "8%", label: "vs last month", positive: false }}
          onClick={navigateToBilling}
        />
        
        <SummaryCard 
          title="Avg. Employee Rating"
          value={`${branchStats.avgRating}/5`}
          icon={Star}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          trend={{ value: "0.2", label: "vs last month", positive: true }}
          onClick={navigateToReviews}
        />
      </div>

      {/* Content Widgets - Two column layout on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <CarpooledRidesTable rides={rides} />
          <EmployeeFeedback reviews={reviews} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <LiveTripMonitoring trip={liveTrips[0]} />
          <MonthlyCostReport data={monthlyCostData} />
          <CarpoolingSuggestions suggestions={carpoolSuggestions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
