import React from 'react';
import MyTextInput from '../atoms/my-text-input';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/app/(pages)/(cliente)/finalizar-compra/page';

type PixOrBankSlipPaymentOptionProps = {
  form: UseFormReturn<FormData>;
};

const PixOrBankSlipPaymentOption = ({
  form,
}: PixOrBankSlipPaymentOptionProps) => {
  return (
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
  );
};

export default PixOrBankSlipPaymentOption;
