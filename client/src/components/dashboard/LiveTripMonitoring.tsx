import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

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

interface LiveTrip {
  id: number;
  driver: DriverData;
  user: UserData;
  cab: CabData;
  currentLocation: string;
  eta: string;
  status: string;
}

interface LiveTripMonitoringProps {
  trip: LiveTrip;
}

export function LiveTripMonitoring({ trip }: LiveTripMonitoringProps) {
  // Map configurations
  const [mapReady, setMapReady] = useState(false);
  
  // Default Delhi coordinates (would be replaced with real coordinates from the trip data)
  const tripLocation: LatLngExpression = [28.6139, 77.2090];
  
  // Marker icon
  const vehicleIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: trip.status === "On Trip" ? 'moving-marker' : 'idle-marker'
  });
  
  // Initialize the map
  useEffect(() => {
    // Set a small delay to ensure the DOM is fully loaded
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Live Trip Monitoring</h2>
        <Link href="/live-tracking" className="text-primary hover:text-primary-700 text-sm font-medium flex items-center">
          <span>View Map</span>
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="p-5">
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          {mapReady && (
            <MapContainer 
              center={tripLocation} 
              zoom={14} 
              style={{ height: '100%', width: '100%' }} 
              scrollWheelZoom={false}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={tripLocation} icon={vehicleIcon}>
                <Popup>
                  <div className="p-1">
                    <div className="font-semibold">{trip.cab.number}</div>
                    <div>Driver: {trip.driver.name}</div>
                    <div>Status: <span className={cn(
                      "font-medium",
                      trip.status === "On Trip" ? "text-green-600" : "text-yellow-600"
                    )}>{trip.status}</span></div>
                    <div>ETA: {trip.eta}</div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          )}
          <div className="absolute top-2 right-2 z-[1000]">
            <button className="bg-white bg-opacity-90 rounded-full p-2 shadow-md hover:bg-opacity-100 transition">
              <Maximize className="h-5 w-5 text-primary-700" />
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                <img 
                  src={trip.driver.profileImage} 
                  alt={trip.driver.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500">Driver</p>
                <h3 className="text-sm font-medium text-gray-900">{trip.driver.name}</h3>
                <div className="flex items-center mt-1">
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    trip.status === "On Trip" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  )}>
                    {trip.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Cab Details</p>
            <h3 className="text-sm font-medium text-gray-900">{trip.cab.number}</h3>
            <p className="text-xs text-gray-500 mt-1">{trip.cab.model} - {trip.cab.color}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-primary-600" />
                <span className="text-xs ml-1 text-gray-500">{trip.currentLocation}</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                ETA: {trip.eta}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveTripMonitoring;
