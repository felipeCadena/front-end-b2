"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from "@/components/molecules/my-dialog";
import MyTypography from "../atoms/my-typography";
import User from "../atoms/my-icon/elements/user";
import X from "../atoms/my-icon/elements/x";

interface ModalAlertProps {
  open: boolean;
  onClose: () => void;
  data: any[];
  icon: React.ReactNode;
  title: string;
  descrition: string;
  button: string;
}

export default function ModalClient({
  open,
  onClose,
  data,
  icon,
  title,
  descrition,
  button,
}: ModalAlertProps) {
  console.log(data);
  return (
    <MyDialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white flex flex-col gap-4 w-11/12 md:w-full h-auto rounded-2xl text-left px-4 md:max-h-[90vh] md:max-w-3xl overflow-auto">
        <DialogHeader className="text-left relative">
          <div onClick={onClose} className="absolute top-4 right-0">
            <X width="24" height="24" />
          </div>
          <DialogTitle className="text-lg md:text-xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg">
            {descrition}
          </DialogDescription>
        </DialogHeader>

        {data &&
          data.map((client: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-start gap-4 py-2 border-b border-gray-200"
            >
              {icon}
              <div>
                <MyTypography
                  variant="subtitle2"
                  lightness={500}
                  className="text-base md:text-lg"
                >
                  {client?.orderAdventure?.customer?.name}
                </MyTypography>
                <MyTypography
                  variant="subtitle3"
                  lightness={500}
                  className="text-base md:text-lg"
                >
                  Pessoas: {client?.qntAdults + client?.qntChildren}
                </MyTypography>
              </div>
            </div>
          ))}

        <div>
          <MyButton
            onClick={onClose}
            borderRadius="squared"
            size="lg"
            className="w-full mt-4"
          >
            {button}
          </MyButton>
        </div>
      </DialogContent>
    </MyDialog>
  );
}
