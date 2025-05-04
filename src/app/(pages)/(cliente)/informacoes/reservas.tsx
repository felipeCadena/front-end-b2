'use client';

import React from 'react';
import { ptBR } from 'date-fns/locale/pt-BR';
import FullActivitiesHistoric from '@/components/organisms/full-activities-historic';
import { useQuery } from '@tanstack/react-query';
import { ordersAdventuresService } from '@/services/api/orders';
import { MyFullScheduleCalendar } from '@/components/molecules/my-full-schedule-calendar';
import MyTypography from '@/components/atoms/my-typography';
import ScheduledActivitiesMobile from '@/components/organisms/scheduled-activities-mobile';
import Loading from '@/app/loading';

export default function Reservas() {
  const [date, setDate] = React.useState<Date>();

  const { data: schedules, isLoading } = useQuery({
    queryKey: ['schedules'],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules({
        adventureStatus: 'agendado',
      }),
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

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center mb-16">
      <Loading />
    </div>
  ) : (
    <section className="relative px-2">
      <MyFullScheduleCalendar
        mode="single"
        bookedDates={gatherDates ?? []}
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        className="capitalize"
      />
      <div className="md:hidden">
        {/* <ActivitiesDetails withDate activities={agenda ? agenda : []} /> */}
      </div>

      {renderActivities && renderActivities.length > 0 ? (
        <>
          <div className="max-sm:hidden">
            <FullActivitiesHistoric
              isActivityDone={false}
              withDate
              withOptions
              activities={renderActivities}
            />
          </div>
          <div className="md:hidden">
            <ScheduledActivitiesMobile
              withOptions
              activities={renderActivities}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-[30vh]">
          <MyTypography variant="subtitle3">
            Não há agendamentos disponíveis.
          </MyTypography>
        </div>
      )}
    </section>
  );
}
