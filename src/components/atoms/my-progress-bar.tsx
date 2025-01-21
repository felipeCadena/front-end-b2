"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/utils/cn";
import MyTypography from "./my-typography";

const MyProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { label?: string }
>(({ className, value, label, ...props }, ref) => (
  <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
    <MyTypography
      as='label'
      className='w-full md:w-1/3'
      lightness={800}
    >
      {label}
    </MyTypography>
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-neutral-200", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className='h-full w-full flex-1 bg-primary-500 transition-all'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    {value}%
  </div>
));

export { MyProgressBar };
