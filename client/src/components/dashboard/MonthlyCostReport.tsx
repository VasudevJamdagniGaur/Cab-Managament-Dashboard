import { useState } from "react";
import { Link } from "wouter";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  dailyCostData, 
  weeklyCostData, 
  monthlyCostData, 
  yearlyCostData 
} from "@/lib/dummyData";

interface ChartData {
  [key: string]: any;
  cost: number;
}

interface MonthlyCostReportProps {
  data?: any[];
}

export function MonthlyCostReport({ data }: MonthlyCostReportProps) {
  const [period, setPeriod] = useState("monthly");

  // Get the appropriate data based on the selected period
  const getChartData = (): ChartData[] => {
    switch (period) {
      case "daily":
        return dailyCostData;
      case "weekly":
        return weeklyCostData;
      case "monthly":
        return monthlyCostData;
      case "yearly":
        return yearlyCostData;
      default:
        return monthlyCostData;
    }
  };
  
  const chartData = getChartData();

  // Calculate total, average per ride, and cost per km
  const totalCost = chartData.reduce((sum, item) => sum + item.cost, 0);
  const avgPerRide = 462; // Simplified for demo
  const costPerKm = 18.5; // Simplified for demo

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {period === "daily" ? "Daily" : 
           period === "weekly" ? "Weekly" : 
           period === "yearly" ? "Yearly" : "Monthly"} Cost Report
        </h2>
        <div className="relative">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] bg-gray-50 border border-gray-300 text-gray-700 h-8 py-0">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-5">
        <div className="w-full h-64 bg-gray-50 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey={
                period === "daily" ? "day" : 
                period === "weekly" ? "week" : 
                period === "yearly" ? "year" : "month"
              } />
              <YAxis 
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                width={60}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Cost']}
                labelFormatter={(label) => {
                  switch (period) {
                    case "daily":
                      return `Day: ${label}`;
                    case "weekly":
                      return `Week: ${label}`;
                    case "yearly":
                      return `Year: ${label}`;
                    default:
                      return `Month: ${label}`;
                  }
                }}
              />
              <Bar 
                dataKey="cost" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">Total Cost</p>
            <h3 className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalCost)}
            </h3>
            <div className="flex items-center justify-center mt-1">
              <span className="text-xs text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7 7m0 0l7-7m-7 7V3" />
                </svg>
                <span>8.2%</span>
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Avg. Per Ride</p>
            <h3 className="text-lg font-semibold text-gray-900">
              {formatCurrency(avgPerRide)}
            </h3>
            <div className="flex items-center justify-center mt-1">
              <span className="text-xs text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>3.1%</span>
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Cost Per Km</p>
            <h3 className="text-lg font-semibold text-gray-900">
              {formatCurrency(costPerKm)}
            </h3>
            <div className="flex items-center justify-center mt-1">
              <span className="text-xs text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>2.8%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyCostReport;
