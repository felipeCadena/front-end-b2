import { handleNameActivity } from '@/utils/formatters';
import React from 'react';
import MyBadge from '../atoms/my-badge';
import User from '../atoms/my-icon/elements/user';
import MyTypography from '../atoms/my-typography';
import StarRating from '../molecules/my-stars';
import { Adventure } from '@/services/api/adventures';
import Image from 'next/image';

type ActivityHeaderProps = {
  activity: Adventure | undefined;
};

const ActivityHeader = ({ activity }: ActivityHeaderProps) => {
  return (
    <div className="max-sm:hidden flex flex-col my-8">
      <div className="flex items-start gap-8">
        <div>
          <MyTypography variant="heading2" weight="bold" className="">
            {activity?.title}
          </MyTypography>
          <MyBadge variant="outline" className="p-1">
            {handleNameActivity(activity?.typeAdventure as string)}
          </MyBadge>
        </div>

        <div className="space-y-4">
          <StarRating rating={activity?.averageRating ?? 0} />
        </div>
      </div>
      <div className="flex gap-4 mt-4 max-sm:hidden">
        {activity?.partner?.logo ? (
          <Image
            alt="avatar"
            src={activity?.partner.logo.url ?? '/user.png'}
            width={40}
            height={40}
            className="w-[40px] h-[40px] rounded-full object-cover border-2"
          />
        ) : (
          <div className="flex justify-center items-center rounded-full bg-primary-900 w-10">
            <User fill="#000" />
          </div>
        )}

        <div>
          <MyTypography variant="label" weight="semibold">
            {activity?.partner?.fantasyName}
          </MyTypography>
          <MyTypography variant="label" weight="regular" lightness={400}>
            Parceiro e Guia de atividades
          </MyTypography>
        </div>
      </div>

      <div className="mt-4">
        <MyTypography variant="subtitle3" weight="bold" className="">
          Descrição da atividade:
        </MyTypography>
        <MyTypography variant="body-big" weight="regular" className="mt-1">
          {activity?.description}
        </MyTypography>
      </div>
    </div>
  );
};

export default ActivityHeader;
