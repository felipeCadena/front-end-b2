"use client";

import MyIcon from "@/components/atoms/my-icon";
import { ActivityCardSkeleton } from "@/components/organisms/activities-skeleton";
import { Adventure, adventures } from "@/services/api/adventures";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import CarouselActivity from "./carousel-activity";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { motion, useMotionValue, animate } from "framer-motion";

export default function CarouselCustom({
  activities,
  type,
}: {
  activities: Adventure[] | null | undefined;
  type?: string;
}) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(ref);
  const { data: session } = useSession();

  const scrollX = useMotionValue(0); // motion value para scroll

  // const [_scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    const scrollAmount = 300;

    if (ref.current) {
      const newPosition =
        direction === "left"
          ? ref.current.scrollLeft - scrollAmount
          : ref.current.scrollLeft + scrollAmount;

      animate(scrollX, newPosition, {
        type: "tween",
        duration: 0.5,
        onUpdate: (value) => {
          if (ref.current) ref.current.scrollLeft = value;
        },
      });
    }
  };

  const { data: favoriteList = [] } = useQuery({
    queryKey: ["favorite_list"],
    queryFn: async () => {
      const response = await adventures.listFavorites();
      const favoritesIdList = response.map((favorite) => {
        return {
          favoriteID: favorite.id,
          adventureID: favorite.adventure.id.toString(),
        };
      });

      return favoritesIdList;
    },
    enabled: !!session?.user,
  });

  return (
    <section className="relative">
      <MyIcon
        name="chevron-down-green"
        className="absolute -left-6 md:left-0 top-[22%] rotate-90 z-20 hover:cursor-pointer h-5 w-5"
        onClick={(e) => {
          e.stopPropagation();
          handleScroll("left");
        }}
      />

      <MyIcon
        name="chevron-down-green"
        className="absolute -right-2 top-[22%] -rotate-90 z-20 hover:cursor-pointer h-5 w-5"
        onClick={(e) => {
          e.stopPropagation();
          handleScroll("right");
        }}
      />

      <div
        ref={ref}
        className={cn(
          "overflow-x-scroll flex gap-4 max-sm:no-scrollbar my-8 md:my-4 md:last:mb-16 md:scrollbar-thin snap-x snap-mandatory md:px-8"
        )}
        {...events}
      >
        {activities && activities.length > 0
          ? activities.map((activity) => {
              return (
                <CarouselActivity
                  key={activity.id}
                  activity={activity}
                  favoriteList={favoriteList}
                  type={type}
                />
              );
            })
          : Array.from({ length: 4 }).map((_, index) => (
              <ActivityCardSkeleton key={index} />
            ))}
      </div>
    </section>
  );
}
