'use client';

import Loading from '@/app/loading';
import MyTypography from '@/components/atoms/my-typography';
import ActivityPhotoGalleryCard from '@/components/organisms/activity-photo-gallery-card';
import { ordersAdventuresService } from '@/services/api/orders';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function GaleriaDeFotos() {
  const [selected, setSelected] = useState('');

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () =>
      ordersAdventuresService.getCustomerSchedules({
        adventureStatus: 'realizado',
      }),
  });

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center mb-16">
      <Loading />
    </div>
  ) : (
    <section className="space-y-12 mb-10">
      {activities && activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityPhotoGalleryCard
            activity={activity}
            selected={selected}
            setSelected={setSelected}
          />
        ))
      ) : (
        <div className="w-full flex justify-center items-center h-[100%] md:h-[30vh]">
          <MyTypography variant="subtitle3" weight="bold">
            Você ainda não possui atividades realizadas
          </MyTypography>
        </div>
      )}
    </section>
  );
}
