import { activities } from "@/common/constants/mock";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
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

      <MySelect
      // value={value}
      // onValueChange={setValue}
      label="Nome da atividade"
      className="text-base text-black"
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione o nome da atividade" />
        </SelectTrigger>
        <SelectContent>
            {activities.map(({ title }) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
        </SelectContent>
      </MySelect>

      <MyTextarea 
        placeholder="Lorem ipsum dolor sit amet, consectetur di..." 
        label="Descrição da atividade" 
        classNameLabel="text-black text-base font-bold mt-3" 
        rows={5}
      />
    </section>
  );
}
