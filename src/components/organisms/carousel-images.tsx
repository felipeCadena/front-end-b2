"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselImages({ images }: any) {
  return (
    <div className="flex flex-col w-full lg:min-w-0 rounded-md">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        width="100%"
        emulateTouch
        infiniteLoop
      >
        {images.map((image: any, index: number) => (
        <div key={index} className="relative z-10 overflow-hidden h-[400px] w-full hover:cursor-pointer rounded-md">
          <Image
            alt="sample_file"
            src={image ?? ""}
            width={250}
            height={300}
            className="w-full h-[400px] object-cover"
          />
        </div>
        ))}
      </Carousel>
    </div>
  );
}
