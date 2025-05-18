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
import { Adventure } from "@/services/api/adventures";
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
    <section className={cn("", withDate && "py-4")}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {activities && activities.length > 0
          ? activities.map((adventure: Adventure, index: number) => {
              const date = "2025-03-12T08:00:00"; // substitua se for dinâmico
              const isPast = isDateInPast(date);

              return (
                <div
                  key={index}
                  className="flex flex-col rounded-xl shadow-sm bg-white h-full"
                >
                  <div
                    onClick={() => handleActivity(adventure.id.toString())}
                    className="flex gap-2 cursor-pointer"
                  >
                    {/* Imagem */}
                    <div className="relative w-[7rem] h-[7rem] overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        alt="imagem atividade"
                        src={
                          selectActivityImage(adventure) ??
                          "/images/atividades/paraquedas.webp"
                        }
                        width={250}
                        height={250}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <MyBadge
                          variant="outline"
                          className="w-fit font-medium text-nowrap p-1"
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
                        className="line-clamp-1"
                      >
                        {adventure?.title}
                      </MyTypography>

                      <MyTypography
                        variant="notification"
                        className="line-clamp-2 text-muted-foreground"
                      >
                        {adventure?.description}
                      </MyTypography>

                      {withDate && (
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <MyIcon
                            name={isPast ? "calendar-opacity" : "calendar"}
                            className={cn(isPast && "text-[#c0c0c0]")}
                          />
                          <MyTypography
                            variant="notification"
                            className={cn(
                              isPast ? "text-[#c0c0c0]" : "text-primary-600"
                            )}
                          >
                            {getData(date)}
                          </MyTypography>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botão para lowRating */}
                  {lowRating && adventure?.averageRating <= 2 && (
                    <MyButton
                      variant="black-border"
                      borderRadius="squared"
                      size="lg"
                      className="w-full mt-4 font-bold text-[1rem]"
                    >
                      Falar com o parceiro
                    </MyButton>
                  )}
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
