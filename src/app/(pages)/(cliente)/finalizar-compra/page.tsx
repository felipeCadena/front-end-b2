'use client';

import MyButton from '@/components/atoms/my-button';
import MyCheckbox from '@/components/atoms/my-checkbox';
import MyIcon, { IconsMapTypes } from '@/components/atoms/my-icon';
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/my-select';
import MyTextInput from '@/components/atoms/my-text-input';
import MyTypography from '@/components/atoms/my-typography';

import ActivitiesDetails from '@/components/organisms/activities-details';
import ActivitiesOrderSummary from '@/components/organisms/activities-order-summary';
import { Card } from '@/components/organisms/card';

import ShoppingDetails from '@/components/organisms/shopping-details';
import { useCart } from '@/store/useCart';
import { cn } from '@/utils/cn';
import PATHS from '@/utils/paths';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function FinalizarCompra() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [value, setValue] = React.useState<string>('');

  const { carts } = useCart();
  const session = useSession();
  const userId = session.data?.user.id ?? '';

  const userCart = carts.find((cart) => cart.userId === userId);

  const payments: { name: string; icon: IconsMapTypes }[] = [
    {
      name: 'Pix',
      icon: 'pix',
    },
    {
      name: 'Boleto',
      icon: 'boleto',
    },
    {
      name: 'Cartão de crédito',
      icon: 'card',
    },
  ];

  return (
    <section className="px-4">
      <div className="flex gap-4 items-center max-sm:hidden">
        <MyIcon
          name="voltar-black"
          className="-ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Finalizar Pedido
        </MyTypography>
      </div>

      <div className="flex gap-4 items-center md:hidden">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Pagamento de atividades
        </MyTypography>
      </div>

      <div className="max-sm:hidden md:flex md:flex-col md:gap-2">
        {userCart &&
          (userCart.cart.length > 0 ? (
            <ActivitiesOrderSummary activities={userCart?.cart ?? []} />
          ) : (
            <div className="flex justify-center w-full my-20">
              <MyTypography weight="bold" variant="heading3">
                Carrinho vazio
              </MyTypography>
            </div>
          ))}

        <div className="col-span-2 space-y-16">
          <div className="flex gap-4 items-center end">
            <MyButton
              variant="outline-neutral"
              borderRadius="squared"
              size="lg"
              className="w-full font-bold text-[1rem]"
              leftIcon={<MyIcon name="add" />}
              onClick={() => router.push(PATHS.atividades)}
            >
              Adicionar mais atividades
            </MyButton>
            <MyButton
              variant="default"
              borderRadius="squared"
              size="lg"
              className="md:hidden w-full max-sm:mt-6"
              onClick={() => router.push(PATHS['finalizar-compra'])}
            >
              Finalizar Pedido
            </MyButton>

            <MyButton
              variant="default"
              borderRadius="squared"
              size="lg"
              className="max-sm:hidden w-full max-sm:mt-6"
              // onClick={() => router.push(PATHS["finalizar-compra"])}
            >
              Ir para o pagamento
            </MyButton>
          </div>
        </div>
      </div>

      <div className="md:my-16">
        <MyTypography
          variant="subtitle2"
          weight="bold"
          className="mb-4 hidden md:block"
        >
          Método de pagamento
        </MyTypography>

        <div
          className={cn(
            'md:grid md:items-center',
            selectedPayment?.includes('Cartão')
              ? 'md:grid-cols-3 md:gap-6'
              : 'md:grid-cols-2 md:gap-8'
          )}
        >
          <div className={cn('flex flex-col space-y-8 mt-4')}>
            {payments.map((payment) => (
              <MyButton
                key={payment.name}
                variant="payment"
                borderRadius="squared"
                className={cn(
                  'flex justify-between',
                  selectedPayment === payment.name &&
                    'bg-primary-900 opacity-100 border border-primary-600'
                )}
                size="md"
                value={selectedPayment}
                rightIcon={<MyIcon name={payment.icon} />}
                onClick={() => setSelectedPayment(payment.name)}
              >
                {payment.name}
              </MyButton>
            ))}
          </div>

          {selectedPayment?.includes('Cartão') ? (
            <div className="max-sm:mt-8 md:flex md:flex-row-reverse md:items-center md:gap-8 md:col-span-2">
              <Card />

              <div className="max-sm:mt-4 space-y-4 md:w-[90%]">
                <MyTextInput
                  label="Nome impresso no cartão"
                  placeholder="Seu nome"
                  className="mt-2"
                  noHintText
                />

                <MyTextInput
                  label="Número do cartão"
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="mt-2"
                  noHintText
                  rightIcon={<MyIcon name="master" className="-ml-4 mt-5" />}
                />

                <MySelect value={value} onValueChange={setValue}>
                  <SelectTrigger className="py-6">
                    <SelectValue placeholder="Selecione o número de parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 4 }, (_, i) => (
                      <SelectItem key={i} value={String(i + 1)}>
                        {i + 1}x
                      </SelectItem>
                    ))}
                  </SelectContent>
                </MySelect>

                <div className="flex gap-4">
                  <MyTextInput
                    label="Vencimento"
                    placeholder="XX/XXXX"
                    className="mt-1"
                    noHintText
                  />

                  <MyTextInput
                    label="Código"
                    placeholder="XXX"
                    className="mt-1"
                    noHintText
                  />
                </div>
              </div>
            </div>
          ) : (
            selectedPayment && (
              <div className="space-y-4 max-sm:my-10 md:w-full">
                <MyTextInput
                  label="Nome Completo"
                  placeholder="Seu nome"
                  className="mt-2"
                  noHintText
                />

                <MyTextInput
                  label="E-mail"
                  placeholder="b2adventure@gmail.com"
                  className="mt-2"
                  noHintText
                />
                <div className="flex max-sm:flex-col gap-4 md:mt-4">
                  <MyTextInput
                    label="Telefone"
                    placeholder="(XX) XXXXX-XXXX"
                    className="mt-2"
                    noHintText
                  />

                  <MyTextInput
                    label="CPF"
                    placeholder="XXX.XXX.XXX-XX"
                    className="mt-2"
                    noHintText
                  />
                </div>
              </div>
            )
          )}
          {selectedPayment && (
            <div
              className={cn(
                'mt-6 md:mt-4 col-start-2',
                selectedPayment === 'Cartão de crédito' &&
                  'md:col-span-2 md:col-start-2'
              )}
            >
              <MyCheckbox
                className=""
                label="Salvar os dados para a próxima compra"
              />
              <MyButton
                variant="default"
                borderRadius="squared"
                size="lg"
                className="my-4 w-full"
                onClick={() => {}}
              >
                Finalizar compra
              </MyButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
