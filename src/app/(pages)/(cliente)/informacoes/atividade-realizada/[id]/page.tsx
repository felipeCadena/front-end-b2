"use client";

import { activities } from "@/common/constants/mock";
import MyBadge from "@/components/atoms/my-badge";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextarea from "@/components/atoms/my-textarea";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { adventures } from "@/services/api/adventures";
import { cn } from "@/utils/cn";
import { handleNameActivity } from "@/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function AtividadeRealizada() {
  const router = useRouter();
  const { id } = useParams();

  const { data: activity } = useQuery({
    queryKey: ["activity"],
    queryFn: () => adventures.getAdventureById(Number(id)),
  });

  return (
    <section className="mx-4 my-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Resumo da atividade feita
        </MyTypography>
      </div>
      <div className="md:flex md:gap-4">
        <div className="bg-gray-200 w-full md:w-1/4 h-[440px] rounded-lg mt-4">
          <Image
            src={activity?.images[0].url ?? ""}
            alt="Imagem da atividade"
            width={342}
            height={100}
            className={cn(
              "w-full h-[250px] object-cover rounded-t-lg",
              activity?.typeAdventure.includes("terra")
                ? "object-top"
                : "object-bottom"
            )}
          />

          <div className="p-8 flex flex-col gap-2">
            <div>
              <MyBadge variant="outline" className="p-1">
                {handleNameActivity(activity?.typeAdventure ?? "")}
              </MyBadge>
            </div>
            <MyTypography variant="subtitle3" weight="bold" className="">
              {activity?.title}
            </MyTypography>
            <MyTypography variant="label" className="">
              {activity?.description}
            </MyTypography>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-3/4">
          <div className="bg-[#F1F0F5] h-[64px] md:w-1/3 rounded-lg mt-4 flex items-center justify-center">
            <StarRating bigStars rating={activity?.averageRating ?? 5} />
          </div>

          <div className="mt-8 md:mt-4">
            <MyTextarea
              label="Comentários sobre a atividade"
              className=""
              placeholder="Deixe seu comentário"
              rows={6}
            />
            <MyButton
              variant="default"
              borderRadius="squared"
              size="lg"
              className="w-full"
            >
              Salvar
            </MyButton>
          </div>
        </div>
      </div>

      <div className="md:w-1/4">
        <MyTypography variant="heading2" weight="bold" className="mt-8">
          Suas fotos da atividade
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" lightness={400}>
          Acesse aqui suas fotos dessa atividade
        </MyTypography>
        <div className="p-3 mt-6 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
          <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

          <div className="flex items-center gap-1 ml-4" onClick={() => {}}>
            <Image
              alt="sample_file"
              src="/icons/drive.png"
              width={30}
              height={30}
            />
            <MyTypography variant="subtitle3" weight="bold" className="ml-3">
              Fotos dessa Atividade
            </MyTypography>
          </div>
        </div>
        <MyButton
          variant="outline-neutral"
          borderRadius="squared"
          size="lg"
          className="w-full mt-8"
        >
          Refazer atividade
        </MyButton>
      </div>
    </section>
  );
}
