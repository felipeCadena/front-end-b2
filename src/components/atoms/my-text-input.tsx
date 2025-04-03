import { cn } from '@/utils/cn';
import * as React from 'react';
import MyTypography from './my-typography';

export interface MyTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  classNameLabel?: string;
  hint?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  stateColor?: 'success' | 'error' | 'warning' | 'default';
  noHintText?: boolean;
  withButton?: boolean;
  containerClassName?: string;
}

const MyTextInput = React.forwardRef<HTMLInputElement, MyTextInputProps>(
  (
    {
      className,
      containerClassName,
      classNameLabel,
      type,
      label,
      hint,
      rightIcon,
      leftIcon,
      stateColor,
      noHintText,
      withButton,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative flex w-full flex-col', containerClassName)}>
        {leftIcon && (
          <div className="absolute left-2 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center text-neutral-500">
            {leftIcon}
          </div>
        )}

        <MyTypography
          as="label"
          variant="label"
          weight="bold"
          className={cn('text-[#4E4B59]', classNameLabel)}
        >
          {label}
        </MyTypography>
        <input
          type={type}
          className={cn(
            'flex h-12 pl-4 w-full rounded-md border border-gray-300 bg-neutral-000 text-base ring-offset-neutral-000 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none  focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            leftIcon && 'pl-10',
            rightIcon && 'pr-8',
            stateColor === 'success' &&
              'border-success-500 focus-visible:ring-success-500',
            stateColor === 'error' &&
              'border-error-500 focus-visible:ring-error-500',
            stateColor === 'warning' &&
              'border-warning-500 focus-visible:ring-warning-500',
            withButton && 'h-14',
            className
          )}
          ref={ref}
          {...props}
        />

        {rightIcon && (
          <div
            className={cn(
              'absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center text-neutral-500'
            )}
          >
            {rightIcon}
          </div>
        )}

        {!noHintText && hint && (
          <MyTypography
            as="small"
            variant="caption"
            className={cn(
              'ml-4 h-4',
              stateColor === 'success' && 'text-success-500',
              stateColor === 'error' && 'text-error-500',
              stateColor === 'warning' && 'text-warning-500'
            )}
          >
            {hint}
          </MyTypography>
        )}
      </div>
    );
  }
);

export default MyTextInput;
