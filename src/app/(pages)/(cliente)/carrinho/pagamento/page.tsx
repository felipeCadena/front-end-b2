'use client';

import MyButton from '@/components/atoms/my-button';
import MyCheckbox from '@/components/atoms/my-checkbox';
import { MyForm } from '@/components/atoms/my-form';
import MyIcon, { IconsMapTypes } from '@/components/atoms/my-icon';
import MySpinner from '@/components/atoms/my-spinner';
import MyTypography from '@/components/atoms/my-typography';
import CardPaymentOption from '@/components/organisms/card-payment-option';
import PreOrderForm from '@/components/organisms/pre-order-form';
import { cn } from '@/utils/cn';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { ordersAdventuresService } from '@/services/api/orders';
import { users } from '@/services/api/users';
import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import { useFinishPayment } from '@/store/useFinishPayment';
import PATHS from '@/utils/paths';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ModalAlert from '@/components/molecules/modal-alert';

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
      phone: z
        .string()
        .optional()
        .nullable()
        .transform((v) => v ?? ''),
      mobilePhone: z.string().optional(),
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
  paymentMethod: 'PIX',
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
    addressComplement: null,
    phone: '4738010919',
    mobilePhone: '',
  },
};

export type FormData = z.infer<typeof formSchema>;

const PagamentoMobile = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>('PIX');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentMadeWithCard, setIsPaymentMadeWithCard] = useState(false);
  const router = useRouter();
  const { addToPaymentStore } = useFinishPayment();
  const queryClient = useQueryClient();

  const installmentsAvailable =
    process.env.NEXT_PUBLIC_B2_ENABLED_INSTALLMENT_PAY ?? 1;

  const handleCardPaymentModal = () => {
    router.push(PATHS.agenda);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentMadeWithCard(false);
    router.push(PATHS.atividades);
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { carts, clearCart } = useCart();

  const { data: loggedUser } = useQuery({
    queryKey: ['logged_user'],
    queryFn: () => users.getUserLogged(),
  });

  const { data: userIP = '' } = useQuery({
    queryKey: ['user_ip_address'],
    queryFn: () => users.getIP(),
  });

  const userId = loggedUser?.id ?? '';

  const userCart = carts.find((cart) => cart.userId === userId);

  const purchaseOrder = userCart?.cart.map((item) => {
    if (item) {
      const [hour, minute] = item.schedule.scheduleTime.split(':');
      const scheduleDate = new Date(item.schedule.scheduleDate as Date);
      scheduleDate.setHours(Number(hour));
      scheduleDate.setMinutes(Number(minute));

      const formatOrder = {
        adventureId: item.adventure.id,
        scheduleDate,
        qntAdults: item.schedule.qntAdults,
        qntChildren: item.schedule.qntChildren,
        qntBabies: item.schedule.qntBabies,
      };
      return formatOrder;
    }
  });

  useQuery({
    queryKey: [purchaseOrder],
    queryFn: () => {
      if (Number(installmentsAvailable) > 1) {
        setIsModalOpen(true);
      }
      return purchaseOrder ?? [];
    },
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
          ...paymentDefaultValues.creditCardHolderInfo,
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
    setIsLoading(true);
    const formattedOrder = {
      ...formData,
      installmentCount: Number(formData.installmentCount),
      creditCard: {
        ...formData.creditCard,
        number: formData.creditCard?.number?.replaceAll(' ', ''),
      },
      creditCardHolderInfo: {
        ...formData.creditCardHolderInfo,
        cpfCnpj: formData.creditCardHolderInfo?.cpfCnpj
          .replaceAll('-', '')
          .replaceAll('/', '')
          .replaceAll('.', '')
          .replaceAll(' ', ''),
        postalCode: formData.creditCardHolderInfo?.postalCode.replaceAll(
          '.',
          ''
        ),
      },
    };

    try {
      if (selectedPayment === 'BOLETO' || selectedPayment === 'PIX') {
        const { data } = await ordersAdventuresService.create(
          formattedOrder,
          userIP
        );
        queryClient.invalidateQueries({
          queryKey: ['unread_notifications'],
        });
        if (selectedPayment === 'PIX') {
          addToPaymentStore({
            id: data.db.id,
            paymentMethod: data.db.paymentMethod,
            paymentStatus: data.db.paymentStatus,
            bankSlipUrl: data.db.bankSlipUrl,
            dueDate: data.db.dueDate,
            pixDueDate: data.pixResponse.expirationDate,
            qrCode: data.pixResponse.encodedImage,
            pixCopyPaste: data.pixResponse.payload,
          });
        }
        if (selectedPayment === 'BOLETO') {
          addToPaymentStore({
            id: data.db.id,
            paymentMethod: data.db.paymentMethod,
            paymentStatus: data.db.paymentStatus,
            bankSlipUrl: data.db.bankSlipUrl,
            dueDate: data.db.dueDate,
          });
        }
        clearCart(userId);
        toast.success('Pedido enviado com sucesso!');
        router.push(`/finalizar-compra/${data.db.id}`);
        return data;
      }

      await ordersAdventuresService.create(formattedOrder, userIP);
      toast.success('Pedido enviado com sucesso!');
      clearCart(userId);
      queryClient.invalidateQueries({
        queryKey: ['unread_notifications'],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.error('Token inválido ou expirado. Faça login novamente.');
          console.error(error);
          return;
        } else {
          toast.error(error.response?.data.message);
          console.error(error);
          return;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPaymentOption = (paymentName: string) => {
    setSelectedPayment(paymentName);
    form.setValue('paymentMethod', paymentName);
  };

  return (
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
          <div className="my-4 px-4 md:px-0">
            <MyTypography variant="subtitle4" weight="bold">
              Selecione o método de pagamento:
            </MyTypography>
          </div>
          <div className={cn('flex flex-col gap-4 mb-4 px-4 md:px-0')}>
            {payments.map((payment) => (
              <MyButton
                key={payment.name}
                variant="payment"
                type="button"
                borderRadius="squared"
                className={cn(
                  'flex justify-between p-4 md:max-w-[200px]',
                  selectedPayment === payment.name &&
                    'bg-primary-900 opacity-100 border border-primary-600'
                )}
                size="lg"
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
                'mt-6 md:mt-4 col-start-2 px-4',
                selectedPayment === 'CREDIT_CARD' &&
                  'md:col-span-2 md:col-start-2'
              )}
            >
              {isLoading ? (
                <MyButton
                  variant="default"
                  borderRadius="squared"
                  size="lg"
                  type="button"
                  className="my-4 w-full flex justify-center items-center"
                >
                  <MySpinner />
                </MyButton>
              ) : (
                <MyButton
                  variant="default"
                  borderRadius="squared"
                  size="lg"
                  type="submit"
                  className="my-4 w-full"
                >
                  Finalizar compra
                </MyButton>
              )}
            </div>
          )}
        </form>
      </MyForm>
      <ModalAlert
        open={isPaymentMadeWithCard}
        onClose={handleClosePaymentModal}
        onAction={handleCardPaymentModal}
        button="Ver na agenda"
        title="Atividade agendada"
        descrition="Parabéns! Sua atividade foi agendada com nosso parceiro e ja estamos cuidando de tudo, enquanto isso já vai se preparando para uma experiência inesquecível!"
        iconName="sucess"
      />
      <ModalAlert
        open={isModalOpen}
        onClose={handleModal}
        onAction={handleModal}
        button="Fechar"
        title="Atenção!"
        descrition="Não será aceito parcelamento para pagamento de mais de uma atividade."
        iconName="atention"
      />
    </div>
  );
};

export default PagamentoMobile;
