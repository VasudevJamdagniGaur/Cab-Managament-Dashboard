import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import CostBreakdown from "@/components/billing/CostBreakdown";
import BillingReports from "@/components/billing/BillingReports";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import dummy data (would be replaced with API calls in a real app)
import { costBreakdown, monthlyCostData } from "@/lib/dummyData";

export default function CostBilling() {
  const [period, setPeriod] = useState("monthly");
  const [branch, setBranch] = useState("all");
  
  // In a real app, we'd fetch this data from the API
  /*
  const { data: costReport, isLoading: isLoadingCostReport } = useQuery({
    queryKey: ['/api/cost-report', { period, branch }],
  });
  */
  
  // For demonstration, we're using dummy data
  const {
    totalCost,
    avgPerRide,
    costPerKm,
    departmentCosts
  } = costBreakdown;

  return (
    <DashboardLayout title="Cost & Billing">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Cost & Billing</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Branch" />
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
      
      <CostBreakdown 
        totalCost={totalCost}
        avgPerRide={avgPerRide}
        costPerKm={costPerKm}
        departmentCosts={departmentCosts}
        chartData={monthlyCostData}
      />
      
      <BillingReports />
    </DashboardLayout>
  );
}
