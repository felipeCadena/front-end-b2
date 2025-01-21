"use client";
import React from "react";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import PeopleSelector from "./people-selector";
import { MyDatePicker } from "../molecules/my-date-picker";

export default function SearchInfoActivity() {
  return (
    <div className="space-y-4 mt-20">
      <div className="mx-auto space-y-5 p-4 border border-gray-300 rounded-lg">
        <MyTextInput
        noHintText
          placeholder="Localização"
          className="placeholder:text-black"
          leftIcon={<MyIcon name="localizacao" className="ml-3" />}
        />

        <MyDatePicker />

        <MyTextInput
          type="text"
          noHintText
          placeholder="Horário da Atividade"
          className="placeholder:text-black"
          leftIcon={<MyIcon name="time" className="ml-3" />}
        />

        <PeopleSelector />

      </div>

      <MyButton
        variant="default"
        borderRadius="squared"
        size="lg"
        className="w-full"
      >
        Procurar atividades
      </MyButton>
    </div>
  );
}
