import { Link } from "wouter";
import { formatDate, formatTime, cn, formatCurrency } from "@/lib/utils";
import { ChevronRight, Users } from "lucide-react";

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

interface CarpooledRide {
  id: number;
  startTime: Date;
  users: UserData[];
  startLocation: string;
  endLocation: string;
  cab: CabData;
  status: string;
  savingsAmount: number;
}

interface CarpooledRidesTableProps {
  rides: CarpooledRide[];
}

export function CarpooledRidesTable({ rides }: CarpooledRidesTableProps) {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in process":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900">Carpooled Rides</h2>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Eco-friendly</span>
        </div>
        <Link href="/carpooling" className="text-primary hover:text-primary-700 text-sm font-medium flex items-center">
          <span>View All</span>
          <ChevronRight className="ml-1 h-4 w-4" />
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
                Carpooled Employees
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Savings
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
                    <div className="flex -space-x-2 mr-2">
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
                    <div className="ml-1">
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <Users className="h-4 w-4 mr-1 text-primary" />
                        <span>{ride.users.length} Employees</span>
                      </div>
                      <div className="text-xs text-gray-500">{ride.users.map(u => u.department).join(', ')}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ride.startLocation}</div>
                  <div className="text-sm text-gray-500">{ride.endLocation}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">
                    {formatCurrency(ride.savingsAmount)}
                  </div>
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

export default CarpooledRidesTable;