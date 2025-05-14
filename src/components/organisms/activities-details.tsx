"use client";

import Image from "next/image";
import React from "react";
import MyIcon from "../atoms/my-icon";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import { cn } from "@/utils/cn";
import {
  getData,
  handleNameActivity,
  isDateInPast,
  selectActivityImage,
} from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { AddToCartAdventure, Adventure } from "@/services/api/adventures";
import { ActivityCardSkeleton } from "./activities-skeleton";

type ActivitiesDetailsProps = {
  activities: Adventure[];
  withDate?: boolean;
  type?: string;
  lowRating?: boolean;
};

export default function ActivitiesDetails({
  activities,
  withDate = false,
  type,
  lowRating = false,
}: ActivitiesDetailsProps) {
  const router = useRouter();

  const handleActivity = (id: string) => {
    if (type === "parceiro") {
      return router.push(PATHS.visualizarAtividadeParceiro(id));
    } else if (type === "admin") {
      return router.push(`/admin/avaliacoes/atividade/${id}`);
    } else {
      router.push(PATHS.visualizarAtividade(id));
    }
  };

  return (
    <section className={cn(withDate && "mx-4")}>
      {activities
        ? activities.map((adventure: Adventure, index: number) => (
            <div key={index} className="flex flex-col">
              <div
                onClick={() => handleActivity(adventure.id.toString())}
                className={cn(
                  "flex max-sm:max-h-[120px] max-sm:justify-around gap-2 cursor-pointer my-2",
                  withDate && "my-8 relative",
                  adventure?.averageRating <= 2 && "max-sm:max-h-[160px]"
                )}
              >
                {withDate && (
                  <MyIcon
                    name="options"
                    className="absolute top-0 right-0 cursor-pointer"
                  />
                )}
                {withDate && (
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center",
                      isDateInPast("2025-03-12T08:00:00") && "opacity-70"
                    )}
                  >
                    {isDateInPast("2025-03-12T08:00:00") ? (
                      <MyIcon name="calendar-opacity" />
                    ) : (
                      <MyIcon name="calendar" />
                    )}
                    <MyTypography
                      variant="body"
                      weight="semibold"
                      className={cn(
                        "text-primary-600",
                        isDateInPast("2025-03-12T08:00:00") && "text-[#c0c0c0]"
                      )}
                    >
                      {getData("2025-03-12T08:00:00")}
                    </MyTypography>
                  </div>
                )}
                <div
                  className={cn(
                    "relative z-10 overflow-hidden hover:cursor-pointer rounded-md flex-shrink-0",
                    withDate
                      ? "w-[7.5rem] h-[7.5rem]"
                      : "w-[6.625rem] h-[6.625rem]"
                  )}
                >
                  <Image
                    alt="imagem atividade"
                    src={
                      selectActivityImage(adventure) ??
                      "/images/atividades/paraquedas.webp"
                    }
                    width={250}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="relative flex flex-col justify-between">
                  <div className="flex gap-1 justify-between mb-1 mr-4">
                    <MyBadge
                      className="font-medium flex-shrink-0 w-fit"
                      variant="outline"
                    >
                      {handleNameActivity(adventure?.typeAdventure)}
                    </MyBadge>
                    {!withDate && (
                      <StarRating rating={adventure?.averageRating} />
                    )}
                  </div>

                  <MyTypography
                    variant="body-big"
                    weight="bold"
                    className={cn(withDate ? "mt-4" : "mt-2")}
                  >
                    {adventure?.title}
                  </MyTypography>
                  <MyTypography
                    variant="notification"
                    className={cn(withDate && "w-1/2")}
                  >
                    {withDate
                      ? adventure?.description.slice(0, 30).concat("...")
                      : adventure?.description.slice(0, 25).concat("...")}
                  </MyTypography>

                  {withDate && (
                    <div className="flex items-center gap-1">
                      <MyIcon
                        name="shared-muted"
                        className={cn(
                          "text-primary-600",
                          isDateInPast("2025-03-12T08:00:00") &&
                            "text-[#c0c0c0]"
                        )}
                      />
                      <MyTypography variant="notification">
                        {getData("2025-03-12T08:00:00")}
                      </MyTypography>
                    </div>
                  )}
                </div>
              </div>

              {lowRating && adventure?.averageRating <= 2 && (
                <MyButton
                  variant="black-border"
                  borderRadius="squared"
                  size="lg"
                  className="w-full mt-3 mb-5 font-bold text-[1rem]"
                >
                  Falar com o parceiro
                </MyButton>
              )}
            </div>
          ))
        : Array.from({ length: 4 }).map((_, index) => (
            <ActivityCardSkeleton key={index} />
          ))}
    </section>
  );
}
