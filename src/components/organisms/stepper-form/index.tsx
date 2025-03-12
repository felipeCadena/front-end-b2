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
    setCurrentStep(step);
  };

  const steps = [
    <TermosParceiro />,
    <CadastroParceiro />,
    <Sobre />,
    <Informacoes />,
    <Step5 />,
    <Step6 />,
    <Step7 />,
    <Step8 />,
    <Step9 />,
    <Step10 />,
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col">
      <MyStepper
        steps={totalSteps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        stepsPerPage={3}
      />

      {/* Wrapper para manter altura fixa e evitar deslocamentos */}
      <div className="relative my-8 min-h-[300px] flex items-center justify-center overflow-hidden">
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
      <div className="flex justify-between mx-4 mt-6">
        <MyButton
          variant="default"
          onClick={handleBack}
          disabled={currentStep === 0}
          leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
        >
          Voltar
        </MyButton>

        {currentStep < totalSteps - 1 ? (
          <MyButton
            variant="default"
            onClick={handleNext}
            rightIcon={<MyIcon name="seta-direita" />}
          >
            Próximo
          </MyButton>
        ) : (
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
