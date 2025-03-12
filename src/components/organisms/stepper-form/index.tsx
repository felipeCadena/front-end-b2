"use client";

import React, { useState } from "react";
import MyStepper from "@/components/molecules/my-stepper";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import TermosParceiro from "./step-1";
import CadastroParceiro from "./step-2";
import Sobre from "./step-3";
import Informacoes from "./step-4";
import Step5 from "./step-5";
import Step6 from "./step-6";
import Step7 from "./step-7";
import Step8 from "./step-8";
import Step9 from "./step-9";
import Step10 from "./step-10";
import { useRouter } from "next/navigation";

export default function StepperForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 10;
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepChange = (step: number) => {
    // Opcional: permitir navegação direta clicando nos steps
    setCurrentStep(step);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <MyStepper
        steps={totalSteps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        stepsPerPage={3}
      />

      {/* Conteúdo do step atual */}
      <div className="my-8">
        {currentStep === 0 && <TermosParceiro />}
        {currentStep === 1 && <CadastroParceiro />}
        {currentStep === 2 && <Sobre />}
        {currentStep === 3 && <Informacoes />}
        {currentStep === 4 && <Step5 />}
        {currentStep === 5 && <Step6 />}
        {currentStep === 6 && <Step7 />}
        {currentStep === 7 && <Step8 />}
        {currentStep === 8 && <Step9 />}
        {currentStep === 9 && <Step10 />}
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-between mx-4">
        <MyButton
          variant="default"
          onClick={handleBack}
          disabled={currentStep === 0}
          leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
        >
          Voltar
        </MyButton>

        {!(currentStep === totalSteps - 1) && (
          <MyButton
            variant="default"
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            rightIcon={<MyIcon name="seta-direita" />}
          >
            Próximo
          </MyButton>
        )}
        {currentStep === totalSteps - 1 && (
          <MyButton
            variant="default"
            onClick={() => router.push("/parceiro/informacoes-atividade")}
            rightIcon={<MyIcon name="seta-direita" />}
          >
            Concluir
          </MyButton>
        )}
      </div>
    </div>
  );
}
