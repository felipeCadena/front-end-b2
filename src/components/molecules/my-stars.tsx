"use client";

import { cn } from "@/utils/cn";
import MyIcon from "../atoms/my-icon";
import Star from "../atoms/my-icon/elements/star";
import BigStar from "../atoms/my-icon/elements/big-star";

const StarRating = ({
  rating,
  bigStars,
}: {
  rating: number;
  bigStars?: boolean;
}) => {
  const maxRating = 5;
  const stars = Array.from({ length: maxRating }, (_, index) => index + 1); // [1, 2, 3, 4, 5]

  return (
    <div
      className={cn(
        "flex items-center my-2",
        bigStars ? "gap-2" : "w-[6.5rem]"
      )}
    >
      {stars.map((star) => {
        const isFilled = star <= rating;
        const fillColor =
          rating <= 2 ? "#ff5f6f" : rating >= 3 ? "#8DC63F" : "transparent";

        return bigStars ? (
          isFilled ? (
            <BigStar key={star} fill={fillColor} />
          ) : (
            <MyIcon key={star} name="big-star-empty" />
          )
        ) : isFilled ? (
          <Star key={star} fill={fillColor} stroke={fillColor} />
        ) : (
          <MyIcon key={star} name="emptyStar" className="flex-1" />
        );
      })}
    </div>
  );
};

export default StarRating;
