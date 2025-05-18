'use client';

import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import ActivitiesPhotos from '@/components/organisms/activities-photos';
import { schedules } from '@/services/api/schedules';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { addMonths, addYears } from 'date-fns';
import {
  MySelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/atoms/my-select';

export default function Marketing() {
  const router = useRouter();

  const today = new Date();
  const actualYear = today.getFullYear();
  const actualMonth = today.getMonth();

  const [selectedMonth, setSelectedMonth] = useState(String(actualMonth + 1));

  const thisYear = new Date(actualYear, Number(selectedMonth) - 1, 1);

  const addMonth = addMonths(thisYear, 1);

  const { data: activities = [] } = useQuery({
    queryKey: ['medias_posted', selectedMonth],
    queryFn: () =>
      schedules.getSchedules({
        dateMediasPosted: 'not null',
        startDate: thisYear.toISOString(),
        endDate: addMonth.toISOString(),
      }),
  });

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

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

      <div className="ml-auto w-full h-[100px]">
        <MySelect value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {months.map((month, i) => (
              <SelectItem key={i} value={`${i + 1}`}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </MySelect>
      </div>

      <ActivitiesPhotos activities={activities.data} admin />
    </main>
  );
}
