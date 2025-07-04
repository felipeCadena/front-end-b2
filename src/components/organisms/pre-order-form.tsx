import React from "react";
import MyFormInput from "../atoms/my-form-input";
import { UseFormReturn } from "react-hook-form";
import { PurchaseOrderFormData } from "@/app/(pages)/(cliente)/finalizar-compra/page";

type PreOrderFormProps = {
  form: UseFormReturn<PurchaseOrderFormData>;
};

const PreOrderForm = ({ form }: PreOrderFormProps) => {
  return (
    <div className="space-y-4 max-sm:my-4 px-4 md:w-full md:p-0">
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
          placeholder="Digite seu e-mail"
          className="mt-2"
          name="creditCardHolderInfo.email"
          form={form}
        />
      </div>
      <div className="flex max-sm:flex-col gap-4 md:mt-4">
        <MyFormInput
          label="Telefone"
          placeholder="+00 (00) 00000-0000"
          className="mt-2"
          isPhoneNumber
          name="creditCardHolderInfo.mobilePhone"
          form={form}
        />

        <MyFormInput
          label="CPF"
          placeholder="xxx.xxx.xxx-xx"
          className="mt-2"
          isCpfCnpj
          name="creditCardHolderInfo.cpfCnpj"
          form={form}
        />
        <MyFormInput
          label="CEP"
          placeholder="xxxxx-xxx"
          className="mt-2"
          isCEP
          name="creditCardHolderInfo.postalCode"
          form={form}
        />
      </div>
    </div>
  );
};

export default PreOrderForm;
