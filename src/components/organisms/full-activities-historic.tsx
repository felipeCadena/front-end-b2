"use client";

import Image from "next/image";
import React from "react";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import { getData, getHora } from "@/utils/formatters";
import MyButton from "../atoms/my-button";
import { usePathname, useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import Calendar from "../atoms/my-icon/elements/calendar";
import PopupActivity from "./popup-activity";
import ModalClient from "./modal-client";
import { clientList } from "@/common/constants/mock";
import Pessoas from "../atoms/my-icon/elements/pessoas";

export default function FullActivitiesHistoric({
  activities,
  withDate,
  withOptions,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = React.useState(false);

  const handleCancel = (id: string | number) => {
    router.push(PATHS.cancelarAtividade(id));
  };

  const handleEdit = (id: string) => {
    router.push(PATHS.editarAtividadeParceiro(id));
  };

  return (
    <section className="md:max-w-screen-custom">
      <ModalClient
        open={showModal}
        onClose={() => setShowModal(false)}
        data={clientList}
        icon={<Pessoas stroke="#9F9F9F" />}
        title="Lista de Clientes"
        descrition="Confira a lista de clientes para esta atividade:"
        button="Fechar"
      />
      {activities.map((activity: any, index: number) => (
        <div className="flex items-center gap-4 mt-20 mb-20 w-full" key={index}>
          {withDate && (
            <MyButton
              variant={withDate ? "secondary-text" : "default"}
              borderRadius="squared"
              size={withDate ? "md" : "lg"}
              className={cn(
                !withDate && "px-10",
                "flex flex-col gap-1 text-base"
              )}
            >
              {withDate ? (
                <div>
                  <Calendar width={30} height={30} />
                </div>
              ) : (
                <MyIcon name="clock" className="mr-2" />
              )}
              {withDate
                ? getData(activity.reserva.timestamp)
                : "Refazer atividade"}
            </MyButton>
          )}

          <div className="relative z-10 flex-shrink-0 overflow-hidden w-[265px] h-[265px] hover:cursor-pointer rounded-md">
            <Image
              alt="sample_file"
              src={activity.image ?? ""}
              width={250}
              height={300}
              className="object-cover w-[265px] h-[265px]"
              onClick={() => router.push(PATHS.atividadeRealizada(activity.id))}
            />
          </div>

          <div className="w-full space-y-2 max-h-[265px]">
            <div className="w-full flex justify-between mb-4 relative">
              <div
                className="flex flex-col gap-2 cursor-pointer"
                onClick={() =>
                  router.push(PATHS.atividadeRealizada(activity.id))
                }
              >
                <div className="flex items-center gap-2">
                  <MyBadge className="font-medium p-1" variant="outline">
                    {activity.tag}
                  </MyBadge>
                  <StarRating rating={activity.stars} />

                  <div className="flex gap-2 items-center">
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
                </div>
                <MyTypography variant="subtitle3" weight="bold" className="">
                  {activity.title}
                </MyTypography>

                <MyTypography variant="label" className="">
                  {activity.description.slice(0, 40).concat("...")}
                </MyTypography>
              </div>

              {!withDate && (
                <MyButton
                  variant="default"
                  borderRadius="squared"
                  size="lg"
                  className="text-base ml-auto"
                  leftIcon={<MyIcon name="clock" className="mr-2" />}
                >
                  Refazer atividade
                </MyButton>
              )}

              {withOptions && (
                <div className="absolute top-0 right-3 cursor-pointer z-20">
                  <PopupActivity
                    onDuplicar={() => console.log("Duplicar")}
                    onCancelar={() => handleCancel(activity.id)}
                    onEditar={() => handleEdit(activity.id)}
                    onOcultar={() => console.log("Ocultar")}
                    onExcluir={() => console.log("Excluir")}
                    onCustomer={() => setShowModal(true)}
                  />
                </div>
              )}

              <div
                className={cn(
                  "flex gap-4",
                  pathname.includes("parceiro") && "hidden"
                )}
              >
                {withDate && (
                  <MyButton
                    variant="message"
                    borderRadius="squared"
                    size="md"
                    className="px-10"
                    leftIcon={<MyIcon name="message" className="" />}
                  >
                    Mensagem
                  </MyButton>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

              <div className="flex flex-col">
                <MyTypography variant="label" weight="bold" className="ml-3">
                  Data da Atividade
                </MyTypography>
                <MyTypography variant="body" weight="regular" className="ml-3">
                  {getData(activity.reserva.timestamp)} -{" "}
                  {getHora(activity.reserva.timestamp)}{" "}
                  {+getHora(activity.reserva.timestamp).split(":")[0] > 12
                    ? "tarde"
                    : "manhã"}
                </MyTypography>
              </div>
              <div className="flex items-center gap-1">
                <MyIcon name="duracao" />
                <div>
                  <MyTypography variant="label" weight="bold" className="">
                    Duração da atividade
                  </MyTypography>
                  <MyTypography variant="body" weight="regular" className="">
                    4 horas
                  </MyTypography>
                </div>
              </div>

              <div className="flex flex-col">
                <MyTypography variant="label" weight="bold" className="ml-3">
                  Quant. de pessoas
                </MyTypography>
                <MyTypography variant="body" weight="regular" className="ml-3">
                  {activity.reserva.pessoas} adultos x{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(activity.reserva.total / activity.reserva.pessoas)}
                </MyTypography>
              </div>

              <div className="flex flex-col">
                <MyTypography
                  variant="body-big"
                  weight="bold"
                  className="text-right"
                >
                  Total:
                </MyTypography>
                <MyTypography variant="body" weight="bold" className="">
                  {activity.reserva.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </MyTypography>
              </div>
            </div>

            <div className="cursor-pointer flex justify-between items-center p-4 bg-[#F1F0F587] border border-primary-600/30 md:bg-primary-900 border-opacity-80 rounded-lg shadow-sm relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

              <div className="flex items-center gap-1 ml-4">
                <MyIcon name="camera" />
                <MyTypography variant="subtitle3" weight="bold" className="">
                  Fotos dessa Atividade
                </MyTypography>
              </div>
              <MyIcon name="seta" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
