import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import ReviewsOverview from "@/components/reviews/ReviewsOverview";
import ReviewsList from "@/components/reviews/ReviewsList";
import { useQuery } from "@tanstack/react-query";

// Import dummy data (would be replaced with API calls in a real app)
import { reviewsData } from "@/lib/dummyData";

export default function UserReviews() {
  // In a real app, we'd fetch this data from the API and use mutation to update reviews
  /*
  const { data: reviews, isLoading: isLoadingReviews, refetch } = useQuery({
    queryKey: ['/api/reviews'],
  });
  
  const handleReviewUpdate = () => {
    refetch();
  };
  */
  
  // For demonstration, we're using dummy data
  const reviews = reviewsData;
  
  const handleReviewUpdate = () => {
    // This would refetch data in a real app
    console.log("Updating reviews...");
  };

  return (
    <DashboardLayout title="User Reviews">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Reviews</h1>
      </div>
      
      <ReviewsOverview 
        averageRating={reviews.averageRating}
        totalReviews={reviews.totalReviews}
        distributionData={reviews.distributionData}
      />
      
      <ReviewsList 
        reviews={reviews.reviews}
        onReviewUpdate={handleReviewUpdate}
      />
    </DashboardLayout>
  );
}
