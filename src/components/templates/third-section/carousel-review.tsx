"use client";

import MyTypography from "@/components/atoms/my-typography";
import Image from "next/image";
import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { twMerge } from "tailwind-merge";

const CarouselReview = ({ reviews }: any) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    const scrollAmount = 300;
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setScrollPosition(ref.current.scrollLeft);
    }
  };

  const showLeftShadow = scrollPosition > 0;
  const showRightShadow =
    ref.current &&
    ref.current.scrollWidth > ref.current.clientWidth + scrollPosition;

    return (
      <div className="relative my-8">
        {/* Shadow effect */}
        {showLeftShadow && (
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
        )}
        {showRightShadow && (
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />
        )}
  
        {/* Arrows */}
        <button
          onClick={() => handleScroll("left")}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg"
        >
          {"<"}
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg"
        >
         {">"}

        </button>
  
        {/* Scrollable content */}
        <div
          ref={ref}
          className={twMerge(
            "max-sm:overflow-x-scroll flex gap-4 overflow-x-hidden scrollbar-hide"
          )}
          onScroll={() => setScrollPosition(ref.current?.scrollLeft || 0)}
          {...events}
        >
          {reviews?.map((review: any, index: number) => (
            <div
              key={index}
              className="bg-[#F1F0F5] p-4 rounded-lg min-w-full sm:min-w-[300px]"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Image
                    alt="avatar"
                    src={review?.avatar ?? ""}
                    width={8}
                    height={8}
                    className="w-12 h-12 rounded-full object-contain"
                  />
                  <MyTypography
                    variant="body-big"
                    weight="semibold"
                    className="text-nowrap"
                  >
                    {review.name}
                  </MyTypography>
                </div>
                <MyTypography
                  variant="body"
                  weight="semibold"
                  lightness={400}
                >
                  {review.date}
                </MyTypography>
              </div>
              <div className="text-left my-2">
                <MyTypography variant="body-big" weight="regular">
                  {review.description}
                </MyTypography>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CarouselReview;
