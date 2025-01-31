"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/utils/cn";
import MyTypography from "./my-typography";

type RadioItemProps = {
  label: React.ReactNode;
  description?: React.ReactNode;
};

const MyRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & RadioItemProps
>(({ className, label, description, ...props }, ref) => {
  return (
    <div className='flex items-center'>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "ring-offset-neutral-00 aspect-square h-4 w-4 rounded-full border-2 border-primary-600 text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <svg
            className='h-2 w-2 fill-current text-current'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='12'
              cy='12'
              r='12'
              fill='currentColor'
            />
          </svg>
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <div className='ml-4 flex flex-col'>
        <MyTypography
          as='label'
          variant='body'
          lightness={900}
          weight='medium'
          className='flex items-center gap-2'
        >
          {label}
        </MyTypography>
        {description && (
          <MyTypography
            as='small'
            lightness={600}
          >
            {description}
          </MyTypography>
        )}
      </div>
    </div>
  );
});

export { MyRadioGroup, RadioItem };
