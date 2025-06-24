"use client";

import MyTextInput from "@/components/atoms/my-text-input";
import MyTextarea from "@/components/atoms/my-textarea";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import React from "react";

export default function Step5() {
  return (
    <section className="md:border-2 md:border-gray-200 md:rounded-xl md:p-16">
      <MyTypography variant="heading2" weight="bold">
        Cadastre a sua atividade
      </MyTypography>
      <MyTypography variant="subtitle3" weight="medium" lightness={400}>
        Preencha os dados da sua primeira atividade
      </MyTypography>

      <ActivitiesFilter withText={false} small={true} />

      <MyTextInput
        label="Nome da atividade"
        placeholder="Nome da atividade"
        className="mt-2"
      />

      <MyTextarea
        placeholder="Fale sobre a atividade e destaque o que só você oferece para torná-la incrível."
        label="Descrição da atividade"
        classNameLabel="text-black text-base font-bold mt-3"
        rows={5}
      />
    </section>
  );
}
