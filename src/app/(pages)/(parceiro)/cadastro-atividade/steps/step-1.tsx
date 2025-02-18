import { activities } from "@/common/constants/mock";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTextarea from "@/components/atoms/my-textarea";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import React from "react";

export default function Step1() {
  return (
    <section className="">
      <MyTypography variant="heading2" weight="bold">
        Cadastre a sua atividade
      </MyTypography>
      <MyTypography variant="subtitle3" weight="medium" lightness={400}>
        Preencha os dados da sua primeira atividade
      </MyTypography>

      <ActivitiesFilter withText={false} />

      <MyTextInput
        label="Nome da atividade"
        placeholder="Nome da atividade"
        className="mt-2"
      />

      <MyTextarea 
        placeholder="Lorem ipsum dolor sit amet, consectetur di..." 
        label="Descrição da atividade" 
        classNameLabel="text-black text-base font-bold mt-3" 
        rows={5}
      />
    </section>
  );
}
