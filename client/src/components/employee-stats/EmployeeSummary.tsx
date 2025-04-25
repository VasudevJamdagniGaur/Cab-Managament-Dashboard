import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface EmployeeSummaryProps {
  employeesServedToday: number;
  employeesServedThisMonth: number;
}

export function EmployeeSummary({ employeesServedToday, employeesServedThisMonth }: EmployeeSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Employees Served Today</p>
              <h3 className="text-2xl font-bold text-gray-900">{employeesServedToday}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3">
              <Users className="h-6 w-6 text-green-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Employees Served This Month</p>
              <h3 className="text-2xl font-bold text-gray-900">{employeesServedThisMonth}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmployeeSummary;
