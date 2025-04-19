'use client';

import MyButton from '@/components/atoms/my-button';
import MyCheckbox from '@/components/atoms/my-checkbox';
import MyIcon, { IconsMapTypes } from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import ActivitiesOrderSummary from '@/components/organisms/activities-order-summary';
import CardPaymentOption from '@/components/organisms/card-payment-option';
import PreOrderForm from '@/components/organisms/pre-order-form';
import { useCart } from '@/store/useCart';
import { cn } from '@/utils/cn';
import PATHS from '@/utils/paths';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MyForm } from '@/components/atoms/my-form';
import { ordersAdventuresService } from '@/services/api/orders';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { users } from '@/services/api/users';

const formSchema = z.object({
  paymentMethod: z.string().optional(),
  installmentCount: z.string().optional(),
  creditCard: z
    .object({
      holderName: z.string().trim().optional(),
      number: z.string().trim().optional(),
      expiryMonth: z.string().optional(),
      expiryYear: z.string().optional(),
      ccv: z.string().optional(),
    })
    .optional(),
  creditCardHolderInfo: z
    .object({
      name: z.string().trim(),
      email: z.string().email().trim(),
      cpfCnpj: z.string(),
      postalCode: z.string(),
      addressNumber: z.string().optional(),
      addressComplement: z.string().nullable().optional(),
      phone: z.string().optional(),
      mobilePhone: z.string(),
    })
    .optional(),
  adventures: z
    .array(
      z.object({
        adventureId: z.number(),
        scheduleDate: z.date(),
        qntAdults: z.number(),
        qntChildren: z.number(),
        qntBabies: z.number(),
      })
    )
    .optional(),
});

const paymentDefaultValues = {
  paymentMethod: '',
  installmentCount: '1',
  creditCard: {
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
  },
  creditCardHolderInfo: {
    name: '',
    email: '',
    cpfCnpj: '',
    postalCode: '',
    addressNumber: '000',
    addressComplement: '',
    phone: '4738010919',
    mobilePhone: '',
  },
};

export type FormData = z.infer<typeof formSchema>;

export default function FinalizarCompra() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  const { carts } = useCart();

  const { data: loggedUser } = useQuery({
    queryKey: ['logged_user'],
    queryFn: () => users.getUserLogged(),
  });

  const userId = loggedUser?.id ?? '';

  const userCart = carts.find((cart) => cart.userId === userId);

  const purchaseOrder = userCart?.cart.map((item) => {
    if (item) {
      const formatOrder = {
        adventureId: item.adventure.id,
        scheduleDate: new Date(item.schedule.scheduleDate as Date),
        qntAdults: item.schedule.qntAdults,
        qntChildren: item.schedule.qntChildren,
        qntBabies: item.schedule.qntBabies,
      };
      return formatOrder;
    }
  });

  const payments: { name: string; label: string; icon: IconsMapTypes }[] = [
    {
      name: 'PIX',
      label: 'Pix',
      icon: 'pix',
    },
    {
      name: 'BOLETO',
      label: 'Boleto',
      icon: 'boleto',
    },
    {
      name: 'CREDIT_CARD',
      label: 'Cartão de crédito',
      icon: 'card',
    },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...paymentDefaultValues,
      paymentMethod: selectedPayment,
    },
  });

  useEffect(() => {
    if (purchaseOrder && loggedUser) {
      form.reset({
        ...paymentDefaultValues,
        creditCardHolderInfo: {
          name: loggedUser.name,
          email: loggedUser.email,
          phone: loggedUser.phone,
          cpfCnpj: loggedUser.cpf,
          mobilePhone: loggedUser.phone,
        },
        adventures: purchaseOrder,
      });
    }
  }, [userId]);

  const handleSubmit = async (formData: FormData) => {
    try {
      if (selectedPayment === 'BOLETO' || selectedPayment === 'PIX') {
        await ordersAdventuresService.create(purchaseOrder);
        toast.success('Pedido enviado!');
        return console.log('Enviado');
      }

      await ordersAdventuresService.create(formData);
    } catch (error) {
      toast.error('Um erro inesperado ocorreu!');
      console.error(error);
    }
  };

  const handleSelectPaymentOption = (paymentName: string) => {
    setSelectedPayment(paymentName);
    form.setValue('paymentMethod', paymentName);
  };

  console.log(form.formState.errors);

  return (
    <section className="px-4 mb-8">
      <div className="flex gap-4 items-center max-sm:hidden">
        <MyIcon
          name="voltar-black"
          className="-ml-2 cursor-pointer"
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
              onClick={() => setIsReadyToPay((prev) => !prev)}
            >
              Ir para o pagamento
            </MyButton>
          </div>
        </div>
      </div>

      {isReadyToPay && (
        <div className="md:my-16">
          <MyTypography
            variant="subtitle2"
            weight="bold"
            className="mb-4 hidden md:block"
          >
            Informações de pagamento
          </MyTypography>

          <MyForm {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className={cn('md:flex md:flex-col md:w-full')}
            >
              <PreOrderForm form={form} />
              <div className="my-4">
                <MyTypography variant="subtitle4" weight="bold">
                  Selecione o método de pagamento:
                </MyTypography>
              </div>
              <div className={cn('flex gap-4 mb-4')}>
                {payments.map((payment) => (
                  <MyButton
                    key={payment.name}
                    variant="payment"
                    type="button"
                    borderRadius="squared"
                    className={cn(
                      'flex justify-between md:max-w-[200px]',
                      selectedPayment === payment.name &&
                        'bg-primary-900 opacity-100 border border-primary-600'
                    )}
                    size="md"
                    value={selectedPayment}
                    rightIcon={<MyIcon name={payment.icon} />}
                    onClick={() => handleSelectPaymentOption(payment.name)}
                  >
                    {payment.label}
                  </MyButton>
                ))}
              </div>

              {selectedPayment === 'CREDIT_CARD' && (
                <CardPaymentOption
                  userCart={userCart ? userCart.cart : []}
                  form={form}
                />
              )}

              {selectedPayment && (
                <div
                  className={cn(
                    'mt-6 md:mt-4 col-start-2',
                    selectedPayment === 'CREDIT_CARD' &&
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
                    type="submit"
                    className="my-4 w-full"
                  >
                    Finalizar compra
                  </MyButton>
                </div>
              )}
            </form>
          </MyForm>
        </div>
      )}
    </section>
  );
}
