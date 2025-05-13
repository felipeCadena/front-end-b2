"use client";

import MyButton from "@/components/atoms/my-button";
import { useState } from "react";
import MyLogo from "@/components/atoms/my-logo";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import Step1 from "@/components/organisms/steps/step-1";
import Step2 from "@/components/organisms/steps/step-2";
import Step3 from "@/components/organisms/steps/step-3";
import Step4 from "@/components/organisms/steps/step-4";
import Step5 from "@/components/organisms/steps/step-5";
import Step6 from "@/components/organisms/steps/step-6";
import InformacoesAtividade from "@/components/templates/informacoes-atividade";
import { useAdventureStore } from "@/store/useAdventureStore";
import { toast } from "react-toastify";

const steps = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "7" },
];

export default function StepperComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const {
    typeAdventure,
    description,
    title,
    hoursBeforeSchedule,
    hoursBeforeCancellation,
    selectionBlocks,
    difficult,
    duration,
    address,
    pointRefAddress,
    tempImages,
    transportAddress,
    transportIncluded,
  } = useAdventureStore();

  const stepsPerPage = 3;

  const startIndex =
    currentStep === steps.length - 1
      ? steps.length - 2
      : Math.max(0, currentStep - 1);

  const visibleSteps = steps.slice(startIndex, startIndex + stepsPerPage);

  const handleNextTo = () => {
    const someDate = selectionBlocks.some(
      (date) =>
        (date.dates.length || date.recurrenceWeekly.length) &&
        date.recurrenceHour.length
    );

    if ((!typeAdventure || !description || !title) && currentStep == 0) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (
      (!hoursBeforeCancellation || !hoursBeforeSchedule) &&
      currentStep == 2
    ) {
      toast.error(
        "Preencha os campos Antecêdencia de Agendamento e Antecedência de Cancelamento."
      );
      return;
    }

    if (!someDate && currentStep == 2) {
      toast.error(
        "Em repetir atividade, é necessário selecionar o dia da semana ou dias específicos. Os horários são obrigatórios."
      );
      return;
    }

    if ((!difficult || !duration) && currentStep == 1) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if ((!address || !pointRefAddress) && currentStep == 3) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (tempImages.length < 5 && currentStep == 5) {
      toast.error("São necessárias 5 imagens.");
      return;
    }

    if (tempImages.length > 5 && currentStep == 5) {
      toast.error(
        "São permitidas no máximo 5 imagens. Exclua até ter 5 imagens."
      );
      return;
    }

    if (transportIncluded && !transportAddress && currentStep == 4) {
      toast.error("Preencha o local de saída e retorno.");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push(`${PATHS["minhas-atividades"]}?openModal=true&create=true`);
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
      case 6:
        setCurrentStep(5);
        break;
    }
  };

  return (
    <main className="w-full max-w-md mx-auto p-4 flex flex-col gap-4 md:gap-8">
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
          currentStep < 6 ? "justify-between" : "gap-32"
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
              {currentStep < 6 && (
                <div className="absolute left-[56%] top-[0.9rem] w-[34%] h-[0.01rem] bg-black" />
              )}
              {currentStep < 5 && (
                <div className="absolute -right-4 top-[0.9rem] w-[3%] h-[0.01rem] bg-black" />
              )}

              <div className="flex items-center relative flex-1">
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full border border-black z-50 ${
                    currentStep === stepNumber - 1 && "bg-black text-white"
                  }`}
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
      {currentStep === 0 && <Step1 />}
      {currentStep === 1 && <Step3 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step4 />}
      {currentStep === 4 && <Step5 />}
      {currentStep === 5 && <Step6 />}
      {currentStep === 6 && (
        <InformacoesAtividade onBack={handleBackToInitial} step />
      )}

      {currentStep != 6 && (
        <div className="space-y-4 mt-8">
          <MyButton
            onClick={handleBackToInitial}
            size="lg"
            borderRadius="squared"
            className="w-full"
            variant="black-border"
            leftIcon={<MyIcon name="seta" className="rotate-180" />}
          >
            Passo Anterior
          </MyButton>
          <MyButton
            onClick={handleNextTo}
            size="lg"
            borderRadius="squared"
            className="w-full"
            rightIcon={<MyIcon name="seta-direita" />}
          >
            Próximo Passo
          </MyButton>
        </div>
      )}
    </main>
  );
}
