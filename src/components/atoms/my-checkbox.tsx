"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/utils/cn";
import MyTypography from "./my-typography";

type MyCheckboxProps = {
  label?: string;
  description?: React.ReactNode;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

const MyCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  MyCheckboxProps
>(({ className, containerClassName, label, description, ...props }, ref) => (
  <div className={cn('flex gap-2', containerClassName)}>
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-sm border-2 border-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <svg
          width='16'
          height='12'
          viewBox='0 0 11 9'
        >
          <path
            fill='none'
            stroke='#8DC63F'
            strokeWidth='1'
            d='M1 4.304L3.696 7l6-6'
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <div className='flex flex-col '>
      <MyTypography
        as='label'
        weight='medium'
        lightness={900}
        className="#9F9F9F"
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
));

export default MyCheckbox;
