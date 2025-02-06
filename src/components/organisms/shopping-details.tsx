import React from "react";
import MyTypography from "../atoms/my-typography";
import MyBadge from "../atoms/my-badge";
import MyIcon from "../atoms/my-icon";
import { getData, getHora } from "@/utils/formatters";

export default function ShoppingDetails({ activityDetails }: any) {
  return (
    <section className="border border-gray-300 md:border-gray-100 rounded-lg my-8 md:my-4">
      <div className="space-y-6">
        <div className="px-6 my-6">
          <MyBadge variant="outline" className="p-1">
            {activityDetails?.tag}
          </MyBadge>
          <MyTypography variant="subtitle3" weight="bold" className="mt-4">
            {activityDetails?.title}
          </MyTypography>
        </div>

        <div className="flex items-center gap-2 px-6">
          <MyIcon
            name="localizacaoRedonda"
            className="w-6 h-6 text-primary-900"
          />
          <MyTypography
            variant="body-big"
            weight="regular"
            className="text-center"
          >
            {activityDetails?.localizacao}
          </MyTypography>
        </div>

        <div className="px-6">
          <MyTypography variant="label" weight="bold">
            Política de cancelamento
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            Este agendamento só será reembolsado se cancelado até 3 dias antes
            da data confirmada.
          </MyTypography>
        </div>

        <div className="flex items-center gap-2 px-6 md:p-6 md:mx-6 md:rounded-lg md:bg-gray-500">
          <MyIcon name="duracao" />
          <div>
            <MyTypography variant="label" weight="bold">
              Duração da atividade
            </MyTypography>
            <MyTypography variant="body" weight="regular">
              4 horas
            </MyTypography>
          </div>
        </div>
        <div className="max-sm:hidden border-t-[1.5px] border-gray-400/30 mx-6" />
      </div>

      <div className="w-full flex items-center justify-between max-sm:border-t-[1px] max-sm:border-gray-400/30 last:mb-0">
        <div className="flex flex-col p-6">
          <MyTypography
            variant="body-big"
            weight="regular"
            className="md:text-[0.9rem]"
          >
            {activityDetails?.reserva.pessoas} adultos x{" "}
            {new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              activityDetails?.reserva.total / activityDetails?.reserva.pessoas
            )}
          </MyTypography>
          <MyTypography
            variant="body-big"
            weight="regular"
            className="md:text-[0.9rem]"
          >
            {getData(activityDetails?.reserva.timestamp)} -{" "}
            {getHora(activityDetails?.reserva.timestamp)}{" "}
            {+getHora(activityDetails?.reserva.timestamp).split(":")[0] > 12
              ? "tarde"
              : "manhã"}
          </MyTypography>
        </div>

        <div className="flex flex-col p-6">
          <MyTypography
            variant="body-big"
            weight="bold"
            className="text-right md:text-[0.9rem]"
          >
            Total:
          </MyTypography>
          <MyTypography
            variant="body-big"
            weight="bold"
            className="md:text-primary-600"
          >
            {activityDetails?.reserva.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </MyTypography>
        </div>
      </div>
    </section>
  );
}
