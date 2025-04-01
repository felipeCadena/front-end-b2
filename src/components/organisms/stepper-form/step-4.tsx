"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { useStepperStore } from "@/store/useStepperStore";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import React from "react";

export default function Informacoes({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const { setStepData, bankAccount, bankAgency, bankName, payday } =
    useStepperStore();

  const handleNextStep = () => {
    handleNext();
  };

  console.log(payday);

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
          value={bankAccount}
          onChange={(e) => setStepData(4, { bankAccount: e.target.value })}
        />

        <div className="flex gap-2">
          <MyTextInput
            label="Agência"
            placeholder="Digite sua agência"
            className="mt-2"
            value={bankAgency}
            onChange={(e) => setStepData(4, { bankAgency: e.target.value })}
          />

          <MyTextInput
            label="Banco"
            placeholder="001"
            className="mt-2"
            value={bankName}
            onChange={(e) => setStepData(4, { bankName: e.target.value })}
          />
        </div>

        <MySelect
          value={String(payday) == "5" ? "05" : String(payday)}
          onValueChange={(value) => setStepData(4, { payday: +value })}
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

      <div className="flex justify-between items-center w-full max-w-3xl mx-auto p-4">
        <MyButton
          variant="default"
          borderRadius="squared"
          onClick={handleBack}
          leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
        >
          Voltar
        </MyButton>
        <MyButton
          variant="default"
          borderRadius="squared"
          onClick={handleNextStep}
          rightIcon={<MyIcon name="seta-direita" />}
        >
          Próximo
        </MyButton>
      </div>
    </div>
  );
}
