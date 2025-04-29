'use client';

import React from 'react';
import { ptBR } from 'date-fns/locale/pt-BR';
import FullActivitiesHistoric from '@/components/organisms/full-activities-historic';
import { useQuery } from '@tanstack/react-query';
import { ordersAdventuresService } from '@/services/api/orders';
import { MyFullScheduleCalendar } from '@/components/molecules/my-full-schedule-calendar';
import MyTypography from '@/components/atoms/my-typography';
import FullActivitiesHistoricMobile from '@/components/organisms/full-activities-historic-mobile';
import ScheduledActivitiesMobile from '@/components/organisms/scheduled-activities-mobile';

export default function Reservas() {
  const [date, setDate] = React.useState<Date>();

  const { data: schedules } = useQuery({
    queryKey: ['schedules'],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules('2025-01-01T00:00:00-03:00'),
  });

  const lastAdventures = schedules?.filter(
    (sch) => sch.adventureStatus === 'agendado'
  );

  const gatherDates = lastAdventures?.reduce((acc, adventure) => {
    const dateWithoutTime = adventure.schedule.datetime.slice(0, 10);

    const existingScheduleDate = acc.find((date) => dateWithoutTime === date);
    if (!existingScheduleDate) {
      acc.push(dateWithoutTime);
    }

    return acc;
  }, [] as string[]);

  const selectedScheduleActivities = lastAdventures?.filter(
    (act) =>
      act.schedule.datetime.slice(0, 10) === date?.toISOString().slice(0, 10)
  );

  const renderActivities =
    selectedScheduleActivities?.length !== 0
      ? selectedScheduleActivities
      : lastAdventures;

  return (
    <section className="bg-white w-full flex flex-col max-sm:items-center relative">
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
