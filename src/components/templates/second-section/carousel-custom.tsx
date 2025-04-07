"use client";

import MyBadge from "@/components/atoms/my-badge";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { ActivityCardSkeleton } from "@/components/organisms/activities-skeleton";
import { Adventure } from "@/services/api/adventures";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

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

  const handleActivity = (id: string) => {
    if (type === "parceiro") {
      return router.push(PATHS.visualizarAtividadeParceiro(id));
    } else {
      router.push(PATHS.visualizarAtividade(id));
    }
  };

  const handleNameActivity = (name: string) => {
    switch (name) {
      case "ar":
        return "Atividades Aéreas";
      case "terra":
        return "Atividades Terrestres";
      case "mar":
        return "Atividades Aquáticas";
    }
  };

  return (
    <section className="relative">
      <MyIcon
        name="chevron-down-green"
        className="absolute -left-0 top-[22%] rotate-90 z-20 hover:cursor-pointer"
        onClick={() => handleScroll("left")}
      />
      <div className="absolute -left-0 bg-gradient-to-r from-white via-white/80 to-transparent z-[15] w-8 h-[98%]" />
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
        {activities
          ? activities.map((activity: any, index: number) => {
              const activityImage =
                activity?.images?.find(
                  (image: { default?: boolean }) => image.default
                )?.url ??
                activity?.images?.[0]?.url ??
                "/images/atividades/ar/ar-1.jpeg";

              return (
                <div
                  key={index}
                  className="w-[20%] md:min-w-[30%] lg:min-w-[25%] flex flex-col gap-1 cursor-pointer items-start md:mb-8"
                  onClick={() => handleActivity(activity?.id)}
                >
                  <div className="relative z-10 overflow-hidden h-[225px] w-full md:w-[250px] hover:cursor-pointer rounded-md">
                    <Image
                      alt="Fotos da atividade"
                      src={activityImage}
                      width={250}
                      height={300}
                      className="w-full md:w-[250px] h-[225px] object-cover"
                    />
                    {type !== "parceiro" && activity?.favorite ? (
                      <MyIcon
                        name="full-heart"
                        variant="circled"
                        className="absolute top-3 right-3"
                      />
                    ) : (
                      type !== "parceiro" && (
                        <MyIcon
                          name="black-heart"
                          variant="circled"
                          className="absolute top-3 right-3"
                        />
                      )
                    )}
                  </div>

                  <div className="mt-1 flex gap-2 items-center">
                    <MyBadge variant="outline" className="p-1 text-nowrap">
                      {handleNameActivity(activity?.typeAdventure)}
                    </MyBadge>
                    <StarRating rating={activity?.averageRating} />
                  </div>

                  <div className="flex gap-2 items-center mt-1">
                    <Image
                      alt="foto parceiro"
                      src={activity?.partner?.logo ?? "/user.png"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <MyTypography
                      variant="body"
                      weight="medium"
                      className="mt-1 text-nowrap"
                    >
                      {activity?.partner?.fantasyName}
                    </MyTypography>
                  </div>

                  <MyTypography variant="subtitle1" weight="bold">
                    {activity?.title}
                  </MyTypography>
                  <MyTypography variant="body-big" className="md:pr-4">
                    {activity?.description.slice(0, 105).concat("...")}
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
              );
            })
          : Array.from({ length: 4 }).map((_, index) => (
              <ActivityCardSkeleton key={index} />
            ))}
      </div>
    </section>
  );
}
