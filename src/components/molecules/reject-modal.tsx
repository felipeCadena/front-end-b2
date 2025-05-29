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
import MyTextarea from "../atoms/my-textarea";

type ConfirmModalProps = {
  children: React.ReactNode;
  iconName: IconsMapTypes;
  customTitle?: string;
  customConfirmMessage?: string;
  customDescription?: string;

  callbackFn: () => void;
  className?: string;
  refusalMsg?: string;
  setRefusalMsg?: React.Dispatch<React.SetStateAction<string>>;
};

export default function RejectModal({
  children,
  iconName,
  customTitle,
  customDescription,
  customConfirmMessage,
  callbackFn,
  className,
  refusalMsg,
  setRefusalMsg,
}: ConfirmModalProps) {
  return (
    <MyDialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

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

        <MyTypography
          variant="subtitle4"
          lightness={500}
          className="w-11/12 mx-auto"
        >
          {customDescription}
        </MyTypography>

        <MyTextarea
          placeholder="Escreva aqui o motivo da recusa"
          className="resize-y"
          value={refusalMsg}
          onChange={(e) => setRefusalMsg?.(e.target.value)}
          rows={12}
        />

        <DialogClose asChild className="absolute top-4 right-4 cursor-pointer">
          <MyIcon name="x" />
        </DialogClose>

        <div className="flex w-full flex-col gap-4">
          <DialogClose asChild>
            <MyButton
              onClick={callbackFn}
              variant="black-border"
              borderRadius="squared"
              size="lg"
              className={cn("mt-4 w-11/12 md:w-full mx-auto font-bold")}
            >
              {customConfirmMessage}
            </MyButton>
          </DialogClose>
        </div>
      </DialogContent>
    </MyDialog>
  );
}
