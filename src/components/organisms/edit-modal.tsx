import { useEffect, useState } from "react";
import { EditSection } from "./edit-activity";
import MyTextInput from "../atoms/my-text-input";
import { MySelect, SelectItem } from "../atoms/my-select";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  MyDialog,
} from "../molecules/my-dialog";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";

import BasicInfo from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/basic-info";
import UpdateImages from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/images";
import Pricing from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/pricing";
import Schedules from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/schedules";
import Location from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/location";

interface EditModalProps {
  isOpen: boolean;
  section: EditSection;
  data: any; // Tipo da sua atividade
  onClose: () => void;
}

export type ModalProps = {
  formData: any;
  setFormData: (data: any) => void;
  onClose: () => void;
};

export function EditModal({ isOpen, section, data, onClose }: EditModalProps) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const renderForm = () => {
    switch (section) {
      case "basic":
        return (
          <BasicInfo
            formData={formData}
            setFormData={setFormData}
            onClose={onClose}
          />
        );

      case "images":
        return <UpdateImages formData={data} onClose={onClose} />;

      case "pricing":
        return (
          <Pricing
            formData={formData}
            setFormData={setFormData}
            onClose={onClose}
          />
        );

      case "schedule":
        return (
          <Schedules
            formData={formData}
            setFormData={setFormData}
            onClose={onClose}
          />
        );

      case "location":
        return (
          <Location
            formData={formData}
            setFormData={setFormData}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MyDialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30" />

        <DialogContent
          aria-describedby="dialog-description"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             bg-white rounded-lg w-[95%] max-w-screen-lg max-h-[90vh] overflow-y-auto p-6"
        >
          <DialogTitle className="text-xl font-bold mb-4">
            {section === "basic" && "Informações Gerais"}
            {section === "pricing" && "Preços"}
            {section === "location" && "Localização"}
            {section === "schedule" && "Horários e datas"}
            {section === "images" && "Imagens da atividade"}
          </DialogTitle>

          {renderForm()}

          <DialogClose asChild>
            <MyButton
              variant="ghost"
              className="absolute top-4 right-4 p-1 "
              aria-label="Close"
            >
              <MyIcon name="x" className="w-4 h-4" />
            </MyButton>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </MyDialog>
  );
}
