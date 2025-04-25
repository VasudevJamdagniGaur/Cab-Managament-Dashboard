import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Dashboard from "@/pages/Dashboard";
import TotalRidesStats from "@/pages/TotalRidesStats";
import EmployeeUsageStats from "@/pages/EmployeeUsageStats";
import LiveTripTracking from "@/pages/LiveTripTracking";
import CostBilling from "@/pages/CostBilling";
import UserReviews from "@/pages/UserReviews";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/rides" component={TotalRidesStats} />
      <Route path="/employees" component={EmployeeUsageStats} />
      <Route path="/live-tracking" component={LiveTripTracking} />
      <Route path="/billing" component={CostBilling} />
      <Route path="/reviews" component={UserReviews} />
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
