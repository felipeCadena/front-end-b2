import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import React from "react";

export default function Sobre() {
  return (
    <section className="md:border-2 md:border-gray-200 md:rounded-xl md:p-12 md:my-4">
      <div className="space-y-2">
        <MyTypography variant="heading2" weight="bold">
          Agora nos conte um pouco sobre a sua empresa!
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" lightness={400}>
          Só precisa preencher alguns dados antes.
        </MyTypography>
      </div>
      <div className="space-y-2 mt-4">
        <MyTextInput
          label="Nome da empresa/pessoa"
          placeholder="Nome Completo"
          className="mt-2"
        />
        <MyTextInput
          label="CNPJ ou CPF"
          placeholder="XX.XXX.XXX/XXXX-XX"
          className="mt-2"
        />
      </div>
    </section>
  );
}
