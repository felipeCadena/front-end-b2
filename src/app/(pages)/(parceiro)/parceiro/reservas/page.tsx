"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import MyButton from "@/components/atoms/my-button";
import Hide from "@/components/atoms/my-icon/elements/hide";
import PATHS from "@/utils/paths";
import ActivitiesHidden from "@/components/organisms/activities-hidden";
import { notificationActivities } from "@/common/constants/mock";
import ModalAlert from "@/components/molecules/modal-alert";
import { useAlert } from "@/hooks/useAlert";
import PartnerActivitiesHistoric from "@/components/organisms/partner-activities-historic";
import { MyFullCalendarMultiple } from "@/components/molecules/my-full-calendar-multiple";
import { useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { partnerService } from "@/services/api/partner";
import PartnerHistoricMobile from "@/components/organisms/partner-historic-mobile";
import LoadingSpinner from "@/components/atoms/loading-spinner";
import Loading from "@/components/molecules/loading";
import Image from "next/image";

export default function Reservas() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>(new Date());
  const [dates, setDates] = React.useState<Date[]>([]);

  const { handleClose, isModalOpen } = useAlert();

  const { data: parterSchedules, isLoading } = useQuery({
    queryKey: ["parterSchedules", date],
    queryFn: () =>
      partnerService.getMySchedules({
        limit: 50,
        // isCanceled: false,
        qntConfirmedPersons: "> 0",
      }),
  });

  useEffect(() => {
    if (parterSchedules) {
      const bookedDates = parterSchedules?.data.map((item: any) =>
        parseISO(item?.datetime)
      );
      setDates(bookedDates);
    }
  }, [parterSchedules]);

  const selectedScheduleActivities =
    parterSchedules &&
    parterSchedules.data?.filter(
      (act) => act.datetime.slice(0, 10) === date?.toISOString().slice(0, 10)
    );

  const renderActivities =
    selectedScheduleActivities && selectedScheduleActivities?.length > 0
      ? selectedScheduleActivities
      : parterSchedules?.data;

  return (
    <main className="my-6">
      <div className="px-4 flex items-center justify-between md:my-12">
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

          {/* <MyButton
            variant="red"
            borderRadius="squared"
            size="md"
            leftIcon={<Hide iconColor="#FF7272" />}
            onClick={() => router.push(PATHS["atividades-ocultas"])}
            className="w-1/4"
          >
            Ocultas
          </MyButton> */}
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
          className="w-full md:w-1/2"
        >
          Nova Atividade
        </MyButton>

        {/* <MyButton
          variant="red"
          borderRadius="squared"
          size="lg"
          leftIcon={<Hide iconColor="#FF7272" />}
          onClick={() => router.push(PATHS["atividades-ocultas"])}
          className="w-1/2"
        >
          Ocultas
        </MyButton> */}
      </div>

      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        onAction={handleClose}
        iconName="warning"
        title="Atividade cancelada"
        descrition="A atividade foi cancelada."
        button="Voltar ao início"
      />

      {!renderActivities && !isLoading && (
        <MyTypography
          variant="subtitle3"
          weight="bold"
          className="w-full h-[20vh] flex justify-center items-center"
        >
          Ainda não há atividades agendadas
        </MyTypography>
      )}

      {isLoading && (
        <div className="w-full h-[40vh] flex justify-center items-center relative">
          <Image
            src="/logo.png"
            alt="B2 Adventure Logo"
            width={250}
            height={250}
            className="object-contain animate-pulse"
          />
        </div>
      )}

      <div className="md:hidden">
        <PartnerHistoricMobile activities={renderActivities} />
      </div>
      <div className="hidden md:block">
        <PartnerActivitiesHistoric
          activities={renderActivities}
          withDate
          withOptions
        />
      </div>
    </main>
  );
}
