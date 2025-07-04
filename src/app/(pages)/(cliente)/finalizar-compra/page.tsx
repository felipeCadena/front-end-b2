"use client";

import MyButton from "@/components/atoms/my-button";
import MyCheckbox from "@/components/atoms/my-checkbox";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesOrderSummary from "@/components/organisms/activities-order-summary";
import CardPaymentOption from "@/components/organisms/card-payment-option";
import PreOrderForm from "@/components/organisms/pre-order-form";
import { useCart } from "@/store/useCart";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MyForm } from "@/components/atoms/my-form";
import { ordersAdventuresService } from "@/services/api/orders";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { users } from "@/services/api/users";
import { AxiosError } from "axios";
import MySpinner from "@/components/atoms/my-spinner";
import { useFinishPayment } from "@/store/useFinishPayment";
import ModalAlert from "@/components/molecules/modal-alert";
import {
  formatCpfCnpj,
  formatInstallmentOptions,
  formatPhoneNumber,
  formatPhoneNumberDDI,
} from "@/utils/formatters";
import { useSession } from "next-auth/react";
import CartConflictCheckerWithModal from "@/components/organisms/modal-cart-conflit";

const formSchema = z
  .object({
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
        name: z.string().min(1, { message: "Nome obrigatório." }).trim(),
        email: z.string().email("E-mail inválido!").trim(),
        cpfCnpj: z.string().min(11, {
          message: "Por favor insira um CPF válido",
        }),
        postalCode: z.string(),
        addressNumber: z.string().optional(),
        addressComplement: z.string().nullable().optional(),
        phone: z
          .string()
          .optional()
          .nullable()
          .transform((v) => v ?? ""),
        mobilePhone: z
          .string()
          .min(1, { message: "Telefone obrigatório" })
          .optional(),
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
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "CREDIT_CARD") {
      // Validação dos campos obrigatórios do cartão
      if (!data.creditCard) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Dados do cartão são obrigatórios para pagamento com cartão",
          path: ["creditCard"],
        });
      } else {
        if (
          !data.creditCard.holderName ||
          data.creditCard.holderName.trim() === ""
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Nome do titular é obrigatório",
            path: ["creditCard", "holderName"],
          });
        }
        if (
          !data.creditCard.number ||
          data.creditCard.number.trim().length < 16
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Número do cartão inválido",
            path: ["creditCard", "number"],
          });
        }
        if (!data.creditCard.expiryMonth) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mês é obrigatório",
            path: ["creditCard", "expiryMonth"],
          });
        }
        if (!data.creditCard.expiryYear) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Ano é obrigatório",
            path: ["creditCard", "expiryYear"],
          });
        }
        if (!data.creditCard.ccv || data.creditCard.ccv.trim().length < 3) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "CCV é obrigatório",
            path: ["creditCard", "ccv"],
          });
        }

        if (!data.creditCardHolderInfo?.postalCode?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "CEP é obrigatório para pagamento com cartão",
            path: ["creditCardHolderInfo", "postalCode"],
          });
        }
      }
    }
  });

const paymentDefaultValues = {
  paymentMethod: "PIX",
  installmentCount: "1",
  creditCard: {
    holderName: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    ccv: "",
  },
  creditCardHolderInfo: {
    name: "",
    email: "",
    cpfCnpj: "",
    postalCode: "",
    addressNumber: "000",
    addressComplement: null,
    phone: "4738010919",
    mobilePhone: "",
  },
};

export type PurchaseOrderFormData = z.infer<typeof formSchema>;

