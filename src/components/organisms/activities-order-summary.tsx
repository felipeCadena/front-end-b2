import React from 'react';

import Image from 'next/image';
import MyBadge from '../atoms/my-badge';
import StarRating from '../molecules/my-stars';
import MyTypography from '../atoms/my-typography';
import MyIcon from '../atoms/my-icon';
import {
  formatPrice,
  formatTime,
  getData,
  handleNameActivity,
  selectActivityImage,
} from '@/utils/formatters';
import { useRouter } from 'next/navigation';
import PATHS from '@/utils/paths';
import { AddToCartAdventure } from '@/services/api/adventures';
import MyButton from '../atoms/my-button';
import { useCart } from '@/store/useCart';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

type ActivitiesOrderSummaryProps = {
  activities: AddToCartAdventure[];
};

const ActivitiesOrderSummary = ({
  activities,
}: ActivitiesOrderSummaryProps) => {
  const router = useRouter();
  const session = useSession();
  const { removeFromCart } = useCart();

  const handleRemoveActivity = (id: number) => {
    const userId = session.data?.user.id;

    if (userId) {
      removeFromCart(id, userId);
      toast.success('Atividade removida do carrinho!');
    } else {
      toast.error('Token expirado!');
    }
  };

  return (
    <section>
      {activities &&
        activities.map(({ adventure, schedule }, index: number) => (
          <div className="grid grid-cols-4 gap-4 mt-8 mb-16" key={index}>
            <div className="col-span-1 relative z-10 overflow-hidden min-w-[8rem] min-h-full hover:cursor-pointer rounded-md">
              <Image
                alt="sample_file"
                src={selectActivityImage(adventure)}
                width={265}
                height={265}
                className="w-[265px] h-[265px] object-cover"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-between gap-2">
              <div className="w-full flex flex-col">
                <div className="flex justify-between items-center w-full mr-4 mb-1">
                  <div className="flex items-center gap-4 ">
                    <MyBadge
                      className="font-medium text-nowrap p-1"
                      variant="outline"
                    >
                      {handleNameActivity(adventure.typeAdventure)}
                    </MyBadge>
                    <StarRating rating={adventure.averageRating} />
                    <div className="flex gap-2 items-center my-1">
                      <Image
                        alt="foto parceiro"
                        src={adventure.partner.logo.url}
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full border-2"
                      />
                      <MyTypography
                        variant="body"
                        weight="medium"
                        className="mt-1 text-nowrap"
                      >
                        {adventure.partner.fantasyName}
                      </MyTypography>
                    </div>
                  </div>
                  <MyButton
                    variant="outline-neutral"
                    className="z-10 ml-auto"
                    onClick={() => handleRemoveActivity(adventure.id)}
                  >
                    <MyIcon name="x-red" className="hover:cursor-pointer" />
                  </MyButton>
                </div>

                <MyTypography variant="subtitle3" weight="bold" className="">
                  {adventure.title}
                </MyTypography>
                <MyTypography variant="label" className="">
                  {adventure.description}
                </MyTypography>
              </div>
              <div
                className="w-full flex flex-col items-center gap-3 p-3 mt-2 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative cursor-pointer"
                onClick={() =>
                  router.push(PATHS.atividadeRealizada(adventure.id))
                }
              >
                <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

                <div className="w-full flex items-center justify-between gap-1 text-nowrap">
                  <div className="flex flex-col">
                    <MyTypography
                      variant="label"
                      weight="bold"
                      className="ml-3"
                    >
                      Data da Atividade
                    </MyTypography>
                    <MyTypography
                      variant="body"
                      weight="regular"
                      className="ml-3"
                    >
                      {getData(schedule.scheduleDate.toString())} -{' '}
                      {formatTime(schedule.scheduleTime)}
                    </MyTypography>
                  </div>

                  <div className="flex items-center gap-1">
                    <MyIcon name="duracao" />
                    <div>
                      <MyTypography variant="label" weight="bold" className="">
                        Duração da atividade
                      </MyTypography>
                      <MyTypography
                        variant="body"
                        weight="regular"
                        className=""
                      >
                        {adventure.duration}
                      </MyTypography>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <MyTypography
                      variant="label"
                      weight="bold"
                      className="ml-3"
                    >
                      Quant. de pessoas
                    </MyTypography>
                    <MyTypography
                      variant="body"
                      weight="regular"
                      className="ml-3"
                    >
                      {schedule.qntAdults}{' '}
                      {schedule.qntAdults > 1 ? 'Adultos' : 'Adulto'} x{' '}
                      {formatPrice(schedule.pricePerAdult)}
                    </MyTypography>
                  </div>

                  <div className="flex flex-col">
                    <MyTypography
                      variant="body-big"
                      weight="bold"
                      className="text-right"
                    >
                      Total:
                    </MyTypography>
                    <MyTypography variant="body" weight="bold" className="">
                      {formatPrice(
                        schedule.qntAdults * Number(schedule.pricePerAdult) +
                          schedule.qntChildren *
                            Number(schedule.pricePerChildren)
                      )}
                    </MyTypography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ActivitiesOrderSummary;
