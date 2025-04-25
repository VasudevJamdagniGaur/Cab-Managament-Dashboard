import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { calculateTimeAgo } from "@/lib/utils";
import StarRating from "@/components/dashboard/StarRating";
import { Flag } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: number;
  fullName: string;
  profileImage: string;
}

interface ReviewData {
  id: number;
  user: UserData;
  rating: number;
  comment: string;
  createdAt: Date;
  branch: string;
  isFlagged: boolean;
}

interface ReviewsListProps {
  reviews: ReviewData[];
  onReviewUpdate?: () => void;
}

export function ReviewsList({ reviews: initialReviews, onReviewUpdate }: ReviewsListProps) {
  const [selectedTab, setSelectedTab] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { toast } = useToast();

  // Filter reviews based on selected tab and branch
  const filteredReviews = initialReviews.filter(review => {
    if (selectedTab !== "all" && Number(selectedTab) !== review.rating) {
      return false;
    }
    
    if (branchFilter !== "all" && review.branch !== branchFilter) {
      return false;
    }
    
    return true;
  });

  const handleFlagReview = async (id: number) => {
    try {
      setLoadingId(id);
      await apiRequest("PATCH", `/api/reviews/${id}/flag`, {});
      toast({
        title: "Review flagged",
        description: "The review has been flagged for review.",
      });
      if (onReviewUpdate) {
        onReviewUpdate();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to flag review",
        variant: "destructive",
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>User Reviews</CardTitle>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="5">5★</TabsTrigger>
                <TabsTrigger value="4">4★</TabsTrigger>
                <TabsTrigger value="3">3★</TabsTrigger>
                <TabsTrigger value="2">2★</TabsTrigger>
                <TabsTrigger value="1">1★</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No reviews found matching your criteria</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className={`border-b pb-6 last:border-0 last:pb-0 ${review.isFlagged ? 'bg-red-50 p-4 rounded-lg' : ''}`}>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={review.user.profileImage} 
                        alt={review.user.fullName} 
                      />
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">{review.user.fullName}</h3>
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                          {review.branch}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center">
                        <StarRating rating={review.rating} size="small" />
                        <span className="ml-2 text-sm text-gray-500">
                          {calculateTimeAgo(review.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                  
                  {!review.isFlagged && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleFlagReview(review.id)}
                      disabled={loadingId === review.id}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {review.isFlagged && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 self-start">
                      Flagged
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ReviewsList;
