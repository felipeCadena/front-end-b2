"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { useStepperStore } from "@/store/useStepperStore";
import { formatCNPJ } from "@/utils/formatters";
import React from "react";
import { toast } from "react-toastify";

export default function Sobre({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const { setStepData, fantasyName, cnpj } = useStepperStore();

  const handleNextStep = () => {
    if (!fantasyName || !cnpj) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    setStepData(3, {
      fantasyName,
      cnpj,
    });

    handleNext();
  };

  return (
    <>
      <section className="md:border-2 md:border-gray-200 md:rounded-xl md:p-12 md:my-4">
        <div className="space-y-2">
          <MyTypography variant="heading2" weight="bold">
            Agora nos conte um pouco sobre a sua empresa!
          </MyTypography>
          <MyTypography variant="subtitle3" weight="regular" lightness={400}>
            Só precisa preencher alguns dados antes.
          </MyTypography>
        </div>
        <div className="space-y-2 mt-4">
          <MyTextInput
            onChange={(e) => setStepData(3, { fantasyName: e.target.value })}
            value={fantasyName}
            label="Nome fantasia empresa"
            placeholder="Nome fantasia"
            className="mt-2"
          />
          <MyTextInput
            onChange={(e) =>
              setStepData(3, { cnpj: formatCNPJ(e.target.value) })
            }
            value={cnpj}
            label="CNPJ"
            placeholder="XX.XXX.XXX/XXXX-XX"
            className="mt-2"
          />
        </div>
      </section>
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
    </>
  );
}
