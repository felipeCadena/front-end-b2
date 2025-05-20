"use client";

import { AdventureImage } from "@/services/api/adventures";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type CarouselImagesProps = {
  images: AdventureImage[];
  rounded?: boolean;
};

export default function CarouselImages({
  images,
  rounded = false,
}: CarouselImagesProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full lg:min-w-0 md:rounded-xl overflow-hidden",
        rounded && "rounded-lg"
      )}
    >
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        width="100%"
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
        {images
          ?.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
          ?.map((image: any, index: number) => (
            <div
              key={index}
              className={cn(
                "relative z-10 overflow-hidden w-full md:min-h-[25rem]"
              )}
            >
              <Image
                alt="Imagens de atividades"
                src={`${image.url ?? "/images/atividades/ar/ar-1.jpeg"}?v=${Date.now()}`}
                width={250}
                height={300}
                className={cn(
                  "w-full object-cover h-[21.87rem] md:min-h-[25rem]"
                )}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
}
