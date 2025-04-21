'use client';

import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import MobileActivitiesOrderSummary from '@/components/organisms/mobile-activity-order-summary';
import { users } from '@/services/api/users';
import { useCart } from '@/store/useCart';
import PATHS from '@/utils/paths';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Carrinho() {
  const router = useRouter();
  const session = useSession();

  const userId = session.data?.user.id;

  const { carts } = useCart();
  const userCart = carts.find((cart) => cart.userId === userId);

  const { data = '' } = useQuery({
    queryKey: ['user_ip_address'],
    queryFn: () => users.getIP(),
  });

  console.log('IP --->', data);

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
      <MobileActivitiesOrderSummary activities={userCart?.cart ?? []} />
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
