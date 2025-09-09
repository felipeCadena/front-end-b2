"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from "@/components/molecules/my-dialog";
import MyTypography from "../atoms/my-typography";
import MyTextInput from "../atoms/my-text-input";
import { formatCEP } from "@/utils/formatters";

export interface PartnerAddress {
  addressStreet: string;
  addressPostalCode: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressComplement: string;
  addressCity: string;
  addressState: string;
}

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onAction: () => void;
  onBlurCep: () => void;
  iconName: IconsMapTypes;
  title: string;
  descrition: string;
  button: string;
  isLoading?: boolean;
  partnerAddress: PartnerAddress;
  setPartnerAddress: React.Dispatch<React.SetStateAction<PartnerAddress>>;
}

export default function AddressModal({
  open,
  onClose,
  onAction,
  onBlurCep,
  title,
  descrition,
  iconName,
  button,
  isLoading,
  partnerAddress,
  setPartnerAddress,
}: AddressModalProps) {
  return (
    <MyDialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-[90%] md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl py-12 px-6 text-center
             scrollbar-thin">
        {/* <MyIcon
          name="x"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        /> */}
        <DialogHeader className="flex items-center gap-4">
          <MyIcon name={iconName} />
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        <MyTypography
          variant="subtitle4"
          lightness={500}
          className="md:w-11/12 md:mx-auto text-left"
        >
          {descrition}
        </MyTypography>

        <div className="space-y-2 mt-4 md:mt-6 md:w-11/12 md:mx-auto">
          <MyTextInput
            label="CEP"
            classNameLabel="text-left"
            placeholder="Digite o CEP"
            className="mt-1"
            value={partnerAddress.addressPostalCode}
            onChange={(e) =>
              setPartnerAddress((prev) => ({
                ...prev,
                addressPostalCode: formatCEP(e.target.value),
              }))
            }
            onBlur={onBlurCep}
            noHintText
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyTextInput
              label="Endereço"
              classNameLabel="text-left"
              placeholder="Digite seu endereço"
              className="mt-1"
              value={partnerAddress.addressStreet}
              onChange={(e) =>
                setPartnerAddress((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              noHintText
            />
            <MyTextInput
              label="Número"
              classNameLabel="text-left"
              placeholder="Digite o número"
              className="mt-1"
              value={partnerAddress.addressNumber}
              onChange={(e) =>
                setPartnerAddress((prev) => ({
                  ...prev,
                  addressNumber: e.target.value,
                }))
              }
              noHintText
            />
            <MyTextInput
              label="Complemento"
              classNameLabel="text-left"
              placeholder="Digite o complemento"
              className="mt-1"
              value={partnerAddress.addressComplement}
              onChange={(e) =>
                setPartnerAddress((prev) => ({
                  ...prev,
                  addressComplement: e.target.value,
                }))
              }
              noHintText
            />
            <MyTextInput
              label="Bairro"
              classNameLabel="text-left"
              placeholder="Digite o bairro"
              className="mt-1"
              value={partnerAddress.addressNeighborhood}
              onChange={(e) =>
                setPartnerAddress((prev) => ({
                  ...prev,
                  addressNeighborhood: e.target.value,
                }))
              }
              noHintText
            />
            <MyTextInput
              label="Cidade"
              placeholder="Digite a cidade"
              classNameLabel="text-left"
              className="mt-1"
              value={partnerAddress.addressCity}
              onChange={(e) =>
                setPartnerAddress((prev) => ({
                  ...prev,
                  addressCity: e.target.value,
                }))
              }
              noHintText
            />
            <MyTextInput
              label="Estado"
              classNameLabel="text-left"
              placeholder="Digite o estado"
              className="mt-1"
              value={partnerAddress.addressState}
              onChange={(e) =>
                setPartnerAddress((prev) => ({
                  ...prev,
                  addressState: e.target.value,
                }))
              }
              noHintText
            />
          </div>
        </div>

        <MyButton
          variant="black-border"
          borderRadius="squared"
          size="lg"
          className="mt-4 md:w-8/12 md:mx-auto font-bold"
          onClick={onAction}
          isLoading={isLoading ?? false}
        >
          Salvar
        </MyButton>
      </DialogContent>
    </MyDialog>
  );
}
