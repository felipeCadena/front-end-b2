'use client';

import MyButton from '@/components/atoms/my-button';
import MyIcon, { IconsMapTypes } from '@/components/atoms/my-icon';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from '@/components/molecules/my-dialog';
import MyTypography from '../atoms/my-typography';

interface ModalAlertProps {
  open: boolean;
  onClose: () => void;
  iconName: IconsMapTypes;
  title: string;
  descrition: string;
  button: string;
}

export default function ModalAlert({
  open,
  onClose,
  title,
  descrition,
  iconName,
  button,
}: ModalAlertProps) {
  return (
    <MyDialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] md:max-w-sm rounded-2xl py-20 px-6 text-center">
        <DialogHeader className="flex items-center gap-4">
          <MyIcon name={iconName} />
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        <MyTypography
          variant="subtitle3"
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
          onClick={onClose}
        >
          {button}
        </MyButton>
      </DialogContent>
    </MyDialog>
  );
}
