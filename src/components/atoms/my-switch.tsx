"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/utils/cn";
import MyTypography from "./my-typography";

type MySwitchProps = {
  label?: string;
  description?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

const MySwitch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, MySwitchProps>(
  ({ className, label, description, ...props }, ref) => (
    <div className='flex justify-start gap-2'>
      <SwitchPrimitives.Root
        className={cn(
          "data- peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-000 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-600 data-[state=unchecked]:bg-neutral-600",
          className,
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-neutral-50 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          )}
        />
      </SwitchPrimitives.Root>
      <div className='flex flex-col justify-center'>
        <MyTypography
          as='label'
          weight='medium'
          lightness={900}
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
  ),
);

export default MySwitch;
