"use client";

import React from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import FullActivitiesHistoric from "@/components/organisms/full-activities-historic";
import { useQuery } from "@tanstack/react-query";
import { ordersAdventuresService } from "@/services/api/orders";
import { MyFullScheduleCalendar } from "@/components/molecules/my-full-schedule-calendar";
import MyTypography from "@/components/atoms/my-typography";
import ScheduledActivitiesMobile from "@/components/organisms/scheduled-activities-mobile";
import { chatService } from "@/services/api/chats";
import { Pagination } from "@/components/molecules/pagination";
import MyButton from "@/components/atoms/my-button";

export default function Reservas() {
  const [date, setDate] = React.useState<Date>();
  const [page, setPage] = React.useState(1);

  const { data: schedules, isLoading } = useQuery({
    queryKey: ["schedules", page],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules({
        adventureStatus: "agendado",
        limit: 30,
        skip: page * 30 - 30,
      }),
  });

  const { data: chat } = useQuery({
    queryKey: ["chat"],
    queryFn: () => chatService.getMyChats({ isAvailable: true }),
  });

  const gatherDates = schedules?.reduce((acc, adventure) => {
    const dateWithoutTime = adventure.schedule.datetime.slice(0, 10);

    const existingScheduleDate = acc.find((date) => dateWithoutTime === date);
    if (!existingScheduleDate) {
      acc.push(dateWithoutTime);
    }

    return acc;
  }, [] as string[]);

  const selectedScheduleActivities = schedules?.filter(
    (act) =>
      act.schedule.datetime.slice(0, 10) === date?.toISOString().slice(0, 10)
  );

  const renderActivities =
    selectedScheduleActivities?.length !== 0
      ? selectedScheduleActivities
      : schedules;

  return (
    <section className="relative px-2 mb-6">
      <MyFullScheduleCalendar
        preventPastNavigation
        mode="single"
        bookedDates={gatherDates ?? []}
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        className="capitalize"
      />

      {date && (
        <div className="flex justify-end mt-6">
          <MyButton
            variant="outline-neutral"
            borderRadius="squared"
            size="lg"
            className="max-sm:w-full"
            onClick={() => setDate(undefined)}
          >
            Mostrar todas as datas
          </MyButton>
        </div>
      )}

      {renderActivities && renderActivities.length > 0 ? (
        <>
          <div className="max-sm:hidden">
            <FullActivitiesHistoric
              isActivityDone={false}
              withDate
              withOptions
              activities={renderActivities}
              chat={chat}
            />
          </div>
          <div className="md:hidden">
            <ScheduledActivitiesMobile
              withOptions
              activities={renderActivities}
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <Pagination
              setPage={setPage}
              page={page}
              limit={30}
              data={renderActivities ?? []}
            />
          </div>
        </>
      ) : (
        !isLoading && (
          <div className="flex justify-center items-center w-full h-[30vh]">
            <MyTypography variant="subtitle3">
              Não há agendamentos disponíveis.
            </MyTypography>
          </div>
        )
      )}
    </section>
  );
}
