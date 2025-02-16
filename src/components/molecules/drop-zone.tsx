import { cn } from "@/utils/cn";
import React, { ChangeEvent, useState } from "react";
import MyTextInput from "../atoms/my-text-input";

interface DropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (files: FileList | null) => void;
}

export const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(
  ({ className, onChange, children, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      onChange(e.dataTransfer.files);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.files);
    };

    return (
      <div
        className={cn(
          "w-full rounded-lg border border-dashed border-neutral-400 p-4",
          {
            "rounded-md border-dashed border-primary-600": isDragging,
          },
          className,
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {children}
        <MyTextInput
          ref={ref}
          type='file'
          noHintText
          className='hidden'
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  },
);

Dropzone.displayName = "Dropzone";
