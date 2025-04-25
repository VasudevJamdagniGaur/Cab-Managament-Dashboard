import { Link } from "wouter";
import { calculateTimeAgo } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import StarRating from "./StarRating";

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
}

interface EmployeeFeedbackProps {
  reviews: ReviewData[];
}

export function EmployeeFeedback({ reviews }: EmployeeFeedbackProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Employee Feedback</h2>
        <Link href="/reviews">
          <a className="text-primary hover:text-primary-700 text-sm font-medium flex items-center">
            <span>View All</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </Link>
      </div>
      <div className="p-5 space-y-5">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img 
                  className="h-10 w-10 rounded-full" 
                  src={review.user.profileImage} 
                  alt={review.user.fullName} 
                />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{review.user.fullName}</h3>
                  <p className="text-sm text-gray-500">{calculateTimeAgo(review.createdAt)}</p>
                </div>
                <div className="flex items-center mt-1">
                  <StarRating rating={review.rating} size="small" />
                  <span className="ml-2 text-sm text-gray-500">{review.rating.toFixed(1)}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeFeedback;
