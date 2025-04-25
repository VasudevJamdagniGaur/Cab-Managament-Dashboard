import { Car, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RidesStats {
  totalRides: number;
  completedRides: number;
  ongoingRides: number;
  cancelledRides: number;
}

interface RidesSummaryProps {
  stats: RidesStats;
}

export function RidesSummary({ stats }: RidesSummaryProps) {
  const summaryItems = [
    {
      label: "Total Rides",
      value: stats.totalRides,
      icon: Car,
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      label: "Completed Rides",
      value: stats.completedRides,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      label: "Ongoing Rides",
      value: stats.ongoingRides,
      icon: Clock,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      label: "Cancelled Rides",
      value: stats.cancelledRides,
      icon: XCircle,
      bgColor: "bg-red-100",
      textColor: "text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`rounded-full p-3 ${item.bgColor}`}>
                <item.icon className={`h-6 w-6 ${item.textColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{item.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default RidesSummary;
