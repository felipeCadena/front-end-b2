import MyButton from "../atoms/my-button";
import MyTypography from "../atoms/my-typography";
import { DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, MyDialog } from "./my-dialog";

type ConfirmModalProps = {
  children: React.ReactNode;
  isOcutar?: boolean;
  isActive?: boolean;
  customTitle?: string;
  customDescription?: string;
  customConfirmMessage?: string;
  callbackFn: () => void
};

export default function ConfirmModal({ children, isOcutar, isActive, customTitle, customDescription, customConfirmMessage, callbackFn }: ConfirmModalProps) {
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
                {isOcutar
                  ? (isActive ? "Tem certeza que deseja ocultar publicação?" : "Tem certeza que deseja publicar?")
                  : "Tem certeza que deseja deletar?"}
              </>}
          </MyTypography>
        </DialogTitle>

        <div className='flex w-full flex-col gap-4'>
          <MyTypography lightness={600}>
            {customDescription ? customDescription
              : <>
                {isOcutar
                  ? (isActive ? "Todos cupons da campanha serão desabilitados para uso." : "O cupom será publicado.")
                  : "Todas as informações serão excluídas."}
              </>}
          </MyTypography>
          <DialogClose asChild>
            <MyButton
              onClick={callbackFn}
            >
              {customConfirmMessage ? customConfirmMessage
                : <>
                  {isOcutar ? "Sim, ocultar" : "Sim, deletar"}
                </>}
            </MyButton>
          </DialogClose>
          <DialogClose asChild>
            <MyButton variant='outline'>Cancelar</MyButton>
          </DialogClose>
        </div>
      </DialogContent>
    </MyDialog>
  );
}
