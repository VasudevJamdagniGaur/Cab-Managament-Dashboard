import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DepartmentCost {
  department: string;
  rideCount: number;
  totalCost: number;
}

interface CostData {
  [key: string]: any;
  cost: number;
}

interface CostBreakdownProps {
  totalCost: number;
  avgPerRide: number;
  costPerKm: number;
  departmentCosts: DepartmentCost[];
  chartData: CostData[];
}

export function CostBreakdown({ totalCost, avgPerRide, costPerKm, departmentCosts, chartData }: CostBreakdownProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6">
      <Card className="col-span-7 lg:col-span-4 shadow-sm">
        <CardHeader>
          <CardTitle>Department-wise Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentCosts}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="department" />
              <YAxis 
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                width={60}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Cost']}
                labelFormatter={(label) => `Department: ${label}`}
              />
              <Bar 
                dataKey="totalCost" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-7 lg:col-span-3 shadow-sm">
        <CardHeader>
          <CardTitle>Cost Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Cost</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {formatCurrency(totalCost)}
                </h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Avg. Per Ride</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {formatCurrency(avgPerRide)}
                </h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Cost Per Km</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {formatCurrency(costPerKm)}
                </h3>
              </div>
            </div>
            
            <div className="border rounded-lg divide-y">
              <div className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700 grid grid-cols-3">
                <div>Department</div>
                <div className="text-center">Rides</div>
                <div className="text-right">Cost (₹)</div>
              </div>
              {departmentCosts.map((dept, index) => (
                <div key={index} className="px-4 py-3 text-sm grid grid-cols-3">
                  <div className="font-medium text-gray-900">{dept.department}</div>
                  <div className="text-center text-gray-700">{dept.rideCount}</div>
                  <div className="text-right text-gray-900">{formatCurrency(dept.totalCost, "₹")}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CostBreakdown;
