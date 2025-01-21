import * as React from "react";

import { cn } from "@/utils/cn";
import type { StepSharedProps } from "./types";
import { useStepper } from "./use-stepper";
import MyButton from "@/components/atoms/my-button";

type StepButtonContainerProps = StepSharedProps & {
  children?: React.ReactNode;
};

const StepButtonContainer = ({
  isCurrentStep,
  isCompletedStep,
  children,
  isError,
  isLoading: isLoadingProp,
  onClickStep,
}: StepButtonContainerProps) => {
  const { clickable, isLoading: isLoadingContext, variant, styles } = useStepper();

  const currentStepClickable = clickable || !!onClickStep;

  const isLoading = isLoadingProp || isLoadingContext;

  if (variant === "line") {
    return null;
  }

  return (
    <MyButton
      tabIndex={currentStepClickable ? 0 : -1}
      className={cn(
        "pointer-events-none z-50 h-5 w-5 rounded-full bg-primary-100 p-0",
        "flex items-center justify-center rounded-full border",
        "border-neutral-200 bg-neutral-000 [&>span]:bg-neutral-200",
        "data-[current=true]:bg-primary-50 data-[current=true]:border-primary-500 [&>span]:data-[current=true]:bg-primary-500",
        "data-[active=true]:border-primary-500",
        "data-[clickable=true]:pointer-events-auto data-[clickable=true]:hover:bg-white",
        "data-[active=true]:bg-neutral-000",
        "data-[invalid=true]:border-erbg-error-500 data-[invalid=true]:bg-error-500 data-[invalid=true]:text-neutral-000",
        styles?.["step-button-container"],
      )}
      aria-current={isCurrentStep ? "step" : undefined}
      data-current={isCurrentStep}
      data-invalid={isError && (isCurrentStep || isCompletedStep)}
      data-active={isCompletedStep}
      data-clickable={currentStepClickable}
      data-loading={isLoading && (isCurrentStep || isCompletedStep)}
    >
      {children}
    </MyButton>
  );
};

export { StepButtonContainer };
