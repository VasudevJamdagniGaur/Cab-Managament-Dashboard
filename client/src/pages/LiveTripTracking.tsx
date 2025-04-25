import { DashboardLayout } from "@/components/layout/DashboardLayout";
import LiveMap from "@/components/live-tracking/LiveMap";
import ActiveTripsList from "@/components/live-tracking/ActiveTripsList";
import { useQuery } from "@tanstack/react-query";

// Import dummy data (would be replaced with API calls in a real app)
import { activeTrips } from "@/lib/dummyData";

export default function LiveTripTracking() {
  // In a real app, we'd fetch this data from the API
  /*
  const { data: trips, isLoading: isLoadingTrips } = useQuery({
    queryKey: ['/api/rides', { status: 'on_trip' }],
    refetchInterval: 30000, // Refresh every 30 seconds
  });
  */
  
  // For demonstration, we're using dummy data
  const trips = activeTrips;

  return (
    <DashboardLayout title="Live Trip Monitoring">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Live Trip Monitoring</h1>
      </div>
      
      <LiveMap />
      <ActiveTripsList trips={trips} />
    </DashboardLayout>
  );
}
