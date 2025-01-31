"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import Pix from "@/components/atoms/my-icon/elements/pix";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { Card } from "@/components/organisms/card";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function FinalizarCompra() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const payments: { name: string; icon: IconsMapTypes }[] = [
    {
      name: "Pix",
      icon: "pix",
    },
    {
      name: "Boleto",
      icon: "boleto",
    },
    {
      name: "Cartão de débito",
      icon: "card",
    },
    {
      name: "Cartão de crédito",
      icon: "card",
    },
  ];

  return (
    <section className="mx-6">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Pagamento de atividades
        </MyTypography>
      </div>

      <div className="flex flex-col space-y-4 mt-4">
        {payments.map((payment) => (
          <MyButton
            key={payment.name}
            variant="payment"
            borderRadius="squared"
            className="flex justify-between"
            size="md"
            rightIcon={<MyIcon name={payment.icon} />}
            onClick={() => setSelectedPayment(payment.name)}
          >
            {payment.name}
          </MyButton>
        ))}
      </div>

      {selectedPayment?.includes("Cartão") && (
        <div className="mt-8">
          <Card />

          <div className="mt-4 space-y-6">
            <MyTextInput
              label="Nome impresso no cartão"
              placeholder="Seu nome"
              className="mt-1"
              noHintText
            />

            <MyTextInput
              label="Número do cartão"
              placeholder="XXXX XXXX XXXX XXXX"
              className="mt-1"
              noHintText
              rightIcon={<MyIcon name="master" className="-ml-4 mt-5"/>}
            />
            <div className="flex gap-4">
              <MyTextInput
                label="Vencimento"
                placeholder="XX/XXXX"
                className="mt-1"
                noHintText
              />

              <MyTextInput label="Código" placeholder="XXX" className="mt-1" noHintText/>
            </div>
          </div>
        </div>
      )}
      {selectedPayment && (
        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          className="my-4 w-full"
          onClick={() => {}}
        >
          Finalizar compra
        </MyButton>
      )}
    </section>
  );
}
