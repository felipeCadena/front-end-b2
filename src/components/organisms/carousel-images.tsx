"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type CarouselImagesProps = {
  images: string[];
  rounded?: boolean;
};

export default function CarouselImages({ images, rounded = false }: CarouselImagesProps) {
  return (
    <div className={cn("flex flex-col w-full lg:min-w-0 md:rounded-xl overflow-hidden", rounded && "rounded-lg")}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        width="105%"
        emulateTouch
        infiniteLoop
        centerMode
        centerSlidePercentage={100}
        renderIndicator={(onClickHandler, isSelected, index) => {
          return (
            <li
              style={{
                display: "inline-block",
                margin: "10px 8px",
                cursor: "pointer",
                backgroundColor: isSelected ? "#333" : "#ccc",
                borderRadius: "50%",
                width: 8,
                height: 8,
              }}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              role="button"
              tabIndex={0}
              aria-label={`Slide ${index + 1}`}
            />
          );
        }}
      >
        {images.map((image: any, index: number) => (
        <div key={index} className={cn("relative z-10 overflow-hidden w-full h-[350px] md:min-h-[400px]")}>
          <Image
            alt="Imagens de atividades"
            src={image ?? ""}
            width={250}
            height={300}
            className={cn("w-full object-cover h-[350px] md:min-h-[400px]")}
          />
        </div>
        ))}
      </Carousel>
    </div>
  );
}
