import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StarRating from "@/components/dashboard/StarRating";

interface RatingDistribution {
  rating: number;
  count: number;
}

interface ReviewsOverviewProps {
  averageRating: number;
  totalReviews: number;
  distributionData: RatingDistribution[];
}

export function ReviewsOverview({ averageRating, totalReviews, distributionData }: ReviewsOverviewProps) {
  // Calculate the percentage for each rating
  const getPercentage = (count: number) => {
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <Card className="shadow-sm mb-6">
      <CardHeader>
        <CardTitle>Average Rating Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</h3>
            <div className="mt-2">
              <StarRating rating={averageRating} size="large" />
            </div>
            <p className="mt-2 text-sm text-gray-500">{totalReviews} total reviews</p>
          </div>
          
          <div className="space-y-4">
            {distributionData.sort((a, b) => b.rating - a.rating).map((item) => (
              <div key={item.rating} className="flex items-center space-x-2">
                <div className="w-6 text-sm text-gray-700">{item.rating}★</div>
                <Progress value={getPercentage(item.count)} className="h-2 flex-1" />
                <div className="w-10 text-sm text-right text-gray-500">{item.count}</div>
                <div className="w-10 text-xs text-right text-gray-400">{getPercentage(item.count)}%</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReviewsOverview;
