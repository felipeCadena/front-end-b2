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

  const [_scrollPosition, setScrollPosition] = useState(0);

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
        className="absolute -left-0 top-[22%] rotate-90 z-20 hover:cursor-pointer w-[10px]"
        onClick={() => handleScroll("left")}
      />
      <div className="absolute -left-0 bg-gradient-to-r from-white via-white/80 to-transparent z-[15] w-5 h-[98%]" />
      <div className="absolute -right-0 bg-gradient-to-l from-white via-white/80 to-transparent z-[15] w-8 h-[98%] " />

      <MyIcon
        name="chevron-down-green"
        className="absolute -right-0 top-[22%] -rotate-90 z-20 hover:cursor-pointer"
        onClick={() => handleScroll("right")}
      />

      <div
        ref={ref}
        className={cn(
          "overflow-x-scroll flex gap-4 max-sm:no-scrollbar my-8 md:my-4 md:last:mb-16 md:scrollbar-thin snap-x snap-mandatory px-8"
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
