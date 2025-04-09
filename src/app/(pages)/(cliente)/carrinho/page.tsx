'use client';

import { activities } from '@/common/constants/mock';
import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import { MyDatePicker } from '@/components/molecules/my-date-picker';
import TimePickerModal from '@/components/molecules/time-picker';
import ActivitiesDetails from '@/components/organisms/activities-details';
import PeopleSelector from '@/components/organisms/people-selector';
import ShoppingDetails from '@/components/organisms/shopping-details';
import PATHS from '@/utils/paths';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Carrinho() {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]); // Estado para armazenar as datas selecionadas
  const [duration, setDuration] = React.useState('');

  const activity = activities.filter((activity) =>
    activity.title.includes('Atividade 2')
  );

  const activityDetails = activities.find((activity) =>
    activity.title.includes('Atividade 1')
  );

  return (
    <section className="mx-4 my-4 -z-10 md:hidden">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className="-ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Carrinho de compras
        </MyTypography>
      </div>
      <ActivitiesDetails activities={activity} />

      <div className="border-t-[1px] border-gray-400/30">
        <MyTypography variant="subtitle3" weight="bold" className="my-4">
          Escolha o dia e horário para realizar a atividade.
        </MyTypography>

        <div className="border space-y-6 border-gray-300 rounded-lg py-8 px-5">
          <MyDatePicker
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />

          <TimePickerModal value={duration} onChange={setDuration} />

          <PeopleSelector />
        </div>
      </div>

      <ShoppingDetails activityDetails={activityDetails} />

      <MyButton
        variant="outline-neutral"
        borderRadius="squared"
        size="lg"
        className="w-full font-bold text-[1rem]"
        onClick={() => router.push(PATHS.atividades)}
      >
        Adicionar mais atividades
      </MyButton>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="lg"
        className="w-full mt-6"
        onClick={() => router.push(PATHS['finalizar-compra'])}
      >
        Finalizar Pedido
      </MyButton>
    </section>
  );
}
