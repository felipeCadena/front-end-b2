import React from 'react';

import { Card } from './card';
import { FormData } from '@/app/(pages)/(cliente)/finalizar-compra/page';
import { UseFormReturn } from 'react-hook-form';
import MyFormInput from '../atoms/my-form-input';
import MyFormSelect from '../atoms/my-form-select';

type CardPaymentOptionProps = {
  form: UseFormReturn<FormData>;
};

const CardPaymentOption = ({ form }: CardPaymentOptionProps) => {
  const instalmentOptions = [
    { value: '1', label: '1x' },
    { value: '2', label: '2x' },
    { value: '3', label: '3x' },
    { value: '4', label: '4x' },
  ];
  return (
    <div className="max-sm:mt-8 md:flex md:flex-row-reverse md:items-center md:gap-8 md:col-span-2">
      <Card />

      <div className="max-sm:mt-4 space-y-4 md:w-[90%]">
        <MyFormInput
          label="Nome impresso no cartão"
          placeholder="Seu nome"
          className="mt-2"
          form={form}
          name="creditCard.holderName"
        />

        <MyFormInput
          label="Número do cartão"
          placeholder="XXXX XXXX XXXX XXXX"
          className="mt-2"
          name="creditCard.number"
          form={form}
        />

        <MyFormSelect
          form={form}
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
