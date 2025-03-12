"use client";

import { cn } from "@/utils/cn";
import React, { useState, useEffect } from "react";
import MyTypography from "@/components/atoms/my-typography";

interface MyStepperProps {
  steps: number;
  currentStep: number;
  onStepChange?: (step: number) => void;
  stepsPerPage?: number;
}

export default function MyStepper({
  steps,
  currentStep,
  onStepChange,
  stepsPerPage = 3,
}: MyStepperProps) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    // Atualiza o índice inicial baseado no passo atual
    if (currentStep >= steps - 1) {
      setStartIndex(Math.max(0, steps - stepsPerPage));
    } else {
      setStartIndex(Math.max(0, currentStep - 1));
    }
  }, [currentStep, steps, stepsPerPage]);

  const visibleSteps = Array.from({ length: steps }).slice(
    startIndex,
    startIndex + stepsPerPage
  );

  return (
    <div
      className={cn("flex items-center mb-4 w-full relative justify-between")}
    >
      {visibleSteps.map((_, index) => {
        const stepNumber = startIndex + index + 1;
        const isCompleted = currentStep > stepNumber - 1;
        const isCurrent = currentStep === stepNumber - 1;

        return (
          <div key={index} className="flex flex-col items-center">
            {/* Linhas conectoras */}
            {currentStep >= 2 && (
              <div className="absolute -left-5 top-[0.9rem] w-[3%] h-[0.01rem] bg-black" />
            )}
            <div className="absolute left-8 top-[0.9rem] w-[42%] h-[0.01rem] bg-black" />
            {
              <div className="absolute left-[53%] top-[0.9rem] w-[42%] h-[0.01rem] bg-black" />
            }
            {currentStep < steps - 2 && (
              <div className="absolute -right-6 top-[0.9rem] w-[3%] h-[0.01rem] bg-black" />
            )}

            {/* Círculo do step */}
            <div className="flex items-center relative flex-1">
              <button
                onClick={() => onStepChange?.(stepNumber - 1)}
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full border border-black z-50 transition-all",
                  isCurrent && "bg-black text-white",
                  isCompleted && "bg-black text-white"
                )}
              >
                {isCompleted ? "✓" : stepNumber}
              </button>
            </div>

            {/* Número do step */}
            <MyTypography
              variant="caption"
              className={cn("mt-1", isCurrent && "font-semibold")}
            >
              {stepNumber}/{steps}
            </MyTypography>
          </div>
        );
      })}
    </div>
  );
}
