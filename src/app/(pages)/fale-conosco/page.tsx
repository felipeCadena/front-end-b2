"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import { MyRadioGroup, RadioItem } from "@/components/atoms/my-radio-group";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTextarea from "@/components/atoms/my-textarea";
import MyTypography from "@/components/atoms/my-typography";
import { useRouter } from "next/navigation";
import React from "react";

export default function FaleConosco() {
  const router = useRouter();
  const [value, setValue] = React.useState<string>("elogio");

  return (
    <section className="my-6 px-4 space-y-4">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Fale Conosco
        </MyTypography>
      </div>

      <div className="space-y-2">
        <MyTypography variant="label">
          Tem alguma dúvida, sugestão ou precisa de suporte?
        </MyTypography>
        <MyTypography variant="label">
          Entre em contato conosco através do formulário abaixo:
        </MyTypography>
      </div>

      <div>
        <MyTextInput
          label="Nome Completo"
          placeholder="Digite seu nome"
          className="mt-2"
        />
        <MyTextInput label="Telefone" placeholder="Telefone" className="mt-2" />
        <MyTextInput
          label="E-mail"
          placeholder="b2adventure@gmail.com"
          className="mt-2"
        />

          <MyRadioGroup
            className="flex flex-col gap-2 mt-2 mb-4"
            value={value}
            onValueChange={(value: string) => setValue(value)}
          >
            <RadioItem value="elogio" label="Elogio" />
            <RadioItem
              value="sugestao"
              label="Sugestão"
            />
            <RadioItem value="reclamacao" label="Reclamação" />
          </MyRadioGroup>

        <MyTextarea label="Mensagem" placeholder="Digite sua mensagem aqui" />

        <MyButton
          variant="default"
          size="lg"
          borderRadius="squared"
          className="w-full"
        >
          Enviar
        </MyButton>
      </div>
    </section>
  );
}
