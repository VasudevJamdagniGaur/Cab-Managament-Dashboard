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
import { CarTaxiFront, Car, BanknoteIcon, Star } from "lucide-react";

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
  carpoolSuggestions
} from "@/lib/dummyData";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  // In a real app, we'd fetch this data from the API
  /*
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['/api/dashboard/summary'],
  });
  
  const { data: rides, isLoading: isLoadingRides } = useQuery({
    queryKey: ['/api/rides'],
  });
  
  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['/api/reviews'],
  });
  
  const { data: carpoolSuggestions, isLoading: isLoadingCarpoolSuggestions } = useQuery({
    queryKey: ['/api/carpool-suggestions'],
  });
  */

  // For demonstration, we're using dummy data
  const stats = dashboardStats;
  const rides = carpooledRides;
  const reviews = recentReviews;
  
  // Navigate to different dashboard sections when clicking on summary cards
  const navigateToRides = () => setLocation("/rides");
  const navigateToLiveTracking = () => setLocation("/live-tracking");
  const navigateToBilling = () => setLocation("/billing");
  const navigateToReviews = () => setLocation("/reviews");

  return (
    <DashboardLayout title="Cab Dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard 
          title="Total Rides Today"
          value={stats.totalRidesToday}
          icon={CarTaxiFront}
          iconBgColor="bg-primary-50"
          iconColor="text-primary-600"
          trend={{ value: "12%", label: "vs yesterday", positive: true }}
          onClick={navigateToRides}
        />
        
        <SummaryCard 
          title="Live Trips"
          value={stats.liveTrips}
          icon={Car}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
          trend={{ value: "Active now", label: "" }}
          onClick={navigateToLiveTracking}
        />
        
        <SummaryCard 
          title="Monthly Cost (₹)"
          value={formatCurrency(stats.monthlyCost, "₹")}
          icon={BanknoteIcon}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
          trend={{ value: "8%", label: "vs last month", positive: false }}
          onClick={navigateToBilling}
        />
        
        <SummaryCard 
          title="Avg. Employee Rating"
          value={`${stats.avgRating}/5`}
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
