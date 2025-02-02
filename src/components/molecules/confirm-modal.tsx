import MyButton from "../atoms/my-button";
import MyTypography from "../atoms/my-typography";
import { DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, MyDialog } from "./my-dialog";

type ConfirmModalProps = {
  children: React.ReactNode;
  cancel?: boolean;
  customTitle?: string;
  customDescription?: string;
  customConfirmMessage?: string;
  callbackFn: () => void
};

export default function ConfirmModal({ children, cancel, customTitle, customDescription, customConfirmMessage, callbackFn }: ConfirmModalProps) {
  return (
    <MyDialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>
          <MyTypography
            variant='subtitle2'
            weight='medium'
          >
            {customTitle ? customTitle
              : <>
                {!cancel
                  ? "Tem certeza que deseja publicar?"
                  : "Cancelamento de Atividade"}
              </>}
          </MyTypography>
        </DialogTitle>

        <div className='flex w-full flex-col gap-4'>
          <MyTypography lightness={600}>
            {customDescription ? customDescription
              : <>
                {!cancel
                  ? "Atividade agendada"
                  : "Tem certeza que deseja cancelar essa atividade? Não será possível remarcar na mesma data ou reembolsar no valor pago."}
              </>}
          </MyTypography>
          <DialogClose asChild>
            <MyButton
              onClick={callbackFn}
            >
              {customConfirmMessage ? customConfirmMessage
                : <>
                  {!cancel ? "Ver na agenda" : "Cancelar Atividade"}
                </>}
            </MyButton>
          </DialogClose>
          {cancel && <DialogClose asChild>
            <MyButton variant='outline'>Não quero mais cancelar</MyButton>
          </DialogClose>}
        </div>
      </DialogContent>
    </MyDialog>
  );
}
