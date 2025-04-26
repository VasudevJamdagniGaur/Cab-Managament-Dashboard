import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Maximize, RefreshCw } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L, { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons issue in React by explicitly setting the paths
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Delhi coordinates
const DELHI_POSITION: LatLngExpression = [28.6139, 77.2090];

// Define vehicle markers with different statuses
const vehicleMarkers = [
  { 
    id: 1, 
    position: [28.6329, 77.2195] as LatLngExpression, 
    status: "moving", 
    driver: "Raj Kumar", 
    vehicle: "DL-01-AB-1234", 
    passengers: 2 
  },
  { 
    id: 2, 
    position: [28.5621, 77.2841] as LatLngExpression, 
    status: "idle", 
    driver: "Amit Singh", 
    vehicle: "DL-02-CD-5678", 
    passengers: 3 
  },
  { 
    id: 3, 
    position: [28.7041, 77.1025] as LatLngExpression, 
    status: "delayed", 
    driver: "Priya Sharma", 
    vehicle: "DL-03-EF-9012", 
    passengers: 1 
  },
];

export function LiveMap() {
  const [isLoading, setIsLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Set the map as ready once component is mounted
  useEffect(() => {
    // Set a small delay to ensure the DOM is fully loaded
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, this would fetch the latest map data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Custom marker icons with different CSS classes for coloring
  const movingIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'moving-marker'
  });

  const idleIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'idle-marker'
  });

  const delayedIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'delayed-marker'
  });

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case "moving": return movingIcon;
      case "idle": return idleIcon;
      case "delayed": return delayedIcon;
      default: return markerIcon;
    }
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "moving": return "green";
      case "idle": return "blue";
      case "delayed": return "orange";
      default: return "gray";
    }
  };

  return (
    <Card className="shadow-sm mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Live Map</CardTitle>
        <button 
          onClick={handleRefresh} 
          className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          disabled={isLoading}
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          {mapReady && (
            <MapContainer 
              center={DELHI_POSITION} 
              zoom={12} 
              style={{ height: '100%', width: '100%' }} 
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {vehicleMarkers.map(marker => (
                <div key={marker.id}>
                  <Marker 
                    position={marker.position} 
                    icon={getMarkerIcon(marker.status)}
                  >
                    <Popup>
                      <div className="p-1">
                        <div className="font-semibold">{marker.vehicle}</div>
                        <div>Driver: {marker.driver}</div>
                        <div>Status: <span className={`font-medium text-${getMarkerColor(marker.status)}-600`}>{marker.status}</span></div>
                        <div>Passengers: {marker.passengers}</div>
                      </div>
                    </Popup>
                  </Marker>
                  <Circle 
                    center={marker.position} 
                    radius={300} 
                    pathOptions={{ 
                      color: getMarkerColor(marker.status), 
                      fillColor: getMarkerColor(marker.status),
                      fillOpacity: 0.1, 
                      weight: 1 
                    }} 
                  />
                </div>
              ))}
            </MapContainer>
          )}
          
          <div className="absolute bottom-4 left-4 z-[1000] flex space-x-2">
            <div className="flex items-center text-xs bg-white bg-opacity-90 px-2 py-1 rounded shadow-sm">
              <div className="bg-green-500 h-2 w-2 rounded-full mr-1"></div>
              <span>Moving</span>
            </div>
            <div className="flex items-center text-xs bg-white bg-opacity-90 px-2 py-1 rounded shadow-sm">
              <div className="bg-blue-500 h-2 w-2 rounded-full mr-1"></div>
              <span>Idle</span>
            </div>
            <div className="flex items-center text-xs bg-white bg-opacity-90 px-2 py-1 rounded shadow-sm">
              <div className="bg-yellow-500 h-2 w-2 rounded-full mr-1"></div>
              <span>Delayed</span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 z-[1000]">
            <button className="bg-white bg-opacity-90 rounded-full p-2 shadow-md hover:bg-opacity-100 transition">
              <Maximize className="h-5 w-5 text-primary-700" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LiveMap;
