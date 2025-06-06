"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import ChevronDown from "@/components/atoms/my-icon/elements/down";
import MyButton from "@/components/atoms/my-button";
import MyTextInput from "@/components/atoms/my-text-input";

export default function ConfigIdiomas() {
  const [selectedIdiomas, setSelectedIdiomas] = React.useState<string>("");

  const languages = [
    "PT - BR",
    "ENGLISH",
    "ESPAÑOL",
    "COREAN",
    "日本語",
    "中文",
  ];
  return (
    <section className="my-4 space-y-12">
      <div>
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Idioma
          </MyTypography>
        </div>

        <MyTextInput noHintText placeholder="English" className="mt-4 w-full" />

        <MyButton
          borderRadius="squared"
          size="lg"
          variant="default"
          className="mt-6 w-full"
        >
          Salvar
        </MyButton>
      </div>

      <div className="space-y-4">
        <MyTypography variant="subtitle2" weight="bold" className="">
          Idiomas cadastrados
        </MyTypography>
        <div className="space-y-3 relative">
          {languages.map((language, index) => (
            <div
              key={index}
              className={`flex justify-between items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all border-l-8 ${
                selectedIdiomas === language
                  ? "border-black bg-gray-50"
                  : "border-gray-200 bg-gray-50 opacity-80"
              }`}
              onClick={() => setSelectedIdiomas(language)}
            >
              <MyTypography variant="body-big">{language}</MyTypography>
              <MyIcon name="trash" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
