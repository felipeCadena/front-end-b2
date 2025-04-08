"use client";

import MyTextInput from "@/components/atoms/my-text-input";
import MyTextarea from "@/components/atoms/my-textarea";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import { TypeAdventure, useAdventureStore } from "@/store/useAdventureStore";
import React from "react";

export default function Step1({
  edit,
  initialData,
}: {
  edit?: boolean;
  initialData?: any;
}) {
  const { setAdventureData, typeAdventure, description, title } =
    useAdventureStore();

  const handleSelectType = (value: TypeAdventure) => {
    setAdventureData({
      typeAdventure: value,
    });
  };

  return (
    <section className="">
      <MyTypography variant="heading2" weight="bold">
        {edit ? "Edite sua atividade" : "Cadastre a sua atividade"}
      </MyTypography>
      <MyTypography variant="subtitle3" weight="medium" lightness={400}>
        {edit
          ? "Atualize as informações da sua atividade"
          : "Preencha os dados da sua primeira atividade"}
      </MyTypography>

      <ActivitiesFilter
        withText={false}
        setSelected={handleSelectType}
        selected={typeAdventure}
      />

      <MyTextInput
        value={title}
        onChange={(e) => setAdventureData({ title: e.target.value })}
        label="Nome da atividade"
        placeholder="Nome da atividade"
        className="mt-2"
      />

      <MyTextarea
        value={description}
        onChange={(e) =>
          setAdventureData({
            description: e.target.value,
          })
        }
        label="Descrição da atividade"
        placeholder="Lorem ipsum dolor sit amet, consectetur di..."
        classNameLabel="text-black text-base font-bold"
        rows={5}
        maxLength={2000}
      />
    </section>
  );
}
