"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from "@/components/molecules/my-dialog";
import MyTypography from "../atoms/my-typography";

interface ModalAlertProps {
  open: boolean;
  onClose: () => void;
  onAction: () => void;
  iconName: IconsMapTypes;
  title: string;
  descrition: string;
  button: string;
  isLoading?: boolean;
}

export default function ModalAlert({
  open,
  onClose,
  onAction,
  title,
  descrition,
  iconName,
  button,
  isLoading,
}: ModalAlertProps) {
  return (
    <MyDialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] md:max-w-sm rounded-2xl py-12 px-6 text-center">
        <MyIcon
          name="x"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        />
        <DialogHeader className="flex items-center gap-4">
          <MyIcon name={iconName} />
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        <MyTypography
          variant="subtitle4"
          lightness={500}
          className="w-11/12 mx-auto"
        >
          {descrition}
        </MyTypography>
        <MyButton
          variant="black-border"
          borderRadius="squared"
          size="lg"
          className="mt-4 w-11/12 mx-auto font-bold"
          onClick={onAction}
          isLoading={isLoading ?? false}
        >
          {button}
        </MyButton>
      </DialogContent>
    </MyDialog>
  );
}
