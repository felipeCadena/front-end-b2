"use client";

import MyButton from "@/components/atoms/my-button";
import MyCheckbox from "@/components/atoms/my-checkbox";
import MyTypography from "@/components/atoms/my-typography";
import TermosParceiro from "@/components/organisms/stepper-form/step-1";
import PartnerTerms from "@/components/templates/termos-parceiro";
import { useStepperStore } from "@/store/useStepperStore";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function TermosParceiroPartner() {
  const { setStepData, terms } = useStepperStore();

  const handleNextStep = () => {
    if (!terms) {
      toast.error("Você precisa aceitar os termos de uso para continuar.");
      return;
    }

    router.push(PATHS["cadastro-parceiro"]);
  };

  const handleBack = () => {};

  const router = useRouter();
  return (
    <section className="m-6 space-y-12">
      <div className=" md:max-w-screen-md md:mx-auto md:mt-12 md:border-2 md:border-gray-200 md:rounded-xl md:p-6">
        <div className="h-[320px] md:h-[500px] overflow-y-auto">
          <PartnerTerms />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <MyCheckbox
          label="Li e aceito os termos de serviço"
          labelStyle="text-sm opacity-60"
          className="my-2"
          checked={terms}
          onClick={() => setStepData(1, { terms: !terms })}
        />

        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          className="w-full md:w-1/2 my-4"
          onClick={handleNextStep}
        >
          Cadastrar Empresa
        </MyButton>
      </div>
    </section>
  );
}
