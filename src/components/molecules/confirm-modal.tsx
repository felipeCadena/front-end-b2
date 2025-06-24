import { cn } from "@/utils/cn";
import MyButton from "../atoms/my-button";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  MyDialog,
} from "./my-dialog";

type ConfirmModalProps = {
  children: React.ReactNode;
  iconName: IconsMapTypes;
  customTitle?: string;
  customDescription?: string;
  customConfirmMessage?: string;
  callbackFn: () => void;
  className?: string;
};

export default function ConfirmModal({
  children,
  iconName,
  customTitle,
  customDescription,
  customConfirmMessage,
  callbackFn,
  className,
}: ConfirmModalProps) {
  return (
    <MyDialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-[90%] md:max-w-sm rounded-2xl py-10 px-6 text-center",
          className
        )}
      >
        <DialogHeader className="flex items-center gap-4 relative">
          <MyIcon name={iconName} />
          <DialogTitle className="text-lg font-bold">{customTitle}</DialogTitle>
        </DialogHeader>

        <DialogClose asChild className="absolute top-4 right-4 cursor-pointer">
          <MyIcon name="x" />
        </DialogClose>

        <div className="flex w-full flex-col gap-4">
          <MyTypography
            variant="subtitle4"
            lightness={500}
            className="w-11/12 mx-auto"
          >
            {customDescription}
          </MyTypography>
          <DialogClose asChild>
            <MyButton
              onClick={callbackFn}
              variant="black-border"
              borderRadius="squared"
              size="lg"
              className={cn("mt-4 w-11/12 md:w-full mx-auto font-bold")}
              // isLoading={isLoading ?? false}
            >
              {customConfirmMessage}
            </MyButton>
          </DialogClose>
        </div>
      </DialogContent>
    </MyDialog>
  );
}