export default function FinalizarCompra() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>("PIX");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [isPaymentMadeWithCard, setIsPaymentMadeWithCard] = useState(false);
  const { addToPaymentStore } = useFinishPayment();
  const queryClient = useQueryClient();
  const instamentsAvailable =
    process.env.NEXT_PUBLIC_B2_ENABLED_INSTALLMENT_PAY ?? 1;
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

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
    queryKey: ["logged_user"],
    queryFn: () => users.getUserLogged(),
  });

  const { data: userIP = "" } = useQuery({
    queryKey: ["user_ip_address"],
    queryFn: () => users.getIP(),
  });

  const userCart = carts.find((cart) => cart.userId === userId);

  const purchaseOrder = userCart?.cart.map((item) => {
    if (item) {
      const [hour, minute] = item.schedule.scheduleTime.split(":");
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
      if (
        Number(instamentsAvailable) > 1 &&
        purchaseOrder &&
        purchaseOrder?.length > 1
      ) {
        setIsModalOpen(true);
      }
      return purchaseOrder ?? [];
    },
  });

  const payments: { name: string; label: string; icon: IconsMapTypes }[] = [
    {
      name: "PIX",
      label: "Pix",
      icon: "pix",
    },
    {
      name: "BOLETO",
      label: "Boleto",
      icon: "boleto",
    },
    {
      name: "CREDIT_CARD",
      label: "Cartão de crédito",
      icon: "card",
    },
  ];

  const form = useForm<PurchaseOrderFormData>({
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
          phone: formatPhoneNumberDDI(loggedUser.phone),
          cpfCnpj: formatCpfCnpj(loggedUser.cpf),
          mobilePhone: formatPhoneNumberDDI(loggedUser.phone),
        },
        adventures: purchaseOrder,
      });
    }
  }, [userId, purchaseOrder?.length, loggedUser]);

  const handleSubmit = async (formData: PurchaseOrderFormData) => {
    setIsLoading(true);
    const formattedOrder = {
      ...formData,
      installmentCount: Number(formData.installmentCount),
      creditCard: {
        ...formData.creditCard,
        number: formData.creditCard?.number?.replaceAll(" ", ""),
      },
      creditCardHolderInfo: {
        ...formData.creditCardHolderInfo,
        cpfCnpj: formData.creditCardHolderInfo?.cpfCnpj
          .replaceAll("-", "")
          .replaceAll("/", "")
          .replaceAll(".", "")
          .replaceAll(" ", ""),
        postalCode: formData.creditCardHolderInfo?.postalCode.replaceAll(
          ".",
          ""
        ),
        phone: formData.creditCardHolderInfo?.mobilePhone?.replace(/\D/g, ""),
        mobilePhone: formData.creditCardHolderInfo?.mobilePhone?.replace(
          /\D/g,
          ""
        ),
      },
    };

    try {
      if (selectedPayment === "BOLETO" || selectedPayment === "PIX") {
        const { data } = await ordersAdventuresService.create(
          formattedOrder,
          userIP
        );
        queryClient.invalidateQueries({
          queryKey: ["unread_notifications"],
        });
        if (selectedPayment === "PIX") {
          addToPaymentStore({
            id: data.db.id,
            paymentMethod: data.db.paymentMethod,
            paymentStatus: data.db.paymentStatus,
            bankSlipUrl: data.db.bankSlipUrl,
            dueDate: data.db.dueDate,
            pixDueDate: data.pixResponse.expirationDate,
            qrCode: data.pixResponse.encodedImage,
            pixCopyPaste: data.pixResponse.payload,
            total: budget["BOLETO_PIX"].orderFinalPrice ?? 0,
          });
        }
        if (selectedPayment === "BOLETO") {
          addToPaymentStore({
            id: data.db.id,
            paymentMethod: data.db.paymentMethod,
            paymentStatus: data.db.paymentStatus,
            bankSlipUrl: data.db.bankSlipUrl,
            dueDate: data.db.dueDate,
            total: budget["BOLETO_PIX"].orderFinalPrice ?? 0,
          });
        }
        clearCart(userId);
        toast.success("Pedido enviado com sucesso!");
        router.push(`/finalizar-compra/${data.db.id}`);
        return data;
      }

      if (
        selectedPayment === "CREDIT_CARD" &&
        formattedOrder.creditCard.number &&
        formattedOrder.creditCard.number.length < 16
      ) {
        toast.error("Número do cartão inválido.");
        return;
      }

      await ordersAdventuresService.create(formattedOrder, userIP);
      setIsPaymentMadeWithCard(true);
      clearCart(userId);
      queryClient.invalidateQueries({
        queryKey: ["unread_notifications"],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.error("Token inválido ou expirado. Faça login novamente.");
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
    form.setValue("paymentMethod", paymentName);
  };

  const orderBudget = userCart?.cart.map((item) => {
    if (item) {
      const formatOrder = {
        adventureId: item.adventure.id,
        qntAdults: item.schedule.qntAdults,
        qntChildren: item.schedule.qntChildren,
        qntBabies: item.schedule.qntBabies,
      };
      return formatOrder;
    }
  });

  const { data: budget } = useQuery({
    queryKey: ["budget", orderBudget],
    queryFn: () =>
      ordersAdventuresService.createBudget({ adventures: orderBudget }, userIP),
    enabled: Boolean(userIP) && Boolean(orderBudget?.length),
  });

  const activityPrice =
    userCart &&
    userCart.cart.map(
      (act) =>
        Number(act.schedule.pricePerAdult) * act.schedule.qntAdults +
        Number(act.schedule.pricePerChildren) * act.schedule.qntChildren
    );

  const totalPrice =
    activityPrice && activityPrice.reduce((acc, price) => acc + price, 0);

  return (
    <section className="px-4 mb-8">
      <CartConflictCheckerWithModal cart={userCart?.cart ?? []} />
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
                Seu carrinho está vazio
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
              {userCart && userCart.cart.length > 0
                ? "Adicionar mais atividades"
                : "Adicionar atividades"}
            </MyButton>

            <MyButton
              variant="default"
              borderRadius="squared"
              size="lg"
              className="md:hidden w-full max-sm:mt-6"
              onClick={() => router.push(PATHS["finalizar-compra"])}
            >
              Finalizar Pedido
            </MyButton>

            {userCart && userCart.cart.length > 0 && (
              <MyButton
                variant="default"
                borderRadius="squared"
                size="lg"
                className="max-sm:hidden w-full max-sm:mt-6"
                onClick={() => setIsReadyToPay((prev) => !prev)}
              >
                Ir para o pagamento
              </MyButton>
            )}
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
              className={cn("md:flex md:flex-col md:w-full")}
            >
              <PreOrderForm form={form} />
              <div className="my-4">
                <MyTypography variant="subtitle4" weight="bold">
                  Selecione o método de pagamento:
                </MyTypography>
              </div>
              <div className={cn("flex gap-4 mb-4")}>
                {payments.map((payment) => (
                  <MyButton
                    key={payment.name}
                    variant="payment"
                    type="button"
                    borderRadius="squared"
                    className={cn(
                      "flex justify-between md:max-w-[200px]",
                      selectedPayment === payment.name &&
                        "bg-primary-900 opacity-100 border border-primary-600"
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

              {selectedPayment === "CREDIT_CARD" && budget && (
                <CardPaymentOption
                  userCart={userCart ? userCart.cart : []}
                  form={form}
                  budget={budget}
                />
              )}

              {/* Resumo dos valores */}
              {budget && selectedPayment !== "CREDIT_CARD" && (
                <div className="mt-4 w-full md:w-[42%]">
                  <div className="flex justify-between items-center">
                    <MyTypography
                      variant="subtitle3"
                      weight="bold"
                      className="text-sm md:text-md"
                    >
                      Total original:
                    </MyTypography>
                    <MyTypography
                      variant="heading2"
                      weight="bold"
                      className="text-lg md:text-xl"
                    >
                      {Number(totalPrice).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </MyTypography>
                  </div>
                  <div className="flex justify-between items-center">
                    <MyTypography
                      variant="subtitle3"
                      weight="regular"
                      className="text-sm md:text-md"
                    >
                      Taxas de serviço:
                    </MyTypography>
                    <MyTypography
                      variant="heading3"
                      weight="regular"
                      className="text-lg md:text-xl"
                    >
                      {budget["BOLETO_PIX"]?.totalGatewayFee.toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </MyTypography>
                  </div>
                  <div className="flex justify-between items-center">
                    <MyTypography
                      variant="subtitle3"
                      weight="bold"
                      className="text-sm md:text-md"
                    >
                      Total geral:
                    </MyTypography>
                    <MyTypography
                      variant="heading2"
                      weight="extrabold"
                      className="text-primary-600 text-lg md:text-xl"
                    >
                      {budget["BOLETO_PIX"]?.orderFinalPrice.toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </MyTypography>
                  </div>
                </div>
              )}

              {selectedPayment && (
                <div
                  className={cn(
                    "mt-6 md:mt-4 col-start-2",
                    selectedPayment === "CREDIT_CARD" &&
                      "md:col-span-2 md:col-start-2"
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
        </div>
      )}
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
        iconName="warning"
      />
    </section>
  );
}
