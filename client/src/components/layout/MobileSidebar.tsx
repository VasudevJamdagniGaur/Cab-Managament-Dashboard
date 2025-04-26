import { useState, useEffect } from "react";
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
  X,
} from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [location] = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add event listener to handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!mounted) {
    return null;
  }

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
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-primary text-white rounded-lg p-2 mr-3">
              <Truck className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Norimono</h1>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-4 px-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={onClose}
              >
                <a className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  location === item.href 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-gray-700 hover:bg-gray-50"
                )}>
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </a>
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
                onClick={onClose}
              >
                <a className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default MobileSidebar;
