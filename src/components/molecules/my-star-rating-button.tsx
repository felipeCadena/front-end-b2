import React, { Dispatch, SetStateAction } from 'react';
import Star from '../atoms/my-icon/elements/star';
import BigStar from '../atoms/my-icon/elements/big-star';

type MyStarRatingButtonProps = {
  setUserRating: Dispatch<SetStateAction<number>>;
  userRating: number;
  isMobile: boolean;
};

const MyStarRatingButton = ({
  userRating,
  setUserRating,
  isMobile,
}: MyStarRatingButtonProps) => {
  return (
    <>
      {[...Array(5)].map((_star, index) => {
        const currentRate = index + 1;
        const starColor =
          currentRate <= userRating && userRating <= 2
            ? '#ff5f6f'
            : currentRate <= userRating && userRating >= 3
              ? '#8DC63F'
              : '#c7c6cf';
        return (
          <label key={index} className="cursor-pointer">
            <input
              aria-label="starRatingBtn"
              type="radio"
              name="rate"
              style={{ display: 'none' }}
              value={currentRate}
              onClick={() => setUserRating(currentRate)}
            />
            {isMobile ? (
              <Star fill={starColor} stroke={starColor} />
            ) : (
              <BigStar fill={starColor} />
            )}
          </label>
        );
      })}
    </>
  );
};

export default MyStarRatingButton;
