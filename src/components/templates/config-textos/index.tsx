"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import ChevronDown from "@/components/atoms/my-icon/elements/down";
import MyTextarea from "@/components/atoms/my-textarea";
import MyButton from "@/components/atoms/my-button";

export default function ConfigTextos() {
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
            Textos da Landing Page
          </MyTypography>
        </div>

        <MyTextarea
          rows={5}
          placeholder="Lorem ipsum dolor sit amet, consectetur di..."
          className="mt-1"
        />

        <MyButton
          borderRadius="squared"
          size="lg"
          variant="default"
          className="mt-6 w-full"
        >
          Salvar
        </MyButton>
      </div>

      <div>
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold">
            Textos da área de Parceiros
          </MyTypography>
        </div>

        <MyTextarea
          rows={5}
          placeholder="Lorem ipsum dolor sit amet, consectetur di..."
          className="mt-1"
        />

        <MyButton
          borderRadius="squared"
          size="lg"
          variant="default"
          className="mt-6 w-full"
        >
          Salvar
        </MyButton>
      </div>
    </section>
  );
}
