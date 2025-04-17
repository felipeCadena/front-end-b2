import React from 'react';
import MyFormInput from '../atoms/my-form-input';
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
      <div className="flex max-sm:flex-col gap-4 md:mt-4">
        <MyFormInput
          label="Nome Completo"
          placeholder="Seu nome"
          className="mt-2"
          name="creditCardHolderInfo.name"
          form={form}
        />

        <MyFormInput
          label="E-mail"
          placeholder="b2adventure@gmail.com"
          className="mt-2"
          name="creditCardHolderInfo.email"
          form={form}
        />
      </div>
      <div className="flex max-sm:flex-col gap-4 md:mt-4">
        <MyFormInput
          label="Telefone"
          placeholder="(XX) XXXXX-XXXX"
          className="mt-2"
          name="creditCardHolderInfo.mobilePhone"
          form={form}
        />

        <MyFormInput
          label="CPF"
          placeholder="XXX.XXX.XXX-XX"
          className="mt-2"
          name="creditCardHolderInfo.cpfCnpj"
          form={form}
        />
        <MyFormInput
          label="CEP"
          placeholder="XXXXX-XXX"
          className="mt-2"
          name="creditCardHolderInfo.postalCode"
          form={form}
        />
      </div>
    </div>
  );
};

export default PixOrBankSlipPaymentOption;
