"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
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
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function MyCancelScheduleModal({
  open,
  onClose,
  onSubmit,
  isLoading,
}: ModalAlertProps) {
  return (
    <MyDialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] md:max-w-sm rounded-2xl py-20 px-6 text-center">
        <DialogHeader className="flex items-center gap-4">
          <MyIcon name="cancel" />
          <DialogTitle className="text-lg font-bold">
            Cancelamento de Atividade
          </DialogTitle>
        </DialogHeader>
        <MyTypography
          variant="subtitle4"
          lightness={500}
          className="w-11/12 mx-auto"
        >
          Tem certeza que deseja cancelar essa atividade?
        </MyTypography>
        <MyButton
          variant="black-border"
          borderRadius="squared"
          size="lg"
          className="mt-4 w-11/12 mx-auto font-bold"
          onClick={onSubmit}
          isLoading={isLoading ?? false}
        >
          Cancelar atividade
        </MyButton>

        <MyButton
          variant="ghost"
          size="lg"
          className="absolute top-0 right-0 mt-4 w-fit mx-auto font-bold "
          onClick={onClose}
        >
          <MyIcon name="x" />
        </MyButton>
      </DialogContent>
    </MyDialog>
  );
}
