"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { MyFullCalendar } from "@/components/molecules/my-full-calendar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import MyButton from "@/components/atoms/my-button";
import Hide from "@/components/atoms/my-icon/elements/hide";
import PATHS from "@/utils/paths";
import ActivitiesHidden from "@/components/organisms/activities-hidden";
import { activities, notificationActivities } from "@/common/constants/mock";
import FullActivitiesHistoric from "@/components/organisms/full-activities-historic";
import ModalAlert from "@/components/molecules/modal-alert";
import { useAlert } from "@/hooks/useAlert";
import { useQuery } from "@tanstack/react-query";
import { schedules } from "@/services/api/schedules";
import { parseISO } from "date-fns";
import { MyCalendar } from "@/components/molecules/my-calendar";
import { MyFullCalendarMultiple } from "@/components/molecules/my-full-calendar-multiple";

export default function Reservas() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>(new Date());
  const [dates, setDates] = React.useState<Date[]>([]);

  const { handleClose, isModalOpen } = useAlert();

  const { data: allSchedules } = useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      const reservations = await schedules.getSchedules({ isCanceled: false });
      if (reservations) {
        const bookedDates = reservations.data.map((item: any) =>
          parseISO(item.datetime)
        );

        setDates(bookedDates);
      }
      return reservations;
    },
  });

  useEffect(() => {
    const bookedDates = allSchedules?.data.map((item: any) =>
      parseISO(item.datetime)
    );
    setDates(bookedDates);
  }, []);

  return (
    <main className="my-6">
      <div className="m-6 flex items-center justify-between md:my-12">
        <div className="flex gap-2 items-center md:w-1/2">
          <MyIcon
            name="voltar-black"
            className=""
            onClick={() => router.back()}
          />

          <MyTypography variant="subtitle1" weight="semibold">
            Sua agenda do mês
          </MyTypography>
        </div>

        <div className="max-sm:hidden w-full flex justify-end gap-4 px-4">
          <MyButton
            variant="default"
            borderRadius="squared"
            size="md"
            leftIcon={<MyIcon name="plus" className="" />}
            onClick={() => router.push(PATHS["cadastro-atividade"])}
            className="w-1/4"
          >
            Nova atividade
          </MyButton>

          <MyButton
            variant="red"
            borderRadius="squared"
            size="md"
            leftIcon={<Hide iconColor="#FF7272" />}
            onClick={() => router.push(PATHS["atividades-ocultas"])}
            className="w-1/4"
          >
            Ocultas
          </MyButton>
        </div>
      </div>

      <div className="relative px-2">
        <MyFullCalendarMultiple
          // mode="single"
          selected={date}
          onSelect={setDate}
          markedDates={dates}
          locale={ptBR}
          className="capitalize"
          required
        />
      </div>
      <div className="h-1 w-1/3 mx-auto bg-gray-200 rounded-xl my-6" />

      <div className="md:hidden w-full flex justify-center gap-4 px-4">
        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          leftIcon={<MyIcon name="plus" className="" />}
          onClick={() => router.push(PATHS["cadastro-atividade"])}
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

      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        iconName="warning"
        title="Atividade cancelada"
        descrition="A atividade já foi cancelada e em breve seu cliente receberá uma mensagem explicando isso."
        button="Voltar ao início"
      />

      <div className="md:hidden">
        <ActivitiesHidden notifications={notificationActivities} />
      </div>
      <div className="hidden md:block">
        <FullActivitiesHistoric
          activities={allSchedules?.data}
          withDate
          withOptions
          partner
        />
      </div>
    </main>
  );
}
