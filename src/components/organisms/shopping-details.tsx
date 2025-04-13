import React from 'react';
import MyTypography from '../atoms/my-typography';
import MyBadge from '../atoms/my-badge';
import MyIcon from '../atoms/my-icon';
import {
  formatAddress,
  formatPrice,
  formatTime,
  getData,
  getHora,
  handleNameActivity,
} from '@/utils/formatters';
import { AddToCartAdventure, Adventure } from '@/services/api/adventures';

type ShoppingDetailsProps = {
  activity: AddToCartAdventure;
};

export default function ShoppingDetails({ activity }: ShoppingDetailsProps) {
  const { adventure, schedule } = activity;

  const address = {
    addressStreet: adventure.addressStreet,
    addressNumber: adventure.addressNumber,
    addressComplement: adventure.addressComplement,
    addressNeighborhood: adventure.addressNeighborhood,
    addressCity: adventure.addressCity,
    addressState: adventure.addressState,
    addressPostalCode: adventure.addressPostalCode,
    addressCountry: adventure.addressCountry,
  };

  const totalPrice =
    schedule.qntAdults * Number(schedule.pricePerAdult) +
    schedule.qntChildren * Number(schedule.pricePerChildren);

  return (
    <section className="border border-gray-300 md:border-gray-100 rounded-lg my-8 md:my-4">
      <div className="space-y-6">
        <div className="px-6 my-6">
          <MyBadge variant="outline" className="p-1">
            {handleNameActivity(adventure.typeAdventure)}
          </MyBadge>
          <MyTypography variant="subtitle3" weight="bold" className="mt-4">
            {adventure?.title}
          </MyTypography>
        </div>

        <div className="flex items-center gap-2 px-6">
          <MyIcon
            name="localizacaoRedonda"
            className="w-6 h-6 text-primary-900"
          />
          <MyTypography
            variant="body-big"
            weight="regular"
            className="text-center"
          >
            {formatAddress(address)}
          </MyTypography>
        </div>

        <div className="px-6">
          <MyTypography variant="label" weight="bold">
            Política de cancelamento
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            Este agendamento só será reembolsado se cancelado até 3 dias antes
            da data confirmada.
          </MyTypography>
        </div>

        <div className="flex items-center gap-2 px-6 md:p-6 md:mx-6 md:rounded-lg md:bg-gray-500">
          <MyIcon name="duracao" />
          <div>
            <MyTypography variant="label" weight="bold">
              Duração da atividade
            </MyTypography>
            <MyTypography variant="body" weight="regular">
              {adventure?.duration}
            </MyTypography>
          </div>
        </div>
        <div className="max-sm:hidden border-t-[1.5px] border-gray-400/30 mx-6" />
      </div>

      <div className="w-full flex items-center justify-between max-sm:border-t-[1px] max-sm:border-gray-400/30 last:mb-0">
        <div className="flex flex-col p-6">
          <MyTypography
            variant="body-big"
            weight="regular"
            className="md:text-[0.9rem]"
          >
            {schedule.qntAdults} {schedule.qntAdults > 1 ? 'Adultos' : 'Adulto'}{' '}
            x {formatPrice(schedule.pricePerAdult)}
          </MyTypography>
          <MyTypography
            variant="body-big"
            weight="regular"
            className="md:text-[0.9rem]"
          >
            {getData(schedule.scheduleDate.toString())} -{' '}
            {formatTime(schedule.scheduleTime)}
          </MyTypography>
        </div>

        <div className="flex flex-col p-6">
          <MyTypography
            variant="body-big"
            weight="bold"
            className="text-right md:text-[0.9rem]"
          >
            Total:
          </MyTypography>
          <MyTypography
            variant="body-big"
            weight="bold"
            className="md:text-primary-600"
          >
            {formatPrice(totalPrice)}
          </MyTypography>
        </div>
      </div>
    </section>
  );
}
