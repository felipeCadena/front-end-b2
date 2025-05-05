import React from 'react';

import { Card } from './card';
import { PurchaseOrderFormData } from '@/app/(pages)/(cliente)/finalizar-compra/page';
import { UseFormReturn } from 'react-hook-form';
import MyFormInput from '../atoms/my-form-input';
import MyFormSelect from '../atoms/my-form-select';
import { formatInstallmentOptions } from '@/utils/formatters';
import { AddToCartAdventure } from '@/services/api/adventures';
import MyTypography from '../atoms/my-typography';

type CardPaymentOptionProps = {
  form: UseFormReturn<PurchaseOrderFormData>;
  userCart: AddToCartAdventure[];
};

const CardPaymentOption = ({ form, userCart }: CardPaymentOptionProps) => {
  const activityPrice = userCart.map(
    (act) =>
      Number(act.schedule.pricePerAdult) * act.schedule.qntAdults +
      Number(act.schedule.pricePerChildren) * act.schedule.qntChildren
  );

  const totalPrice = activityPrice.reduce((acc, price) => acc + price, 0);

  const instamentsAvailable =
    process.env.NEXT_PUBLIC_B2_ENABLED_INSTALLMENT_PAY ?? 1;

  const instalmentOptions = formatInstallmentOptions(
    Number(instamentsAvailable),
    totalPrice
  );

  const { creditCard } = form.watch();

  return (
    <div className="max-sm:mt-8 px-4 md:px-0 md:flex md:flex-row-reverse md:items-center md:gap-8 md:col-span-2">
      <Card cardObj={creditCard} />

      <div className="max-sm:mt-4 space-y-4 md:w-[90%]">
        <MyFormInput
          label="Nome impresso no cartão"
          placeholder="Seu nome"
          className="mt-2"
          form={form}
          name="creditCard.holderName"
        />

        <div>
          <MyFormInput
            label="Número do cartão"
            placeholder="XXXX XXXX XXXX XXXX"
            className="mt-2"
            isCardNumber
            name="creditCard.number"
            form={form}
          />
          <div className="min-h-[22px]">
            {creditCard &&
              creditCard.number &&
              creditCard.number.length > 0 &&
              creditCard.number.length < 19 && (
                <MyTypography variant="label" className="text-red-600">
                  O número do cartão deve possuir 16 dígitos
                </MyTypography>
              )}
          </div>
        </div>

        <MyFormSelect
          form={form}
          disabled={Number(instamentsAvailable) > 1}
          label="Parcelas"
          name="installmentCount"
          options={instalmentOptions}
        />

        <div className="flex gap-2">
          <MyFormInput
            label="Mês"
            placeholder="mm"
            className="mt-1 p-0 max-w-12"
            inputPadding="pl-2"
            form={form}
            name="creditCard.expiryMonth"
          />
          <MyFormInput
            label="Ano"
            placeholder="yyyy"
            className="mt-1 max-w-16"
            inputPadding="pl-3"
            form={form}
            name="creditCard.expiryYear"
          />

          <MyFormInput
            label="CVC"
            placeholder="xxx"
            className="mt-1 max-w-11"
            inputPadding="pl-2"
            form={form}
            name="creditCard.ccv"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentOption;
