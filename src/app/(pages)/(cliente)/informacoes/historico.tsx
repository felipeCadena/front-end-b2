import Loading from '@/app/loading';
import MyTypography from '@/components/atoms/my-typography';
import ActivitiesFilter from '@/components/organisms/activities-filter';
import FullActivitiesHistoric from '@/components/organisms/full-activities-historic';
import FullActivitiesHistoricMobile from '@/components/organisms/full-activities-historic-mobile';
import { ordersAdventuresService } from '@/services/api/orders';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Historico() {
  const [selected, setSelected] = React.useState<'ar' | 'terra' | 'mar' | ''>(
    ''
  );
  // lista as 50 ultimas atividades agendadas

  const { data: schedules, isLoading } = useQuery({
    queryKey: ['schedules'],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules({
        startDate: '2025-04-01T00:00:00-03:00',
        adventureStatus: 'realizado',
      }),
  });

  const filteredActivities = schedules?.filter(
    (sch) => sch.adventure.typeAdventure === selected
  );

  const showHistoricActivities =
    selected === '' ? schedules : filteredActivities;

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center mb-16">
      <Loading />
    </div>
  ) : (
    <section className="w-full">
      <div className="mx-4 space-y-8">
        <div className="md:hidden">{/* <SearchActivity /> */}</div>
        <ActivitiesFilter
          selected={selected}
          setSelected={setSelected}
          withoutText
        />

        {showHistoricActivities && showHistoricActivities.length > 0 ? (
          <>
            <div className="md:hidden">
              <FullActivitiesHistoricMobile
                activities={showHistoricActivities}
              />
            </div>
            <div className="max-sm:hidden">
              <FullActivitiesHistoric
                isActivityDone
                activities={showHistoricActivities}
              />
            </div>
          </>
        ) : (
          <div className="w-full h-[30vh] flex justify-center items-center">
            <MyTypography variant="subtitle3" weight="bold">
              Vocễ não possui histórico de atividades
            </MyTypography>
          </div>
        )}
      </div>
    </section>
  );
}
