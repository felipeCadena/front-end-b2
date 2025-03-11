import React from "react";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import Hide from "../atoms/my-icon/elements/hide";

interface PopupAtividadesProps {
  visible: boolean;
  onClose: () => void;
  onDuplicar: () => void;
  onCancelar: () => void;
  onEditar: () => void;
  onOcultar: () => void;
  onExcluir: () => void;
}

const PopupActivity: React.FC<PopupAtividadesProps> = ({
  visible,
  onClose,
  onDuplicar,
  onCancelar,
  onEditar,
  onOcultar,
  onExcluir,
}) => {
  if (!visible) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50" onClick={handleClickOutside}>
      <div className="bg-white rounded-lg shadow-lg p-2 w-40">
        <div className="flex flex-col items-start space-y-1">
          <MyButton
            variant="text-muted"
            leftIcon={<MyIcon name="duplicate" />}
            onClick={onDuplicar}
            className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            Duplicar
          </MyButton>

          <MyButton
            variant="text-muted"
            leftIcon={<MyIcon name="small-cancel" />}
            onClick={onCancelar}
            className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancelar
          </MyButton>

          <MyButton
            variant="text-muted"
            leftIcon={<MyIcon name="edit" />}
            onClick={onEditar}
            className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            Editar
          </MyButton>

          <MyButton
            variant="text-muted"
            leftIcon={<Hide iconColor="#9F9F9F" />}
            onClick={onOcultar}
            className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            Ocultar
          </MyButton>

          <MyButton
            variant="text-muted"
            leftIcon={<MyIcon name="trash" />}
            onClick={onExcluir}
            className="px-3 py-2 text-red-500 hover:bg-gray-100 rounded-md transition-colors"
          >
            Excluir
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default PopupActivity;
