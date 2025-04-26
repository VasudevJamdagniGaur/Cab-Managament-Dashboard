import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: number;
  fullName: string;
  profileImage: string;
}

interface RideData {
  endLocation: string;
}

interface CarpoolSuggestion {
  id: number;
  title: string;
  savingsAmount: number;
  user1: UserData;
  user2: UserData;
  ride1: RideData;
  ride2: RideData;
  status: string;
}

interface CarpoolingSuggestionsProps {
  suggestions: CarpoolSuggestion[];
  onSuggestionUpdate?: () => void;
}

export function CarpoolingSuggestions({ suggestions, onSuggestionUpdate }: CarpoolingSuggestionsProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSuggestCarpool = async (id: number) => {
    try {
      setLoadingId(id);
      await apiRequest("PATCH", `/api/carpool-suggestions/${id}/status`, {
        status: "suggested"
      });
      toast({
        title: "Success",
        description: "Carpool suggestion sent to employees",
      });
      if (onSuggestionUpdate) {
        onSuggestionUpdate();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suggest carpool",
        variant: "destructive",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleIgnoreSuggestion = async (id: number) => {
    try {
      setLoadingId(id);
      await apiRequest("PATCH", `/api/carpool-suggestions/${id}/status`, {
        status: "ignored"
      });
      toast({
        title: "Success",
        description: "Carpool suggestion ignored",
      });
      if (onSuggestionUpdate) {
        onSuggestionUpdate();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to ignore carpool suggestion",
        variant: "destructive",
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900">Carpooling Suggestions</h2>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">New</span>
        </div>
        <Link href="/carpooling" className="text-primary hover:text-primary-700 text-sm font-medium flex items-center">
          <span>Manage</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No carpooling suggestions available.</p>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                className={cn(
                  "rounded-lg p-4",
                  suggestion.id % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">{suggestion.title}</h3>
                  <span className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    suggestion.id % 2 === 0 ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  )}>
                    Saves {formatCurrency(suggestion.savingsAmount)}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full overflow-hidden">
                      <img 
                        src={suggestion.user1.profileImage} 
                        alt={suggestion.user1.fullName} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <span className="ml-2 font-medium text-gray-900">{suggestion.user1.fullName}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-gray-700">{suggestion.ride1.endLocation}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full overflow-hidden">
                      <img 
                        src={suggestion.user2.profileImage} 
                        alt={suggestion.user2.fullName} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <span className="ml-2 font-medium text-gray-900">{suggestion.user2.fullName}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-gray-700">{suggestion.ride2.endLocation}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button 
                    className="px-3 py-1 text-xs font-medium rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    onClick={() => handleIgnoreSuggestion(suggestion.id)}
                    disabled={loadingId === suggestion.id}
                  >
                    Ignore
                  </button>
                  <button 
                    className="px-3 py-1 text-xs font-medium rounded bg-primary text-white hover:bg-primary-700 disabled:opacity-50"
                    onClick={() => handleSuggestCarpool(suggestion.id)}
                    disabled={loadingId === suggestion.id}
                  >
                    Suggest Carpool
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CarpoolingSuggestions;
