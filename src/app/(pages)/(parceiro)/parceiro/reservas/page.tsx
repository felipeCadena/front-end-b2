"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import MyButton from "@/components/atoms/my-button";
import PATHS from "@/utils/paths";
import ModalAlert from "@/components/molecules/modal-alert";
import { useAlert } from "@/hooks/useAlert";
import PartnerActivitiesHistoric from "@/components/organisms/partner-activities-historic";
import { MyFullCalendarMultiple } from "@/components/molecules/my-full-calendar-multiple";
import { useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { partnerService } from "@/services/api/partner";
import PartnerHistoricMobile from "@/components/organisms/partner-historic-mobile";
import Image from "next/image";
import { Pagination } from "@/components/molecules/pagination";
import { isCancel } from "axios";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";

export default function Reservas() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date | null>(null);
  const [dates, setDates] = React.useState<Date[]>([]);
  const [page, setPage] = React.useState(1);

  const [params, setParams] = React.useState({
    isCanceled: false,
    isAvailable: true,
  });

  const { handleClose, isModalOpen } = useAlert();

  const { data: parterSchedules, isLoading } = useQuery({
    queryKey: ["parterSchedules", date, page, params],
    queryFn: () =>
      partnerService.getMySchedules({
        limit: 50,
        skip: page * 50 - 50,
        qntConfirmedPersons: "> 0",
        ...params,
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
            onClick={() => router.push(PATHS["atividades-cadastradas"])}
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
        </div>
      </div>
      <div className="relative px-2">
        <MyFullCalendarMultiple
          // mode="single"
          preventPastNavigation
          selected={date ?? new Date()}
          onSelect={setDate}
          markedDates={dates}
          locale={ptBR}
          className="capitalize"
          required
        />
      </div>

      <div className="h-1 w-1/3 mx-auto bg-gray-200 rounded-xl my-6" />

      {date && (
        <div className="flex justify-end max-sm:justify-center max-sm:gap-4 max-sm:px-4 mb-2">
          <MyButton
            variant="outline-neutral"
            borderRadius="squared"
            size="lg"
            className="max-sm:w-full"
            onClick={() => setDate(null)}
          >
            Mostrar todas as datas
          </MyButton>
        </div>
      )}

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

      <div className="my-4 mx-4 w-1/3 md:w-1/6 ml-auto">
        <MySelect
          className="text-base text-black"
          value={params.isCanceled ? "cancelado" : "agendado"}
          onValueChange={(value) =>
            setParams({
              ...params,
              isCanceled: value === "cancelado",
              isAvailable: value === "agendado",
            })
          }
        >
          <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="agendado">Agendado</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </MySelect>
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

      {renderActivities?.length === 0 && !isLoading && (
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
      <div className="flex w-full justify-center items-center my-16">
        <Pagination
          setPage={setPage}
          page={page}
          limit={50}
          data={renderActivities ?? []}
        />
      </div>
    </main>
  );
}
