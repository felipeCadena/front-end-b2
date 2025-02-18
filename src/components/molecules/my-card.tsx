import { cn } from "@/utils/cn";
import * as React from "react";
import MyTypography from "../atoms/my-typography";

const MyCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-neutral-000 shadow-sm print:border-0 print:shadow-none",
        className,
      )}
      {...props}
    />
  ),
);

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex w-full flex-col space-y-1.5 border-b px-6 py-3", className)}
      {...props}
    />
  ),
);

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-700", className)}
    {...props}
  />
));

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6", className)}
      {...props}
    />
  ),
);

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center border-t p-6 pt-4 print:border-0", className)}
      {...props}
    />
  ),
);

const CardLabelSection = ({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex gap-12", className)}>
    <MyTypography
      className='w-36 min-w-36'
      variant='body-big'
      weight='medium'
      lightness={800}
    >
      {label}
    </MyTypography>
    {children}
  </div>
);

export {
  MyCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardLabelSection,
};
