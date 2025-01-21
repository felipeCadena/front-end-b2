"use client";

import MyBadge from "@/components/atoms/my-badge";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselCustom({ activity, images }: any) {

  return (
    <div className="flex flex-col min-w-[60vw] lg:min-w-0">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        width="100%"
        emulateTouch
        infiniteLoop
      >
        {images?.map((image: any, index: number) => (
        <div key={index} className="relative z-10 overflow-hidden h-[225px] w-full hover:cursor-pointer rounded-md">
          <Image
            alt="sample_file"
            src={image ?? ""}
            width={250}
            height={300}
            className="w-full h-[225px] object-cover"
          />
        </div>
        ))}
      </Carousel>
      <span className="mt-2"><MyBadge variant="outline">{activity.tag}</MyBadge></span>
      <StarRating rating={activity.stars}/>
      <MyTypography variant="subtitle1" weight="bold" className="">{activity.title}</MyTypography>
      <MyTypography variant="body-big" className="">{activity.description.slice(0, 25).concat("...")}</MyTypography>
    </div>
  );
}
