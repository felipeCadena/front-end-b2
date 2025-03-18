"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import MyBadge from "@/components/atoms/my-badge";
import Image from "next/image";
import MyButton from "@/components/atoms/my-button";
import { album } from "@/common/constants/mock";
import { cn } from "@/utils/cn";
import Edit from "@/components/atoms/my-icon/elements/edit";
import ModalAlert from "@/components/molecules/modal-alert";
import { useAlert } from "@/hooks/useAlert";

export default function Atividade() {
  const router = useRouter();
  const { id } = useParams();

  const { handleClose, isModalOpen } = useAlert();

  const activity = {
    id,
    title: "Trilha do Morro Dois Irmãos",
    tag: "Atividade na Terra",
    description:
      "Uma trilha incrível com vista panorâmica para o Rio de Janeiro",
    images: [
      "/images/atividades/montanha.webp",
      "/images/atividades/paraquedas.webp",
      "/images/atividades/mergulho.webp",
      "/images/atividades/moto.webp",
      "/images/atividades/parapente.webp",
      "/images/atividades/canoagem.webp",
    ],
    servicos: {
      transporte: true,
      fotografia: true,
      alimentacao: true,
      agua: true,
      guia: true,
      combustivel: true,
    },
    caracteristicas: {
      tipoAtividade: "individual",
      permiteCriancas: true,
      grauDificuldade: 1,
    },
    localizacao: "Rio de Janeiro, Morro Dois Irmãos",
    pontoEncontro: "Entrada do Vidigal",
    duracao: "4 horas",
    valor: 360.0,
    horarios: {
      diasSemana: ["Segunda", "Quarta", "Sexta"],
      horarios: ["08:00", "14:00"],
    },
    politicas: {
      antecedenciaCancelamento: "3 dias",
      antecedenciaAgendamento: "2 dias",
      minimoPessoas: 1,
      maximoPessoas: 10,
    },
    tipoAtividade: "grupo", // ou "individual"
    permiteCriancas: true,
    valorAdulto: 200.0,
    valorCrianca: 100.0,
  };

  return (
    <section className="my-10">
      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua nova atividade já foi cadastrada e já pode ser visualizada pelos nossos clientes."
        button="Voltar ao início"
      />
      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8 md:hidden"
          onClick={() => router.back()}
        />

        <div className="md:hidden">
          <CarouselImages
            images={[
              "/images/atividades/montanha.webp",
              "/images/atividades/paraquedas.webp",
              "/images/atividades/cachoeira.webp",
              "/images/atividades/moto.webp",
              "/images/atividades/parapente.webp",
              "/images/atividades/sup.webp",
            ]}
          />
        </div>
        <div className="flex flex-col max-sm:items-center my-8">
          <div className="flex max-sm:flex-col items-start justify-between gap-8">
            <div className="">
              <MyTypography variant="heading2" weight="bold" className="">
                {activity?.title}
              </MyTypography>
              <MyBadge variant="outline" className="p-1 mt-2">
                {activity?.tag}
              </MyBadge>
            </div>
            <MyButton
              borderRadius="squared"
              size="lg"
              className="max-sm:hidden"
              onClick={() =>
                router.push(
                  `/parceiro/atividades-cadastradas/atividade/${id}/editar`
                )
              }
              leftIcon={<Edit fill="#fff" />}
            >
              Editar Atividade
            </MyButton>
          </div>

          <div className="mt-4 max-sm:hidden">
            <MyTypography variant="subtitle3" weight="bold" className="">
              Descrição da atividade:
            </MyTypography>
            <MyTypography variant="body-big" weight="regular" className="mt-1">
              {activity?.description}
            </MyTypography>
          </div>
        </div>
        <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
          {album.slice(0, 5).map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="album"
              width={300}
              height={300}
              className={`h-full w-full rounded-lg object-cover ${index === 0 ? "col-span-2 row-span-2 h-full" : ""}`}
            />
          ))}
        </div>

        <div className="mx-6 mt-4 md:hidden">
          <MyTypography variant="subtitle3" weight="bold" className="">
            Descrição da atividade:
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            {activity?.description}
          </MyTypography>
        </div>
      </div>

      <div className="mx-6">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 my-10">
            {Object.entries(activity.servicos).map(
              ([key, value]) =>
                value && (
                  <div key={key} className="flex items-center gap-2">
                    <MyIcon
                      name={key as any}
                      className="p-2 bg-primary-900 rounded-md"
                    />
                    <MyTypography variant="body" weight="bold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </MyTypography>
                  </div>
                )
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:my-auto">
            <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                {activity.caracteristicas.tipoAtividade === "individual"
                  ? "Atividade individual"
                  : "Atividade em grupo"}
              </MyTypography>
            </div>

            {activity.caracteristicas.permiteCriancas && (
              <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
                <MyTypography
                  variant="body"
                  weight="bold"
                  className="text-center"
                >
                  Permitido crianças
                </MyTypography>
              </div>
            )}

            <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                Grau de dificuldade: {activity.caracteristicas.grauDificuldade}
              </MyTypography>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-8">
          <div className="md:w-2/3">
            <div className="my-6 flex items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>
              <MyIcon
                name="localizacaoRedonda"
                className="w-6 h-6 text-primary-900 ml-3"
              />
              <div className="ml-3">
                <MyTypography variant="body-big" weight="regular">
                  {activity.localizacao}
                </MyTypography>
                <MyTypography
                  variant="body"
                  weight="regular"
                  className="text-gray-600"
                >
                  Ponto de encontro: {activity.pontoEncontro}
                </MyTypography>
              </div>
            </div>

            <div className="space-y-6 my-10">
              <div className="flex items-center gap-2">
                <MyIcon name="duracao" />
                <div>
                  <MyTypography variant="subtitle3" weight="bold">
                    Duração da atividade
                  </MyTypography>
                  <MyTypography variant="body-big" weight="regular">
                    {activity.duracao}
                  </MyTypography>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MyIcon name="calendar" />
                <div>
                  <MyTypography variant="subtitle3" weight="bold">
                    Dias disponíveis
                  </MyTypography>
                  <MyTypography variant="body-big" weight="regular">
                    {activity.horarios.diasSemana.join(", ")}
                  </MyTypography>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MyIcon name="clock" />
                <div>
                  <MyTypography variant="subtitle3" weight="bold">
                    Horários
                  </MyTypography>
                  <MyTypography variant="body-big" weight="regular">
                    {activity.horarios.horarios.join(", ")}
                  </MyTypography>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-8 mt-4">
              <div className="space-y-2">
                <MyTypography variant="subtitle3" weight="bold">
                  Políticas da atividade
                </MyTypography>
                <MyTypography variant="body-big" weight="regular">
                  • Antecedência mínima para agendamento:{" "}
                  <span className="block">
                    {activity.politicas.antecedenciaAgendamento}
                  </span>
                </MyTypography>
                <MyTypography variant="body-big" weight="regular">
                  • Antecedência mínima para cancelamento:{" "}
                  <span className="block">
                    {activity.politicas.antecedenciaCancelamento}
                  </span>
                </MyTypography>
                <MyTypography variant="body-big" weight="regular">
                  • Quantidade de pessoas: {activity.politicas.maximoPessoas}
                </MyTypography>
              </div>

              <div className="space-y-2">
                <MyTypography variant="subtitle3" weight="bold">
                  Essa atividade será realizada:
                </MyTypography>

                <MyTypography variant="body-big" weight="regular">
                  • Em grupo
                </MyTypography>

                <MyTypography variant="body-big" weight="regular">
                  • Com criança
                </MyTypography>
              </div>

              <div className="space-y-4">
                <MyTypography variant="subtitle3" weight="regular">
                  <span className="font-bold">Valor por adulto:</span> R${" "}
                  {activity.valorAdulto.toFixed(2)}
                </MyTypography>

                {activity.permiteCriancas && (
                  <MyTypography variant="subtitle3" weight="regular">
                    <span className="font-bold">Valor por criança:</span> R${" "}
                    {activity.valorCrianca.toFixed(2)}
                  </MyTypography>
                )}
              </div>
            </div>
          </div>
        </div>
        <MyButton
          borderRadius="squared"
          size="md"
          className="md:hidden w-full mt-10"
          onClick={() =>
            router.push(
              `/parceiro/atividades-cadastradas/atividade/${id}/editar`
            )
          }
          leftIcon={<Edit fill="#fff" />}
        >
          Editar Atividade
        </MyButton>
      </div>
    </section>
  );
}
