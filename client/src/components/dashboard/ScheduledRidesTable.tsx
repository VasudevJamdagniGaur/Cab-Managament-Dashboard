import { Link } from "wouter";
import { formatDate, formatTime, cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

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

interface ScheduledRide {
  id: number;
  startTime: Date;
  user: UserData;
  startLocation: string;
  endLocation: string;
  cab: CabData;
  status: string;
}

interface ScheduledRidesTableProps {
  rides: ScheduledRide[];
}

export function ScheduledRidesTable({ rides }: ScheduledRidesTableProps) {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in process":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Scheduled Rides</h2>
        <Link href="/rides">
          <a className="text-primary hover:text-primary-700 text-sm font-medium flex items-center">
            <span>View All</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
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
            {rides.map((ride) => (
              <tr key={ride.id}>
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
        <button className="text-primary hover:text-primary-700 text-sm font-medium">
          Show more
        </button>
      </div>
    </div>
  );
}

export default ScheduledRidesTable;
