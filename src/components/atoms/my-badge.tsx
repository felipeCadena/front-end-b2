import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-100 text-primary-700 ",
        "secondary-green": "border-transparent bg-secondary-100 text-secondary-700 ",
        success: "border-transparent bg-success-100 text-success-700 ",
        error: "border-transparent bg-error-100 text-error-700 ",
        info: "border-transparent bg-info-100 text-info-700 ",
        warning: "border-transparent bg-warning-100 text-warning-700 ",
        gray: "border-transparent bg-gray-100 text-gray-700 ",
        outline: "text-foreground border border-black rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function MyBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export default MyBadge;
