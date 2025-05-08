"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/utils/cn";
import MyTypography from "./my-typography";
import * as Dialog from "@radix-ui/react-dialog"; // Importando o componente Dialog para o modal
import MyButton from "./my-button";
import TermosCliente from "../templates/termos-cliente";

type MyCheckboxProps = {
  label?: string;
  description?: React.ReactNode;
  containerClassName?: string;
  termsLink?: string; // Link para os termos de uso
  labelStyle?: string; // Estilo do label
} & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

const MyCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  MyCheckboxProps
>(
  (
    {
      className,
      containerClassName,
      label,
      description,
      termsLink,
      labelStyle,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    return (
      <div className={cn("flex gap-2 items-center", containerClassName)}>
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            "peer h-5 w-5 shrink-0 rounded-sm border-2 border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current")}
          >
            <svg width="16" height="12" viewBox="0 0 11 9">
              <path
                fill="none"
                stroke="#8DC63F"
                strokeWidth="1"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <div className="flex flex-col">
          <MyTypography
            as="label"
            weight="medium"
            lightness={900}
            className={cn("#9F9F9F", labelStyle)}
          >
            {label}{" "}
            {termsLink && (
              <MyButton
                variant="text"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenModal();
                }}
                className="p-0"
              >
                {termsLink}
              </MyButton>
            )}
          </MyTypography>
          {description && (
            <MyTypography as="small" lightness={600}>
              {description}
            </MyTypography>
          )}
        </div>

        {/* Modal com os termos de uso */}
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger />
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed inset-0 md:inset-[20%] bg-white p-4 rounded-lg shadow-lg w-full h-full md:w-2/3 md:h-2/3 overflow-auto">
            <p className="mt-2">
              <TermosCliente />
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <MyButton
                variant="default"
                borderRadius="squared"
                onClick={handleCloseModal}
                className=""
              >
                Fechar
              </MyButton>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    );
  }
);

export default MyCheckbox;
