"use client";

import MyIcon from "../atoms/my-icon";

const StarRating = ({ rating }: { rating: number }) => {
  const maxRating = 5;
  const stars = Array.from({ length: maxRating }, (_, index) => index + 1); // [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center gap-1 my-2">
      {stars.map((star, index) => (
         <MyIcon key={star} name={star <= rating ? "star" : "emptyStar"} />
      ))}
    </div>
  );
};

export default StarRating;
