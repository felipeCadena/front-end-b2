import React from "react";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";
import Hide from "../atoms/my-icon/elements/hide";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/my-popover";
import Pessoas from "../atoms/my-icon/elements/pessoas";
import Options from "../atoms/my-icon/elements/options";
import ChatWeb from "../atoms/my-icon/elements/chat-web";
import Chat from "../atoms/my-icon/elements/chat";

interface PopupAtividadesProps {
  onDuplicar: () => void;
  onChat?: () => void;
  onCancelar: () => void;
  onEditar: () => void;
  onOcultar: () => void;
  onExcluir: () => void;
  onCustomer: () => void;
  reservation?: boolean;
  chat?: boolean;
}

const PopupActivity: React.FC<PopupAtividadesProps> = ({
  onDuplicar,
  onCancelar,
  onEditar,
  onChat,
  onOcultar,
  onExcluir,
  onCustomer,
  reservation = false,
  chat = false,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MyIcon name="options" className="cursor-pointer p-1" />
      </PopoverTrigger>
      <PopoverContent
        className="z-50 w-40 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        align="end"
        sideOffset={5}
      >
        <div className="flex flex-col items-start space-y-1">
          <MyButton
            variant="text-muted"
            leftIcon={<Pessoas stroke="#9F9F9F" />}
            onClick={onCustomer}
            className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors w-full justify-start"
          >
            Clientes
          </MyButton>

          {onChat && chat && (
            <MyButton
              variant="text-muted"
              leftIcon={<Chat fill="#9F9F9F" />}
              onClick={onChat}
              className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors w-full justify-start"
            >
              Chat
            </MyButton>
          )}

          <MyButton
            variant="text-muted"
            leftIcon={<MyIcon name="small-cancel" />}
            onClick={onCancelar}
            className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors w-full justify-start"
          >
            Cancelar
          </MyButton>

          {!reservation && (
            <>
              <MyButton
                variant="text-muted"
                leftIcon={<MyIcon name="duplicate" />}
                onClick={onDuplicar}
                className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors w-full justify-start"
              >
                Duplicar
              </MyButton>
              <MyButton
                variant="text-muted"
                leftIcon={<MyIcon name="edit" />}
                onClick={onEditar}
                className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors w-full justify-start"
              >
                Editar
              </MyButton>
              <MyButton
                variant="text-muted"
                leftIcon={<Hide iconColor="#9F9F9F" />}
                onClick={onOcultar}
                className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors w-full justify-start"
              >
                Ocultar
              </MyButton>
              <MyButton
                variant="text-muted"
                leftIcon={<MyIcon name="trash" />}
                onClick={onExcluir}
                className="px-3 py-2 text-red-500 hover:bg-gray-100 rounded-md transition-colors w-full justify-start"
              >
                Excluir
              </MyButton>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopupActivity;
