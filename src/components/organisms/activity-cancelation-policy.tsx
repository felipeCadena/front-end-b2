import { formatPrice } from '@/utils/formatters';
import React from 'react';
import MyTypography from '../atoms/my-typography';

type ActivityCancelationPolicyProps = {
  priceAdult: string | undefined;
};

const ActivityCancelationPolicy = ({
  priceAdult,
}: ActivityCancelationPolicyProps) => {
  return (
    <div>
      <div className="my-4">
        <MyTypography variant="subtitle3" weight="bold" className="">
          Política de cancelamento
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="mt-1">
          Este agendamento só será reembolsado se cancelado até 3 dias antes da
          data confirmada.
        </MyTypography>
      </div>

      <div>
        <div className="flex justify-between items-center mt-1">
          <MyTypography variant="subtitle3" weight="bold" className="">
            Valor da atividade:
          </MyTypography>
          <MyTypography
            variant="heading2"
            weight="extrabold"
            className="text-primary-600"
          >
            {formatPrice(priceAdult ?? '')}
          </MyTypography>
        </div>
      </div>
    </div>
  );
};

export default ActivityCancelationPolicy;
