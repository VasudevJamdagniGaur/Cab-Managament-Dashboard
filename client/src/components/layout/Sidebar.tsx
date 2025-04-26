import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Users,
  MapPin,
  DollarSign,
  MessageSquare,
  Settings,
  HelpCircle,
  UserPlus,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      label: "All Rides",
      icon: Truck,
      href: "/rides",
    },
    {
      label: "Employees",
      icon: Users,
      href: "/employees",
    },
    {
      label: "Add New Employee",
      icon: UserPlus,
      href: "/add-employee",
    },
    {
      label: "Real-Time Tracking",
      icon: MapPin,
      href: "/live-tracking",
    },
    {
      label: "Billing & Cost",
      icon: DollarSign,
      href: "/billing",
    },
    {
      label: "Reviews",
      icon: MessageSquare,
      href: "/reviews",
    },
  ];

  const secondaryNavItems: { label: string; icon: any; href: string }[] = [];

  return (
    <aside className={cn("hidden md:flex flex-col w-64 bg-white border-r border-gray-200 pt-5 pb-4 flex-shrink-0", className)}>
      <div className="px-6">
        <div className="flex items-center">
          <div className="bg-primary text-white rounded-lg p-2 mr-3">
            <Truck className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Norimono</h1>
        </div>
      </div>
      <div className="mt-6 flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                location === item.href 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          
          <div className="pt-4 pb-2">
            <div className="px-3">
              <div className="h-px bg-gray-200 my-2"></div>
            </div>
          </div>
          
          {secondaryNavItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
