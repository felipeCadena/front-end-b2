/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import MyTypography from "./my-typography";
import MyIcon, { IconsMapTypes } from "./my-icon";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-2 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-000 text-sm",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-900",
        warning: "bg-warning-100 text-warning-900",
        primary: "bg-primary-100 text-primary-900",
        "secondary-green": "bg-secondary-green-100 text-secondary-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const MyAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & { iconName?: IconsMapTypes }
>(({ className, children, iconName, variant, ...props }, ref) => (
  <div
    ref={ref}
    role='alert'
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    {iconName ? (
      <div className='flex-start flex items-center gap-2'>
        <MyIcon
          name={iconName}
          className='p-1'
        />
        <div>{children}</div>
      </div>
    ) : (
      children
    )}
  </div>
));

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children }, ref) => (
    <MyTypography
      variant='body'
      weight='medium'
      // ref={ref}
      className={cn("leading-none tracking-tight text-inherit", className)}
    >
      {children}
    </MyTypography>
  ),
);

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children }, ref) => (
  <MyTypography
    variant='caption'
    // ref={ref}
    className={cn("text-neutral-600 [&_p]:leading-relaxed", className)}
  >
    {children}
  </MyTypography>
));

export { MyAlert, AlertTitle, AlertDescription };
