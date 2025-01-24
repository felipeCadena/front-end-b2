"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { activities } from "@/common/constants/mock";
import MyBadge from "@/components/atoms/my-badge";
import StarRating from "@/components/molecules/my-stars";
import Image from "next/image";
import MyButton from "@/components/atoms/my-button";

export default function Atividade() {
  const router = useRouter();
  const { id } = useParams();

  const activity = activities.find((activity) => activity.id === id);

  return (
    <section className="my-10">
      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8"
          onClick={() => router.back()}
        />
        <CarouselImages
          fullWidth
          images={[
            "/images/atividades/montanha.webp",
            "/images/atividades/paraquedas.webp",
            "/images/atividades/mergulho.webp",
            "/images/atividades/moto.webp",
            "/images/atividades/parapente.webp",
            "/images/atividades/canoagem.webp",
          ]}
        />
        <MyIcon
          name="black-heart"
          className="absolute z-50 top-8 right-8"
          onClick={() => router.back()}
        />

        <div className="mt-8 mb-12 mx-6">
          <MyTypography variant="heading2" weight="bold" className="">
            {activity?.title}
          </MyTypography>
          <div className="flex justify-between my-2">
            <MyBadge variant="outline">{activity?.tag}</MyBadge>
            <StarRating rating={activity?.stars ?? 5} />
          </div>
        </div>

        <div className="mx-6 flex gap-4">
          <Image
            alt="avatar"
            src={activity?.parceiro.avatar ?? ""}
            width={8}
            height={8}
            className="w-12 h-12 rounded-full object-contain"
          />
          <div>
            <MyTypography variant="label" weight="semibold">
              {activity?.parceiro.nome}
            </MyTypography>
            <MyTypography variant="label" weight="regular" lightness={400}>
              Parceiro e Guia de atividades
            </MyTypography>
          </div>
        </div>

        <div className="m-6">
          <MyTypography variant="subtitle3" weight="bold" className="">
          Descrição da atividade:
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            {activity?.description}
          </MyTypography>

        </div>
      </div>

      <div className="mx-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 my-10">
          <div className="flex items-center gap-2">
            <MyIcon
              name="transporte"
              className="p-2 bg-primary-900 rounded-md"
            />
            <MyTypography variant="body" weight="bold" className="">
              Transporte
            </MyTypography>
          </div>

          <div className="flex items-center gap-2">
            <MyIcon
              name="fotografia"
              className="p-2 bg-primary-900 rounded-md"
            />
            <MyTypography variant="body" weight="bold" className="">
              Fotografia
            </MyTypography>
          </div>

          <div className="flex items-center gap-2">
            <MyIcon
              name="alimentacao"
              className="p-2 bg-primary-900 rounded-md"
            />
            <MyTypography variant="body" weight="bold" className="">
              Alimentação
            </MyTypography>
          </div>

          <div className="flex items-center gap-2">
            <MyIcon name="agua" className="p-2 bg-primary-900 rounded-md" />
            <MyTypography variant="body" weight="bold" className="">
              Água
            </MyTypography>
          </div>

          <div className="flex items-center gap-2">
            <MyIcon name="guia" className="p-2 bg-primary-900 rounded-md" />
            <MyTypography variant="body" weight="bold" className="">
              Guia
            </MyTypography>
          </div>

          <div className="flex items-center gap-2">
            <MyIcon
              name="combustivel"
              className="p-2 bg-primary-900 rounded-md"
            />
            <MyTypography variant="body" weight="bold" className="">
              Combustível
            </MyTypography>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary-900 py-2 rounded-md mb-2">
            <MyTypography
              variant="body"
              weight="bold"
              className="text-center"
            >
              Atividade individual
            </MyTypography>
          </div>

          <div className="bg-primary-900 py-2 rounded-md mb-2">
            <MyTypography
              variant="body"
              weight="bold"
              className="text-center"
            >
              Permitido crianças
            </MyTypography>
          </div>

          <div className="bg-primary-900 py-2 rounded-md mb-2">
            <MyTypography
              variant="body"
              weight="bold"
              className="text-center"
            >
              Grau de dificuldade: 1
            </MyTypography>
          </div>
        </div>

        <div className="my-10 flex items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
          <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>
          <MyIcon
            name="localizacaoRedonda"
            className="w-6 h-6 text-primary-900 ml-3"
          />
          <div className="ml-3">
            <MyTypography
              variant="body-big"
              weight="regular"
              className="text-center"
            >
              {activity?.localizacao}
            </MyTypography>
          </div>
        </div>

        <div className="flex justify-between my-10">
          <div className="flex items-center gap-2">
            <MyIcon name="duracao" />
            <div>
              <MyTypography variant="subtitle3" weight="bold" className="">
                Duração da atividade
              </MyTypography>
              <MyTypography variant="body-big" weight="regular" className="">
                4 horas
              </MyTypography>
            </div>
          </div>
          <MyIcon name="compartilhar" />
        </div>

        <div className="my-8">
          <MyTypography variant="subtitle3" weight="bold" className="">
            Política de cancelamento
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            Este agendamento só será reembolsado se cancelado até 3 dias antes
            da data confirmada.
          </MyTypography>
        </div>

        <div>
          <MyTypography variant="subtitle3" weight="bold" className="">
            Valor da atividade:
          </MyTypography>

          <div className="flex justify-between mt-1">
            <MyTypography variant="subtitle3" weight="regular" className="mt-1">
              A partir de <span className="line-through">R$ 400,00</span> por
            </MyTypography>

            <MyTypography variant="heading2" weight="extrabold" className="text-primary-600">
              <span className="text-primary-600 text-base font-extrabold">R$</span> 360,00
            </MyTypography>
          </div>

          <MyButton
            variant="default"
            className="mt-4 w-full"
            size="lg"
            borderRadius="squared"
            rightIcon={<MyIcon name="seta-direita" className="ml-3" />}
          >
            Garantir sua vaga
          </MyButton>
        </div>
      </div>
    </section>
  );
}
