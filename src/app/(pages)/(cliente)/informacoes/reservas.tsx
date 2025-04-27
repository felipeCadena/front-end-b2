'use client';

import React from 'react';
import { ptBR } from 'date-fns/locale/pt-BR';
import { MyFullCalendar } from '@/components/molecules/my-full-calendar';
import FullActivitiesHistoric from '@/components/organisms/full-activities-historic';
import { useQuery } from '@tanstack/react-query';
import { ordersAdventuresService } from '@/services/api/orders';

export default function Reservas() {
  const [date, setDate] = React.useState<Date>();

  const { data: schedules } = useQuery({
    queryKey: ['schedules'],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules('2025-04-01T00:00:00-03:00'),
  });

  const lastAdventures = schedules?.filter(
    (sch) => sch.adventureStatus === 'agendado'
  );

  const gatherDates = lastAdventures?.reduce((acc, adventure) => {
    const dateWithoutTime = new Date(
      adventure.schedule.datetime
    ).toLocaleDateString('pt-BR', {
      dateStyle: 'short',
    });
    const existingScheduleDate = acc.find((date) => dateWithoutTime === date);
    if (!existingScheduleDate) {
      acc.push(dateWithoutTime);
    }

    return acc;
  }, [] as string[]);

  console.log(gatherDates);

  return (
    <section className="bg-white w-full flex flex-col max-sm:items-center relative">
      <MyFullCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        className="capitalize"
      />
      <div className="md:hidden">
        {/* <ActivitiesDetails withDate activities={agenda ? agenda : []} /> */}
      </div>

      <div className="max-sm:hidden">
        <FullActivitiesHistoric
          isActivityDone={false}
          withDate
          activities={lastAdventures}
        />
      </div>
    </section>
  );
}
