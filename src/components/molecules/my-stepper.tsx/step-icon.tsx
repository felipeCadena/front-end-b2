/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useStepper } from "./use-stepper";
import MyIcon from "@/components/atoms/my-icon";

interface StepIconProps {
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isKeepError?: boolean;
  icon?: React.ReactNode;
  index?: number;
  checkIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
}

const StepIcon = React.forwardRef<HTMLDivElement, StepIconProps>((props, ref) => {
  const { size } = useStepper();

  const {
    isCompletedStep,
    isCurrentStep,
    isError,
    isLoading,
    isKeepError,
    icon: CustomIcon,
    index,
    checkIcon: CustomCheckIcon,
    errorIcon: CustomErrorIcon,
  } = props;

  const Icon = React.useMemo(() => (CustomIcon ? CustomIcon : null), [CustomIcon]);

  const ErrorIcon = React.useMemo(
    () => (CustomErrorIcon ? CustomErrorIcon : null),
    [CustomErrorIcon],
  );

  const Check = React.useMemo(
    () => (CustomCheckIcon ? CustomCheckIcon : <MyIcon name='check' />),
    [CustomCheckIcon],
  );

  return React.useMemo(() => {
    if (isCompletedStep) {
      if (isError && isKeepError) {
        return (
          <div key='icon'>
            <MyIcon name='x' />
          </div>
        );
      }
      return (
        CustomCheckIcon || (
          <MyIcon
            name='check'
            className='[&>svg]:stroke-primary-500'
          />)
      );
    }
    if (isCurrentStep) {
      if (isError && ErrorIcon) {
        return (
          <div key='error-icon'>
            <MyIcon name='x' />
          </div>
        );
      }
      if (isError) {
        return (
          <div key='icon'>
            <MyIcon name='x' />
          </div>
        );
      }
      if (isLoading) {
        return <MyIcon name='x' />;
      }
    }
    return (
      <span
        ref={ref}
        key='label'
        className='h-2 w-2 rounded-full bg-primary-500'
      ></span>
    );
  }, [
    isCompletedStep,
    isCurrentStep,
    isError,
    isLoading,
    Icon,
    index,
    Check,
    ErrorIcon,
    isKeepError,
    ref,
    size,
  ]);
});

export { StepIcon };
