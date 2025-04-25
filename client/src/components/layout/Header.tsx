import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { branchOptions } from "@/lib/dummyData";

interface HeaderProps {
  title: string;
  onMobileMenuClick: () => void;
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
}

export function Header({ title, onMobileMenuClick, selectedBranch, onBranchChange }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Mobile menu button and title */}
          <div className="flex items-center">
            <button 
              onClick={onMobileMenuClick}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-3 text-lg font-semibold text-gray-900">{title}</h1>
          </div>
          
          {/* Middle section: Branch selector */}
          <div className="hidden md:flex items-center">
            <Select value={selectedBranch} onValueChange={onBranchChange}>
              <SelectTrigger className="w-[180px] bg-gray-50 border border-gray-300 text-gray-700">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Right section: Search and profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-3 py-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
            </div>
            
            <div className="ml-3 relative">
              <div>
                <button type="button" className="flex items-center max-w-xs rounded-full focus:outline-none">
                  <img 
                    className="h-8 w-8 rounded-full object-cover" 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                    alt="Admin profile" 
                  />
                  <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">Rahul Sharma</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Branch Selector - Only visible on mobile */}
        <div className="md:hidden pb-3">
          <Select value={selectedBranch} onValueChange={onBranchChange}>
            <SelectTrigger className="w-full bg-gray-50 border border-gray-300 text-gray-700">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branchOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}

export default Header;
