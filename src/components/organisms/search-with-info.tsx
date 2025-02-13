"use client";
import React from "react";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import PeopleSelector from "./people-selector";
import { MyDatePicker } from "../molecules/my-date-picker";
import MyTypography from "../atoms/my-typography";
import TimePickerModal from "../molecules/time-picker";

export default function SearchInfoActivity() {
  return (
    <section className="space-y-4 max-sm:mt-4 md:space-y-6 md:bg-gray-500 md:p-10 md:rounded-lg">

      <div className="md:hidden">
      <MyTypography variant="heading3" weight="semibold">
        Sugestões de atividades perto de você!
      </MyTypography>
      <MyTypography variant="label" weight="regular" lightness={400} className="mt-1">
        Procure por passeios que fiquem onde você está
      </MyTypography>
      </div>
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

        <TimePickerModal />

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
