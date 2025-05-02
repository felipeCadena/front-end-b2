'use client';

import MyTypography from '@/components/atoms/my-typography';
import ActivitiesFilter from '@/components/organisms/activities-filter';
import React from 'react';
import CarouselCustom from './carousel-custom';
import { useQuery } from '@tanstack/react-query';
import { adventures as adventuresService } from '@/services/api/adventures';
import useAdventures from '@/store/useAdventure';
import { handleNameActivity } from '@/utils/formatters';
import Loading from '@/app/loading';

export default function SecondSection() {
  const [selected, setSelected] = React.useState<'ar' | 'terra' | 'mar' | ''>(
    ''
  );
  const {
    setAdventures,
    adventures,
    searchedAdventures,
    setSearchedAdventures,
  } = useAdventures();

  // adventures
  const { isLoading } = useQuery({
    queryKey: ['adventures', selected],
    queryFn: async () => {
      const filterAdventures = await adventuresService.filterAdventures({
        typeAdventure: selected ? selected : undefined,
      });

      setSearchedAdventures(selected);
      setAdventures(filterAdventures);

      return filterAdventures;
    },
  });

  // adventures
  const { data: popularAdventures = [] } = useQuery({
    queryKey: ['popularAdventures'],
    queryFn: async () =>
      await adventuresService.getAdventures({ orderBy: 'qntTotalSales desc' }),
  });

  return isLoading ? (
    <Loading />
  ) : (
    <section className="">
      <ActivitiesFilter selected={selected} setSelected={setSelected} />

      <div className="max-sm:pl-4">
        <MyTypography variant="heading2" weight="semibold" className="mt-8">
          Conheça nossas atividades
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" className="mt-1">
          {handleNameActivity(searchedAdventures)}
        </MyTypography>

        <CarouselCustom
          activities={adventures.map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || '',
          }))}
        />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md md:hidden" />

        <MyTypography variant="heading2" weight="semibold" className="mt-8">
          Sugestões para você!
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" className="mt-1">
          Atividades mais buscadas
        </MyTypography>

        <CarouselCustom
          activities={popularAdventures.map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || '',
          }))}
        />
      </div>
    </section>
  );
}
