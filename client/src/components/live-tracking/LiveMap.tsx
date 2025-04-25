import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Maximize, RefreshCw } from "lucide-react";

export function LiveMap() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, this would fetch the latest map data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
            alt="Map View" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          
          {/* Map markers would go here in a real implementation */}
          <div className="absolute top-20 left-1/4 transform -translate-x-1/2">
            <div className="bg-green-500 h-3 w-3 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2">
            <div className="bg-blue-500 h-3 w-3 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2">
            <div className="bg-yellow-500 h-3 w-3 rounded-full animate-pulse"></div>
          </div>
          
          <div className="absolute bottom-4 left-4 flex space-x-2">
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
          
          <div className="absolute top-4 right-4">
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
