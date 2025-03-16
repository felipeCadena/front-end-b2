"use client";

import MyButton from "@/components/atoms/my-button";
import { useState } from "react";
import MyLogo from "@/components/atoms/my-logo";
import MyIcon from "@/components/atoms/my-icon";
import { useParams, useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import Step1 from "@/components/organisms/steps/step-1";
import Step2 from "@/components/organisms/steps/step-2";
import Step3 from "@/components/organisms/steps/step-3";
import Step4 from "@/components/organisms/steps/step-4";
import Step5 from "@/components/organisms/steps/step-5";
import Step6 from "@/components/organisms/steps/step-6";
import InformacoesAtividade from "@/components/templates/informacoes-atividade";

const steps = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
];

export default function StepperEdit() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const stepsPerPage = 3;
  const { id } = useParams();

  const startIndex =
    currentStep === steps.length - 1
      ? steps.length - 2
      : Math.max(0, currentStep - 1);

  const visibleSteps = steps.slice(startIndex, startIndex + stepsPerPage);

  const handleNextTo = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push(PATHS.visualizarAtividadeParceiro(id as string));
    }
  };

  const handleBackToInitial = () => {
    switch (currentStep) {
      case 0:
        router.back();
        break;
      case 1:
        setCurrentStep(0);
        break;
      case 2:
        setCurrentStep(1);
        break;
      case 3:
        setCurrentStep(2);
        break;
      case 4:
        setCurrentStep(3);
        break;
      case 5:
        setCurrentStep(4);
        break;
    }
  };

  return (
    <main className="w-full max-w-md mx-auto p-4 flex flex-col gap-8">
      <div className="relative">
        <MyLogo variant="mobile" width={100} height={100} className="mx-auto" />
        <MyIcon
          name="voltar"
          className="absolute bottom-8 left-0 md:hidden"
          onClick={handleBackToInitial}
        />
      </div>

      {/* Stepper Visual */}
      <div
        className={cn(
          "flex items-center mb-4 w-full relative",
          currentStep < 5 ? "justify-between" : "gap-32",
          currentStep > 5 && "hidden"
        )}
      >
        {visibleSteps.map((step, index) => {
          const stepNumber = startIndex + index + 1;
          return (
            <div key={index} className="flex flex-col items-center">
              {currentStep >= 2 && (
                <div className="absolute -left-4 top-[0.9rem] w-[3%] h-[0.01rem] bg-black" />
              )}
              <div className="absolute left-8 top-[0.9rem] w-[34%] h-[0.01rem] bg-black" />
              {currentStep < 5 && (
                <div className="absolute left-[56%] top-[0.9rem] w-[34%] h-[0.01rem] bg-black" />
              )}
              {currentStep < 4 && (
                <div className="absolute -right-4 top-[0.9rem] w-[3%] h-[0.01rem] bg-black" />
              )}

              <div className="flex items-center relative flex-1">
                <div
                  className={cn(
                    "w-7 h-7 flex items-center justify-center rounded-full border border-black z-50",
                    currentStep === stepNumber - 1 && "bg-black text-white"
                  )}
                >
                  {currentStep >= stepNumber
                    ? currentStep == 0
                      ? stepNumber
                      : "✔"
                    : stepNumber}
                </div>
              </div>
              <span className="text-sm mt-1">{stepNumber}/6</span>
            </div>
          );
        })}
      </div>

      {/* Stepper Content */}
      {currentStep === 0 && <Step1 edit />}
      {currentStep === 1 && <Step2 />}
      {currentStep === 2 && <Step3 />}
      {currentStep === 3 && <Step4 />}
      {currentStep === 4 && <Step5 />}
      {currentStep === 5 && <Step6 />}
      {currentStep === 6 && (
        <InformacoesAtividade onBack={() => setCurrentStep(5)} edit />
      )}

      <MyButton
        onClick={handleNextTo}
        size="lg"
        borderRadius="squared"
        className={cn("w-full my-8", currentStep > 5 && "hidden")}
        rightIcon={<MyIcon name="seta-direita" />}
      >
        Próximo Passo
      </MyButton>
    </main>
  );
}
