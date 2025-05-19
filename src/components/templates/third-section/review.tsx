import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import React from "react";
import CarouselReview from "./carousel-review";
import { reviews } from "@/common/constants/mock";
import { realReviews } from "@/common/constants/constants";

export default function Review() {
  return (
    <section className="">
      <MyTypography
        variant="heading2"
        weight="bold"
        className="text-center max-sm:mt-20"
      >
        B2 Adventure
      </MyTypography>
      <MyTypography
        variant="subtitle3"
        weight="regular"
        lightness={400}
        className="text-center"
      >
        O que estão falando da gente
      </MyTypography>
      <div className="flex gap-2 items-center justify-center my-2">
        <StarRating rating={5} />
        <MyTypography variant="body" weight="semibold">
          5
        </MyTypography>
        <MyTypography variant="body" weight="regular">
          (250 reviews)
        </MyTypography>
      </div>
      <CarouselReview reviews={realReviews} />
    </section>
  );
}
