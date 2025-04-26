import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { Search, Car, IndianRupee, Star, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Import dummy data (would be replaced with API calls in a real app)
import { carpooledRides } from "@/lib/dummyData";

// Define the type for expanded ride IDs
type ExpandedRidesMap = {
  [key: number]: boolean;
};

export default function CarpooledRides() {
  const [period, setPeriod] = useState("today");
  const [branch, setBranch] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRides, setExpandedRides] = useState<ExpandedRidesMap>({});
  
  // In a real app, we'd fetch this data from the API
  /*
  const { data: rides, isLoading: isLoadingRides } = useQuery({
    queryKey: ['/api/carpooled-rides', { period, branch, query: searchQuery }],
  });
  */
  
  // For demonstration, we're using dummy data
  const allRides = carpooledRides;
  
  // Apply time period filter
  const filterRidesByPeriod = (rides: typeof carpooledRides) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return rides.filter(ride => {
      const rideDate = new Date(ride.startTime);
      
      if (period === "today") {
        // Today: same year, month, and day
        return rideDate.getFullYear() === today.getFullYear() && 
               rideDate.getMonth() === today.getMonth() && 
               rideDate.getDate() === today.getDate();
      } else if (period === "week") {
        // This week: within the last 7 days
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return rideDate >= weekAgo;
      } else if (period === "month") {
        // This month: same year and month
        return rideDate.getFullYear() === today.getFullYear() && 
               rideDate.getMonth() === today.getMonth();
      }
      
      // Default: return all rides
      return true;
    });
  };
  
  // Apply branch filter
  const filterRidesByBranch = (rides: typeof carpooledRides) => {
    if (branch === "all") return rides;
    
    // For this example, we'll use the endLocation to filter by branch/city
    // In a real app, this would be based on branch IDs or more precise data
    return rides.filter(ride => {
      if (branch === "Delhi") {
        return ride.endLocation.includes("Gurugram") || 
               ride.endLocation.includes("Delhi") || 
               ride.endLocation.includes("Noida") || 
               ride.endLocation.includes("Ghaziabad");
      } else if (branch === "Mumbai") {
        return ride.endLocation.includes("Mumbai") || 
               ride.endLocation.includes("Powai") || 
               ride.endLocation.includes("Bandra");
      } else if (branch === "Bangalore") {
        return ride.endLocation.includes("Bangalore") || 
               ride.endLocation.includes("Electronic City") || 
               ride.endLocation.includes("Whitefield");
      } else if (branch === "Hyderabad") {
        return ride.endLocation.includes("Hyderabad");
      }
      return true;
    });
  };
  
  // Apply both filters
  const periodFilteredRides = filterRidesByPeriod(allRides);
  const branchFilteredRides = filterRidesByBranch(periodFilteredRides);
  
  // Filter rides based on search query
  const filteredRides = branchFilteredRides.filter(ride => {
    if (!searchQuery) return true;
    
    const employeeNames = ride.users.map(user => user.fullName.toLowerCase()).join(" ");
    return employeeNames.includes(searchQuery.toLowerCase());
  });
  
  // Calculate summary statistics
  const totalPooledRides = filteredRides.length;
  const totalSavings = filteredRides.reduce((sum, ride) => sum + ride.savingsAmount, 0);
  const avgRating = 4.3; // This would be calculated from actual ratings in a real app
  
  // Toggle ride details expansion
  const toggleRideExpansion = (rideId: number) => {
    setExpandedRides(prev => ({
      ...prev,
      [rideId]: !prev[rideId]
    }));
  };

  // Render ride status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Completed": "bg-green-100 text-green-800",
      "Confirmed": "bg-blue-100 text-blue-800",
      "In Process": "bg-yellow-100 text-yellow-800",
      "Pending": "bg-gray-100 text-gray-800",
      "Cancelled": "bg-red-100 text-red-800"
    };
    
    const defaultClass = "bg-gray-100 text-gray-800";
    const statusClass = statusClasses[status as keyof typeof statusClasses] || defaultClass;
    
    return (
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        statusClass
      )}>
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout title="Carpooled Rides">
      <div className="mb-6 flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Carpooled Rides</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs defaultValue={period} onValueChange={setPeriod} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-full sm:w-[180px]">
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
        
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by employee name..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mr-4">
              <Car className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pooled Rides</p>
              <p className="text-2xl font-bold">{totalPooledRides}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mr-4">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cost Saved</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSavings)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center mr-4">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold">{avgRating.toFixed(1)} <span className="text-yellow-500">★</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Pooled Rides List */}
      <div className="space-y-4">
        {filteredRides.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500">No carpooled rides found matching your criteria.</p>
          </div>
        ) : (
          filteredRides.map((ride) => (
            <Card key={ride.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Ride Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-3">
                      {ride.users.map((user, index) => (
                        <div key={user.id} className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 border-2 border-white">
                          <img 
                            src={user.profileImage} 
                            alt={user.fullName} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Scheduled: {formatTime(ride.startTime)}</p>
                      <p className="text-xs text-gray-500">{formatDate(ride.startTime)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(ride.status)}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleRideExpansion(ride.id)}
                      className="p-1 h-auto"
                    >
                      {expandedRides[ride.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Ride Basic Info */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-sm">
                      <span className="font-medium">{ride.startLocation}</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">{ride.endLocation}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <p className="text-sm">
                      <span className="text-gray-500">Driver:</span>
                      <span className="ml-1 font-medium">Anand Kumar</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Cab:</span>
                      <span className="ml-1 font-medium">{ride.cab.number}</span>
                      <span className="ml-1 text-gray-500">({ride.cab.model})</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <span className="text-gray-500 mr-1">Rating:</span>
                      <span className="text-yellow-500">★★★★</span>
                      <span className="text-gray-300">★</span>
                      <span className="ml-1">(4.0)</span>
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      Savings: {formatCurrency(ride.savingsAmount)}
                    </p>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {expandedRides[ride.id] && (
                  <div className="p-4 bg-gray-50">
                    {/* Map Placeholder */}
                    <div className="bg-gray-200 rounded-lg h-36 mb-4 flex items-center justify-center">
                      <p className="text-gray-500">Interactive Map would appear here</p>
                    </div>
                    
                    {/* Passenger List */}
                    <h4 className="text-sm font-semibold mb-2">Passengers</h4>
                    <div className="space-y-2 mb-4">
                      {ride.users.map(user => (
                        <div key={user.id} className="flex items-center">
                          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 mr-2">
                            <img 
                              src={user.profileImage} 
                              alt={user.fullName} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.fullName}</p>
                            <p className="text-xs text-gray-500">{user.department}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Reviews Placeholder */}
                    <h4 className="text-sm font-semibold mb-2">Reviews</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded-lg">
                        <div className="flex items-center mb-1">
                          <span className="text-yellow-500 text-sm">★★★★★</span>
                          <span className="ml-2 text-sm font-medium">Great carpooling experience!</span>
                        </div>
                        <p className="text-xs text-gray-500">Driver was on time and the co-passengers were friendly.</p>
                      </div>
                      
                      <div className="p-3 bg-white rounded-lg">
                        <div className="flex items-center mb-1">
                          <span className="text-yellow-500 text-sm">★★★★</span>
                          <span className="ml-2 text-sm font-medium">Good ride, slight delay</span>
                        </div>
                        <p className="text-xs text-gray-500">The ride was comfortable but we were delayed by traffic.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}