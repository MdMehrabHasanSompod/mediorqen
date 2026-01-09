import { Star } from "lucide-react";

const StarRating = ({ rating }:{rating:number}) => {
  return (
    <div className="flex gap-1 mx-auto my-1 md:my-2">
      {[1,2,3,4,5].map((star) => (
        <Star
          key={star}
          size={18}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

export default StarRating