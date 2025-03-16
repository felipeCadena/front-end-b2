"use client";

import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import React from "react";

export default function Informacoes() {
  return (
    <div
      className={cn(
        "md:space-y-8 md:border-2 md:border-gray-200 md:rounded-xl md:p-12 md:my-4"
      )}
    >
      <div className="hidden md:block space-y-2">
        <MyTypography variant="heading2" weight="bold">
          Precisamos de só mais algumas informações
        </MyTypography>
        <MyTypography variant="subtitle3" weight="regular" lightness={400}>
          Precisamos de seus dados bancários agora.
        </MyTypography>
      </div>

      <div className="space-y-2">
        <MyTypography variant="subtitle3" weight="semibold" className="mb-3">
          Dados Bancários
        </MyTypography>
        <MyTextInput
          label="Número da conta"
          placeholder="0987 2348 2348 1243"
          className="mt-2"
        />

        <div className="flex gap-2">
          <MyTextInput
            label="Agência"
            placeholder="Digite sua agência"
            className="mt-2"
          />

          <MyTextInput label="Banco" placeholder="001" className="mt-2" />
        </div>

        <MySelect
          //   value={}
          //   onValueChange={}
          label="Data de Pagamento"
        >
          <SelectTrigger className="py-6 mt-1 mb-4">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="05">Todo dia 05</SelectItem>
            <SelectItem value="10">Todo dia 10</SelectItem>
            <SelectItem value="15">Todo dia 15</SelectItem>
          </SelectContent>
        </MySelect>
      </div>
    </div>
  );
}
