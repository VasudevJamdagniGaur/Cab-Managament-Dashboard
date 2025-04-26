import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import { ChatAssistant } from "@/components/assistant/ChatAssistant";

// Pages
import Dashboard from "@/pages/Dashboard";
import TotalRidesStats from "@/pages/TotalRidesStats";
import EmployeeUsageStats from "@/pages/EmployeeUsageStats";
import AddEmployee from "@/pages/AddEmployee";
import LiveTripTracking from "@/pages/LiveTripTracking";
import CostBilling from "@/pages/CostBilling";
import UserReviews from "@/pages/UserReviews";
import CarpooledRides from "@/pages/CarpooledRides";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/rides" component={TotalRidesStats} />
      <Route path="/employees" component={EmployeeUsageStats} />
      <Route path="/add-employee" component={AddEmployee} />
      <Route path="/live-tracking" component={LiveTripTracking} />
      <Route path="/billing" component={CostBilling} />
      <Route path="/reviews" component={UserReviews} />
      <Route path="/carpooling" component={CarpooledRides} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ChatAssistant />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
