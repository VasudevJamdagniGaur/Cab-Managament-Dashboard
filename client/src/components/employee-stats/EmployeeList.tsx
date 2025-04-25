import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EmployeeData {
  id: number;
  fullName: string;
  branch: string;
  totalRides: number;
  ridesToday: number;
  ridesThisMonth: number;
  profileImage: string;
}

interface EmployeeListProps {
  employees: EmployeeData[];
}

export function EmployeeList({ employees: initialEmployees }: EmployeeListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  
  // Filter employees based on search term
  const filteredEmployees = initialEmployees.filter(employee => {
    return !searchTerm || 
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employee.branch.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Display only the first visibleCount employees
  const displayedEmployees = filteredEmployees.slice(0, visibleCount);
  
  const handleShowMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Employee Usage List</CardTitle>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="text" 
              placeholder="Search by name or ID" 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedEmployees.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No employees found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedEmployees.map((employee) => (
                <div key={employee.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <img src={employee.profileImage} alt={employee.fullName} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{employee.fullName}</h3>
                        <div className="text-xs text-gray-500">{employee.branch}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{employee.totalRides}</div>
                        <div className="text-xs text-gray-500">Total Rides</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{employee.ridesToday}</div>
                        <div className="text-xs text-gray-500">Today</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{employee.ridesThisMonth}</div>
                        <div className="text-xs text-gray-500">This Month</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {visibleCount < filteredEmployees.length && (
            <div className="flex justify-center pt-2">
              <button 
                className="px-4 py-2 text-sm font-medium text-primary bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default EmployeeList;
