"use client";

import MyBadge from "@/components/atoms/my-badge";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function CarouselCustom({ activities }: any) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const router = useRouter();

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
    ref.current.scrollWidth > ref.current.clientWidth + scrollPosition + 1;

  return (
    <section className="relative">
      <MyIcon
        name="chevron-down-green"
        className="absolute -left-1 top-[22%] rotate-90 z-20"
        onClick={() => handleScroll("left")}
      />

      <MyIcon
        name="chevron-down-green"
        className="absolute -right-1 top-[22%] -rotate-90 z-20"
        onClick={() => handleScroll("right")}
      />

      <div
        ref={ref}
        className={cn(
          "overflow-x-scroll flex gap-4 max-sm:no-scrollbar my-8 md:my-4 md:last:mb-16 md:scrollbar-thin snap-x snap-mandatory"
        )}
        {...events}
      >
        {activities.map((activity: any, index: number) => (
          <div
            key={index}
            className="min-w-[70%] md:min-w-[30%] lg:min-w-[25%] flex flex-col gap-1 cursor-pointer md:mb-8"
            onClick={() => router.push(PATHS.visualizarAtividade(activity.id))}
          >
            <div className="relative z-10 overflow-hidden h-[225px] w-full md:w-[250px] hover:cursor-pointer rounded-md">
              <Image
                alt="sample_file"
                src={activity.image ?? ""}
                width={250}
                height={300}
                className="w-full md:w-[250px] h-[225px] object-cover"
              />
              {activity.favorite ? (
                <MyIcon
                  name="full-heart"
                  variant="circled"
                  className="absolute top-3 right-3"
                />
              ) : (
                <MyIcon
                  name="black-heart"
                  variant="circled"
                  className="absolute top-3 right-3"
                />
              )}
            </div>

            <div className="mt-1 flex gap-2 items-center">
              <MyBadge variant="outline" className="p-1">
                {activity.tag}
              </MyBadge>
              <StarRating rating={activity.stars} />
            </div>

            <div className="flex gap-2 items-center mt-1">
              <Image
                alt="foto parceiro"
                src={activity.parceiro.avatar}
                width={40}
                height={40}
                className="rounded-full"
              />
              <MyTypography
                variant="body"
                weight="medium"
                className="mt-1 text-nowrap"
              >
                {activity.parceiro.nome}
              </MyTypography>
            </div>

            <MyTypography variant="subtitle1" weight="bold">
              {activity.title}
            </MyTypography>
            <MyTypography variant="body-big" className="md:w-[250px] ">
              {activity.description.slice(0, 105).concat("...")}{" "}
              <MyTypography
                variant="body-big"
                weight="bold"
                lightness={500}
                className="inline cursor-pointer"
              >
                Saiba Mais
              </MyTypography>
            </MyTypography>
          </div>
        ))}
      </div>
    </section>
  );
}
