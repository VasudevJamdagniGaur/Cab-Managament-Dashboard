import { DashboardLayout } from "@/components/layout/DashboardLayout";
import EmployeeSummary from "@/components/employee-stats/EmployeeSummary";
import EmployeeList from "@/components/employee-stats/EmployeeList";
import { useQuery } from "@tanstack/react-query";

// Import dummy data (would be replaced with API calls in a real app)
import { employeeStats } from "@/lib/dummyData";

export default function EmployeeUsageStats() {
  // In a real app, we'd fetch this data from the API
  /*
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['/api/employee-stats'],
  });
  */
  
  // For demonstration, we're using dummy data
  const stats = employeeStats;

  return (
    <DashboardLayout title="Employee Usage Stats">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Usage Stats</h1>
      </div>
      
      <EmployeeSummary 
        employeesServedToday={stats.employeesServedToday} 
        employeesServedThisMonth={stats.employeesServedThisMonth} 
      />
      
      <EmployeeList employees={stats.employees} />
    </DashboardLayout>
  );
}
