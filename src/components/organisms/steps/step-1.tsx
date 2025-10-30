"use client";

import MyTextInput from "@/components/atoms/my-text-input";
import MyTextarea from "@/components/atoms/my-textarea";
import MyTypography from "@/components/atoms/my-typography";
import LanguageSelector from "@/components/molecules/group-checkbox";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import { TypeAdventure, useAdventureStore } from "@/store/useAdventureStore";
import { capitalizeFirstLetter } from "@/utils/formatters";
import React from "react";

export default function Step1({
  edit,
  initialData,
}: {
  edit?: boolean;
  initialData?: any;
}) {
  const { setAdventureData, typeAdventure, description, title, languages } =
    useAdventureStore();

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectType = (value: TypeAdventure) => {
    setAdventureData({
      typeAdventure: value,
    });
  };

  React.useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  React.useEffect(() => {
    if (languages) {
      try {
        const parsed = JSON.parse(languages);
        setSelected(parsed);
      } catch {
        setSelected([]);
      }
    }
  }, [languages]);

  React.useEffect(() => {
    setAdventureData({ languages: JSON.stringify(selected) });
  }, [selected, setAdventureData]);

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

      <div className="space-y-4">
        <MyTextInput
          value={title}
          onChange={(e) =>
            setAdventureData({ title: capitalizeFirstLetter(e.target.value) })
          }
          label="Nome da atividade"
          placeholder="Nome da atividade"
          className="mt-2"
        />

        <LanguageSelector
          selected={selected}
          setSelected={setSelected} // agora só cuida do estado local
        />
        <div className="w-full">
          <MyTextarea
            value={description}
            onChange={(e) => {
              setAdventureData({
                description: e.target.value,
              });
            }}
            label="Descrição da atividade"
            placeholder="Fale sobre a atividade e destaque o que só você oferece para torná-la incrível."
            classNameLabel="text-black text-base font-bold"
            rows={5}
            maxLength={2000}
            className="resize-y" // permite redimensionar verticalmente
          />

          <div className="text-sm text-gray-400 text-right mt-1">
            {description.length} / 2000 caracteres
          </div>
        </div>
      </div>
    </section>
  );
}
