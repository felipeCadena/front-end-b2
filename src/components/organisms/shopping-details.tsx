import React from "react";
import MyTypography from "../atoms/my-typography";
import MyBadge from "../atoms/my-badge";
import MyIcon from "../atoms/my-icon";
import { getData, getHora } from "@/utils/formatters";
import MyButton from "../atoms/my-button";

export default function ShoppingDetails({ activityDetails }: any) {
  return (
    <section className="border space-y-6 border-gray-300 rounded-lg my-8">
      <div className="px-6 my-6">
        <MyBadge variant="outline" className="p-1">
          {activityDetails?.tag}
        </MyBadge>
        <MyTypography variant="subtitle3" weight="bold" className="mt-2">
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
        <MyTypography variant="label" weight="bold" className="">
          Política de cancelamento
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="mt-1">
          Este agendamento só será reembolsado se cancelado até 3 dias antes da
          data confirmada.
        </MyTypography>
      </div>

      <div className="flex items-center gap-2 px-6">
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

      <div className="w-full flex items-center justify-between border-t-[1px] border-gray-400/30">
        <div className="flex flex-col p-6">
          <MyTypography variant="body-big" weight="regular" className="">
            {activityDetails?.reserva.pessoas} adultos x{" "}
            {new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              activityDetails?.reserva.total / activityDetails?.reserva.pessoas
            )}
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="">
            {getData(activityDetails?.reserva.timestamp)} -{" "}
            {getHora(activityDetails?.reserva.timestamp)}{" "}
            {+getHora(activityDetails?.reserva.timestamp).split(":")[0] > 12
              ? "tarde"
              : "manhã"}
          </MyTypography>
        </div>

        <div className="flex flex-col p-6">
          <MyTypography variant="body-big" weight="bold" className="text-right">
            Total:
          </MyTypography>
          <MyTypography variant="body-big" weight="bold" className="">
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
