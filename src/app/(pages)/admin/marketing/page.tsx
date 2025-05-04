'use client';

import { activities } from '@/common/constants/mock';
import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import ActivitiesPhotos from '@/components/organisms/activities-photos';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Marketing() {
  const router = useRouter();
  return (
    <main className="px-4 space-y-4 md:my-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Marketing
        </MyTypography>
      </div>

      <ActivitiesPhotos activities={activities} admin />
    </main>
  );
}
