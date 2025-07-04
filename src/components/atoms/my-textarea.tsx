import { cn } from "@/utils/cn";
import * as React from "react";
import MyTypography from "./my-typography";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  stateColor?: "success" | "error" | "warning";
  hint?: string;
  label?: string;
  classNameLabel?: string;
}

const MyTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, stateColor, hint, classNameLabel, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        <MyTypography
          as="label"
          className={cn(
            "text-sm font-semibold text-neutral-800",
            classNameLabel
          )}
        >
          {label}
        </MyTypography>
        <textarea
          className={cn(
            "placeholder:text-muted-neutral-500 flex min-h-[80px] w-full resize-none rounded-md border border-neutral-300 bg-neutral-000 px-3 py-2 text-base ring-offset-neutral-000 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && (
          <MyTypography
            as="small"
            variant="caption"
            className={cn(
              "ml-4 h-4",
              stateColor === "success" && "text-success-500",
              stateColor === "error" && "text-error-500",
              stateColor === "warning" && "text-warning-500"
            )}
          >
            {hint}
          </MyTypography>
        )}
      </div>
    );
  }
);

export default MyTextarea;
