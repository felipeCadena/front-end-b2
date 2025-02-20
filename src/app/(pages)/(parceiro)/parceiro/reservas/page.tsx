"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { MyFullCalendar } from "@/components/molecules/my-full-calendar";
import { useRouter } from "next/navigation";
import React from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import MyButton from "@/components/atoms/my-button";
import Hide from "@/components/atoms/my-icon/elements/hide";
import PATHS from "@/utils/paths";
import ActivitiesHidden from "@/components/organisms/activities-hidden";
import { notificationActivities } from "@/common/constants/mock";

export default function Reservas() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>();

  return (
    <main className="my-6">
      <div className="flex gap-2 items-center m-6">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />

        <MyTypography variant="subtitle1" weight="semibold">
          Sua agenda do mês
        </MyTypography>
      </div>

      <div className="relative px-2">
        <MyFullCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          className="capitalize"
        />
      </div>
      <div className="h-1 w-1/3 mx-auto bg-gray-200 rounded-xl my-6" />

      <div className="w-full flex justify-center gap-4 px-4">
        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          leftIcon={<MyIcon name="plus" className="" />}
          onClick={() => router.push("/parceiro/reservas/nova")}
          className="w-1/2"
        >
          Novo Evento
        </MyButton>

        <MyButton
          variant="red"
          borderRadius="squared"
          size="lg"
          leftIcon={<Hide iconColor="#FF7272" />}
          onClick={() => router.push(PATHS["atividades-ocultas"])}
          className="w-1/2"
        >
          Ocultas
        </MyButton>
      </div>

      <ActivitiesHidden notifications={notificationActivities} />
    </main>
  );
}
