import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import React from "react";
import CarouselReview from "./carousel-review";
import SearchInfoActivity from "@/components/organisms/search-with-info";
import { reviews } from "@/common/constants/mock";
import Review from "./review";

export default function ThirdSection() {
  return (
    <section className="md:mb-20">
      <div className="md:hidden">
        <SearchInfoActivity />
      </div>
      <div className="md:hidden">
       <Review />
      </div>
    </section>
  );
}
