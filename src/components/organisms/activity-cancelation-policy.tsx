import { formatPrice } from '@/utils/formatters';
import React from 'react';
import MyTypography from '../atoms/my-typography';
import MyIcon from '../atoms/my-icon';
import { WhatsappShareButton } from 'react-share';
import { useParams } from 'next/navigation';
import MyShareButton from '../atoms/my-share-button';

type ActivityCancelationPolicyProps = {
  price: {
    adult: string | undefined;
    children: string | undefined;
  };
  hoursBeforeCancelation: number | undefined;
  address: any;
  duration: string | undefined;
  isChildrenAllowed: boolean;
};

const ActivityCancelationPolicy = ({
  price,
  hoursBeforeCancelation,
  address,
  duration,
  isChildrenAllowed,
}: ActivityCancelationPolicyProps) => {
  const { id } = useParams();
  const hoursToDays = hoursBeforeCancelation ? hoursBeforeCancelation / 24 : 3;
  const frontBaseURL =
    process.env.NEXT_PUBLIC_PROD_URL ?? 'http://localhost:3000';

  const formatHoursToDays = (hoursToD: number | undefined) => {
    if (hoursToD) {
      if (hoursToD > 1) {
        return `${hoursToDays} dias`;
      }

      if (hoursToD === 1) {
        return `${hoursToDays} dia`;
      }

      return `${hoursToDays * 24} horas`;
    }

    return '3 dias';
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="">
        <div>
          <div className="flex justify-start items-center mt-4 bg-slate-100 border-[1px] border-primary-900 rounded-lg  w-fit py-2 px-6">
            <MyIcon name="localizacaoRedonda" />
            <MyTypography className="ml-2">{address}</MyTypography>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex justify-start items-center">
              <MyIcon name="duracao" className="mr-2" />
              <div className="my-8">
                <MyTypography variant="subtitle4" weight="semibold">
                  Duração da atividade:
                </MyTypography>
                <MyTypography>{duration + ' horas'}</MyTypography>
              </div>
            </div>
            <MyShareButton url={`${frontBaseURL}/atividades/atividade/${id}`} />
          </div>
        </div>
      </div>
      <div>
        <MyTypography variant="subtitle3" weight="bold" className="">
          Política de cancelamento
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="mt-1">
          {`
            Este agendamento só será reembolsado se cancelado até ${formatHoursToDays(hoursToDays)} antes da
          data confirmada.
          `}
        </MyTypography>
      </div>

      <div className="mt-8 md:mt-16">
        <div className="flex justify-between items-center mt-1">
          <MyTypography
            variant="subtitle3"
            weight="bold"
            className="text-sm md:text-md"
          >
            Valor da atividade por adulto:
          </MyTypography>

          <MyTypography
            variant="heading2"
            weight="extrabold"
            className="text-primary-600 text-lg md:text-2xl"
          >
            {formatPrice(price?.adult ?? '')}
          </MyTypography>
        </div>
        {isChildrenAllowed && (
          <div className="flex justify-between items-center mt-4">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-sm md:text-md"
            >
              Crianças de 4 a 12 anos:
            </MyTypography>
            <MyTypography
              variant="heading2"
              weight="extrabold"
              className="text-primary-600 text-lg md:text-2xl"
            >
              {formatPrice(price?.children ?? '')}
            </MyTypography>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCancelationPolicy;
