"use client";

import React from "react";
import MyTextInput from "../atoms/my-text-input";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";

export default function SearchActivity() {
  const [chips, setChips] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  return (
    <section className="mt-2 md:w-2/3 md:mx-auto">
      <MyTextInput
        placeholder="Procurar atividade"
        noHintText
        withButton
        leftIcon={<MyIcon name="search" className="md:ml-2 max-sm:hidden" />}
        className="max-sm:pl-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rightIcon={
          <>
            <MyIcon name="search" className="mr-4 md:hidden" />
            <MyButton
              variant="default"
              size="md"
              borderRadius="squared"
              className="mr-24 max-sm:hidden"
            >
              Pesquisar
            </MyButton>
          </>
        }
      />
    </section>
  );
}
