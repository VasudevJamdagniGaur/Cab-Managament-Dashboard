import { useState } from "react";
import { formatDate, formatTime, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface UserData {
  id: number;
  fullName: string;
  department: string;
  profileImage: string;
}

interface CabData {
  id: number;
  number: string;
  model: string;
  color: string;
}

interface RideData {
  id: number;
  startTime: Date;
  user: UserData;
  startLocation: string;
  endLocation: string;
  cab: CabData;
  status: string;
}

interface RidesTableProps {
  rides: RideData[];
}

export function RidesTable({ rides: initialRides }: RidesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("today");
  const [timeSlot, setTimeSlot] = useState("all");
  const [branch, setBranch] = useState("all");
  
  // Filter rides based on search term, tab, time slot, and branch
  const filteredRides = initialRides.filter(ride => {
    const matchesSearch = !searchTerm || 
      ride.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ride.cab.number.toLowerCase().includes(searchTerm.toLowerCase());
    
    // In a real app, we would apply more filters based on selected tab, time slot, branch
    return matchesSearch;
  });

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in process":
      case "on trip":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Ride Records</CardTitle>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="text" 
              placeholder="Search by employee or cab" 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Tabs defaultValue="today" className="w-full sm:w-auto" onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Time Slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time Slots</SelectItem>
                  <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM-6PM)</SelectItem>
                  <SelectItem value="evening">Evening (6PM-12AM)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Branch" />
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
          
          <div className="overflow-x-auto bg-white rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cab No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRides.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No rides found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredRides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(ride.startTime)}</div>
                        <div className="text-sm text-gray-500">{formatTime(ride.startTime)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                            <img src={ride.user.profileImage} alt={ride.user.fullName} className="h-full w-full object-cover" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{ride.user.fullName}</div>
                            <div className="text-sm text-gray-500">{ride.user.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ride.startLocation}</div>
                        <div className="text-sm text-gray-500">{ride.endLocation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ride.cab.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                          getStatusClass(ride.status)
                        )}>
                          {ride.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center">
            <button className="text-primary hover:text-primary-700 text-sm font-medium flex items-center">
              Load More
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RidesTable;
