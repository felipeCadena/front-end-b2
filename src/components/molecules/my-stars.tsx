"use client";

import MyIcon from "../atoms/my-icon";

const StarRating = ({ rating }: { rating: number }) => {
  const maxRating = 5;
  const stars = Array.from({ length: maxRating }, (_, index) => index + 1); // [1, 2, 3, 4, 5]

  return (
    <div className="flex items-center my-2 w-[6.5rem]">
      {stars.map((star, index) => (
         <MyIcon key={star} name={star <= rating ? "star" : "emptyStar"} className="flex-1" />
      ))}
    </div>
  );
};

export default StarRating;
