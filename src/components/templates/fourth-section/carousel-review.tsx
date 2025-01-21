// "use client";

// import MyTypography from "@/components/atoms/my-typography";
// import Image from "next/image";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// export default function CarouselReview({ reviews }: any) {
//   return (
//     <div className="flex flex-col px-4 bg-[#F1F0F5] rounded-lg py-4 my-8">
//       <Carousel
//         showThumbs={false}
//         showStatus={false}
//         showArrows={false}
//         showIndicators={false}
//         emulateTouch
//         infiniteLoop
//       >
//         {reviews?.map((review: any, index: number) => (
//           <div key={index} className="">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-4">
//                 <Image
//                   alt="avatar"
//                   src={review?.avatar ?? ""}
//                   width={8}
//                   height={8}
//                   className="w-12 h-12 rounded-full object-contain"
//                 />
//                 <MyTypography variant="body-big" weight="semibold" className="text-nowrap">
//                   {review.name}
//                 </MyTypography>
//               </div>
//               <MyTypography variant="body" weight="semibold" lightness={400} className="">
//                 {review.date}
//               </MyTypography>
//             </div>
//             <div className="text-left my-2">

//             <MyTypography variant="body-big" weight="regular" className="">
//               {review.description}
//             </MyTypography>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

"use client";

import MyTypography from "@/components/atoms/my-typography";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { twMerge } from "tailwind-merge";

const CarouselReview = ({ reviews }: any) => {
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
      setscrollX(scrollX + scrollOffset);

      if (
        Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
        ref.current.offsetWidth
      ) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    }
  };

  useEffect(() => {
    //Check width of the scollings
    if (
      ref.current &&
      ref?.current?.scrollWidth === ref?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => {};
  }, [ref?.current?.scrollWidth, ref?.current?.offsetWidth]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={twMerge(
          "max-sm:overflow-x-scroll flex gap-4 overflow-x-hidden scrollbar-hide my-8"
        )}
        {...events}
      >
        {reviews?.map((review: any, index: number) => (
          <div key={index} className="bg-[#F1F0F5] p-4 rounded-lg min-w-full">
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
                className=""
              >
                {review.date}
              </MyTypography>
            </div>
            <div className="text-left my-2">
              <MyTypography variant="body-big" weight="regular" className="">
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
