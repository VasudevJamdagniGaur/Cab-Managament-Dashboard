import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function StarRating({ rating, size = "medium", className }: StarRatingProps) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const sizeClasses = {
    small: "h-3 w-3",
    medium: "h-4 w-4",
    large: "h-5 w-5"
  };
  
  const starSize = sizeClasses[size];

  return (
    <div className={cn("flex text-yellow-400", className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className={starSize} fill="currentColor" />
      ))}
      
      {hasHalfStar && (
        <StarHalf key="half" className={starSize} fill="currentColor" />
      )}
      
      {Array.from({ length: totalStars - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star key={`empty-${i}`} className={cn(starSize, "text-gray-300")} />
      ))}
    </div>
  );
}

export default StarRating;
