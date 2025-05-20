"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyStepper from "@/components/molecules/my-stepper";
import TermosParceiro from "./step-1";
import CadastroParceiro from "./step-2";
import Sobre from "./step-3";
import Informacoes from "./step-4";

import WebForm from "@/app/(pages)/(parceiro)/parceiro/cadastro-atividade/web-form";

import InformacoesAtividade from "@/components/templates/informacoes-atividade";
import { partnerService } from "@/services/api/partner";
import { useStepperStore } from "@/store/useStepperStore";
import { toast } from "react-toastify";

export default function StepperForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    cnpjOrCpf,
    email,
    fantasyName,
    name,
    password,
    phone,
    bankAccount,
    bankAgency,
    bankName,
    bankAccountDigit,
    bankAccountType,
    payday,
    bankCode,
    pixAddressKeyType,
    pixKey,
    bankOwnerName,
    bankOwnerDocument,
    typePayment,
  } = useStepperStore();

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep === 3 && typePayment == "bank") {
      if (
        !bankAccount ||
        !bankAgency ||
        !bankName ||
        !bankAccountDigit ||
        !bankAccountType ||
        !bankOwnerName ||
        !bankOwnerDocument ||
        !bankCode
      ) {
        toast.error("Todos os campos são obrigatórios!");
        return;
      }
    } else if (currentStep === 3 && typePayment == "pix") {
      if (!pixKey || !pixAddressKeyType) {
        toast.error("Todos os campos são obrigatórios!");
        return;
      }
    }

    if (currentStep === 3 && !payday) {
      toast.error("O campo dia do pagamento é obrigatório!");
      return;
    }

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
    <InformacoesAtividade step onBack={handleBack} />,
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
