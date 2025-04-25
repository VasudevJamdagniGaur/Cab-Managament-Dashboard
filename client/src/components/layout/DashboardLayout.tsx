import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("all");

  const handleMobileMenuClick = () => {
    setIsMobileSidebarOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={handleCloseMobileMenu} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={title}
          onMobileMenuClick={handleMobileMenuClick}
          selectedBranch={selectedBranch}
          onBranchChange={handleBranchChange}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
