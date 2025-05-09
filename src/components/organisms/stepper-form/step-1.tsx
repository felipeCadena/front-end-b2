"use client";

import MyButton from "@/components/atoms/my-button";
import MyCheckbox from "@/components/atoms/my-checkbox";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import PartnerTerms from "@/components/templates/termos-parceiro";
import { useStepperStore } from "@/store/useStepperStore";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function TermosParceiro({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const router = useRouter();
  const { setStepData, terms } = useStepperStore();

  const handleNextStep = () => {
    if (!terms) {
      toast.error("Você precisa aceitar os termos de uso para continuar.");
      return;
    }

    handleNext();
  };

  return (
    <section className="md:mt-4 space-y-12">
      <div className=" md:max-w-screen-md md:mx-auto  md:border-2 md:border-gray-200 md:rounded-xl md:p-6">
        <div className="h-[320px] md:h-[500px] overflow-y-auto p-4">
          <PartnerTerms />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <MyCheckbox
          label="Li e aceito os termos de serviço"
          labelStyle="text-sm opacity-60"
          checked={terms}
          onClick={() => setStepData(1, { terms: !terms })}
        />

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
    </section>
  );
}
