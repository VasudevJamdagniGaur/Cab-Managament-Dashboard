import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string | number;
    label: string;
    positive?: boolean;
  };
  onClick?: () => void;
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  trend,
  onClick,
}: SummaryCardProps) {
  return (
    <div 
      className="dashboard-card bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-full p-3", iconBgColor)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
            {trend && (
              <div className="flex items-center mt-1">
                <span className={cn(
                  "text-sm flex items-center",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.positive ? (
                    <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  <span>{trend.value}</span>
                </span>
                <span className="text-xs text-gray-500 ml-2">{trend.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
