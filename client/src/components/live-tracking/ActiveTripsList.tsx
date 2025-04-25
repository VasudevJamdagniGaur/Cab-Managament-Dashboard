import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DriverData {
  name: string;
  profileImage: string;
}

interface UserData {
  fullName: string;
}

interface CabData {
  number: string;
  model: string;
  color: string;
}

interface RouteData {
  start: string;
  destination: string;
}

interface TripData {
  id: number;
  driver: DriverData;
  user: UserData;
  cab: CabData;
  route: RouteData;
  eta: string;
  status: string;
}

interface ActiveTripsListProps {
  trips: TripData[];
}

export function ActiveTripsList({ trips }: ActiveTripsListProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Active Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trips.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No active trips found</p>
            </div>
          ) : (
            trips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      <img src={trip.driver.profileImage} alt={trip.driver.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{trip.driver.name}</h3>
                      <div className="text-xs text-gray-500">{trip.cab.number}</div>
                    </div>
                  </div>
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    trip.status === "On Trip" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  )}>
                    {trip.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="mb-2">
                    <div className="text-xs text-gray-500">Employee</div>
                    <div className="text-sm font-medium">{trip.user.fullName}</div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Route</div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">{trip.route.start}</span>
                        <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span>{trip.route.destination}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-700">{trip.cab.model} - {trip.cab.color}</div>
                  <div className="flex items-center text-blue-700">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>ETA: {trip.eta}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ActiveTripsList;
