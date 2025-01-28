"use client";

import { cn } from "@/utils/cn";
import MyIcon from "../atoms/my-icon";

const StarRating = ({ rating, bigStars }: { rating: number, bigStars?: boolean }) => {
  const maxRating = 5;
  const stars = Array.from({ length: maxRating }, (_, index) => index + 1); // [1, 2, 3, 4, 5]

  return (
    <div className={cn("flex items-center my-2", bigStars ? "gap-2" : "w-[6.5rem]")}>
      {stars.map((star, index) => (
         bigStars 
         ? <MyIcon key={star} name={star <= rating ? "big-star" : "big-star-empty"} />
         : <MyIcon key={star} name={star <= rating ? "star" : "emptyStar"} className="flex-1" />
      ))}
    </div>
  );
};

export default StarRating;
