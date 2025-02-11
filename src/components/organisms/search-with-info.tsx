"use client";
import React from "react";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import PeopleSelector from "./people-selector";
import { MyDatePicker } from "../molecules/my-date-picker";

export default function SearchInfoActivity() {
  return (
    <section className="space-y-4 max-sm:mt-14 md:space-y-10 md:bg-gray-500 md:p-10 md:rounded-lg">
      <div className="mx-auto space-y-5 p-4 max-sm:border max-sm:border-gray-300 rounded-lg">
        <div className="max-sm:mt-4">
          <MyTextInput
            noHintText
            placeholder="Localização"
            className="placeholder:text-black"
            leftIcon={<MyIcon name="localizacao" className="ml-3" />}
          />
        </div>

        <MyDatePicker />

        <MyTextInput
          type="text"
          noHintText
          placeholder="Horário da Atividade"
          className="placeholder:text-black bg-white"
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
    </section>
  );
}
