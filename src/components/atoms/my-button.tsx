import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import MySpinner from "./my-spinner";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-[0.725rem] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "font-bold text-[1rem] bg-primary-600 text-neutral-000 disabled:bg-gray-300 hover:bg-[#7daf44]",
        secondary:
          "text-primary-600 border border-primary-600 bg-traparent text-sm font-semibold",
        "secondary-muted":
          "text-primary-600 bg-primary-900 text-sm font-semibold",
        "secondary-text":
          "text-primary-600 bg-traparent text-sm font-semibold ",
        outline: "text-primary-600 border bg-traparent hover:bg-primary-200",
        "outline-muted":
          "text-[0.875rem] text-wrap opacity-50 bg-[#F1F0F5] border border-transparent",
        "outline-neutral": "text-[0.875rem] text-wrap border border-gray-600",
        link: "underline-offset-4 underline text-primary-600 hover:text-primary-600 disabled:text-gray-200",
        "link-muted":
          "underline-offset-4 underline text-neutral-800 hover:text-neutral-900 disabled:text-neutral-200",
        text: "text-primary-600 text-[0.875rem] font-semibold hover:text-primary-600 disabled:text-gray-200 hover:text-[#7daf44]",
        "text-muted": "text-neutral-400 text-[0.9rem]",
        date: "border bg-traparent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        black:
          "bg-black text-white text-[0.85rem] md:text-[1rem] font-semibold",
        payment:
          "border border-[#1E1E1E] text-[#1E1E1E] opacity-30 text-[0.875rem] focus:border focus:border-primary-600 focus:bg-primary-900 focus:opacity-100",
        "black-border":
          "border border-[#1E1E1E] text-[#1E1E1E] text-[0.875rem]",
        message:
          "bg-secondary-600 hover:bg-[#2d9ece] text-white font-semibold text-sm",
        partner: "bg-secondary-200 text-secondary-600 font-semibold text-sm",
        "text-black": "text-black text-[0.9rem]",
        red: "bg-[#FF727233] text-[#FF7272] text-[0.9rem]",
        config: "text-[1rem] bg-[#F1F0F5]",
        input: "border bg-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-0.5",
        xs: "h-6 px-1",
        md: "h-12 px-6 py-4",
        lg: "h-14 px-8",
      },
      borderRadius: {
        default: "rounded-[200px]",
        squared: "rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      borderRadius: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

const MyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      leftIcon,
      rightIcon,
      borderRadius,
      asChild,
      isLoading,
      disabled,
      loadingText = "Aguarde...",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          leftIcon && "flex gap-2",
          rightIcon && "flex gap-2",
          isLoading && "flex items-center justify-center gap-2",
          buttonVariants({ variant, size, borderRadius }),
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <MySpinner />
            <p>{loadingText}</p>
          </>
        ) : (
          <>
            {leftIcon ?? leftIcon}
            {children}
            {rightIcon ?? rightIcon}
          </>
        )}
      </Comp>
    );
  }
);

export default MyButton;
