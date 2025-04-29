import React from 'react';
import MyButton from '../atoms/my-button';
import MyIcon from '../atoms/my-icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/my-popover';

interface PopupAtividadesProps {
  onCancelar: () => void;
}

const PopupCancelActivity: React.FC<PopupAtividadesProps> = ({
  onCancelar,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MyIcon name="options" className="cursor-pointer p-1" />
      </PopoverTrigger>
      <PopoverContent
        className="z-50 p-2 bg-white rounded-lg shadow-lg border max-w-[150px] border-gray-200"
        align="end"
        sideOffset={5}
      >
        <div className="flex flex-col items-start space-y-1">
          <MyButton
            variant="text-muted"
            leftIcon={<MyIcon name="small-cancel" />}
            onClick={onCancelar}
            className="px-3 py-2 hover:bg-gray-100 rounded-md w-full transition-colors  justify-start"
          >
            Cancelar
          </MyButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopupCancelActivity;
