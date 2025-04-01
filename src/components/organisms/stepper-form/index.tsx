"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyStepper from "@/components/molecules/my-stepper";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import TermosParceiro from "./step-1";
import CadastroParceiro from "./step-2";
import Sobre from "./step-3";
import Informacoes from "./step-4";
import { useRouter } from "next/navigation";
import WebForm from "@/app/(pages)/(parceiro)/parceiro/cadastro-atividade/web-form";
import { cn } from "@/utils/cn";
import InformacoesAtividade from "@/components/templates/informacoes-atividade";
import PATHS from "@/utils/paths";
import userPartner from "@/store/usePartner";
import { toast } from "react-toastify";
import { useStepperStore } from "@/store/useStepperStore";

export default function StepperForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;
  const router = useRouter();
  const { fantasyName } = useStepperStore();

  console.log(fantasyName);

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
    setCurrentStep(step);
  };

  const steps = [
    <TermosParceiro handleBack={handleBack} handleNext={handleNext} />,
    <CadastroParceiro handleBack={handleBack} handleNext={handleNext} />,
    <Sobre handleBack={handleBack} handleNext={handleNext} />,
    <Informacoes handleBack={handleBack} handleNext={handleNext} />,
    <WebForm type="cadastro" handleBack={handleBack} handleNext={handleNext} />,
    <InformacoesAtividade step />,
    // <Step5 />,
    // <Step6 />,
    // <Step7 />,
    // <Step8 />,
    // <Step9 />,
    // <Step10 />,
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col">
      <MyStepper
        steps={totalSteps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        stepsPerPage={3}
      />

      {/* Wrapper para manter altura fixa e evitar deslocamentos */}
      <div className="relative  min-h-[300px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botões ficam fora da div animada */}
      {/* <div className={cn("flex justify-between my-4")}>
        <MyButton
          variant="default"
          borderRadius="squared"
          onClick={handleBack}
          disabled={currentStep === 0}
          leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
        >
          Voltar
        </MyButton>

        {currentStep < totalSteps - 1 ? (
          <MyButton
            variant="default"
            borderRadius="squared"
            onClick={handleNext}
            rightIcon={<MyIcon name="seta-direita" />}
          >
            Próximo
          </MyButton>
        ) : (
          <MyButton
            variant="default"
            borderRadius="squared"
            onClick={() =>
              router.push(`${PATHS["minhas-atividades"]}?openModal=true`)
            }
            rightIcon={<MyIcon name="seta-direita" />}
          >
            Concluir
          </MyButton>
        )}
      </div> */}
    </div>
  );
}
