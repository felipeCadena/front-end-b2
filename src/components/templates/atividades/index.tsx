'use client';

import MyTypography from '@/components/atoms/my-typography';
import ShoppingCard from '@/components/molecules/shopping-card';
import ActivitiesFilter from '@/components/organisms/activities-filter';
import CarouselCustom from '@/components/templates/second-section/carousel-custom';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adventures } from '@/services/api/adventures';
import { useCart } from '@/store/useCart';
import { useSession } from 'next-auth/react';

export default function AtividadesTemplate() {
  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => adventures.getAdventures({ limit: 30, skip: 0 }),
  });

  const { data } = useSession();
  const userId = data?.user.id;

  const { getCartSize } = useCart();

  const cartSize = getCartSize(userId ?? '');

  const filterActivity = (typeAdventure: string) => {
    return (
      activities.filter(
        (activity) => activity.typeAdventure === typeAdventure
      ) ?? []
    );
  };

  return (
    <section className="">
      {/* <SearchActivity /> */}

      <ActivitiesFilter />

      <div className="ml-5 my-8 md:my-16">
        <MyTypography
          variant="heading2"
          weight="semibold"
          className="mb-4 md:text-lg"
        >
          Sugestões para você!
        </MyTypography>
        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50"
        >
          Atividades Aéreas
        </MyTypography>
        <CarouselCustom
          activities={filterActivity('ar').map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || '',
          }))}
        />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividades Terrestres
        </MyTypography>
        <CarouselCustom
          activities={filterActivity('terra').map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || '',
          }))}
        />

        <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

        <MyTypography
          variant="subtitle3"
          weight="regular"
          className="md:opacity-50 md:mt-8"
        >
          Atividades Aquática
        </MyTypography>
        <CarouselCustom
          activities={filterActivity('mar').map((activity) => ({
            ...activity,
            addressComplement: activity.addressComplement || '',
          }))}
        />
      </div>
      <ShoppingCard isMobile={false} items={cartSize} />
      <ShoppingCard isMobile items={cartSize} />
    </section>
  );
}
