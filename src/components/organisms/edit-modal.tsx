import { useEffect, useState } from "react";
import { EditSection } from "./edit-activity";
import MyTextInput from "../atoms/my-text-input";
import MyTextarea from "../atoms/my-textarea";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/my-select";
import { dificulties } from "@/common/constants/constants";
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
import {
  getDifficultyDescription,
  getDifficultyNumber,
} from "@/utils/formatters";
import ActivitiesFilter from "./activities-filter";
import { TypeAdventure } from "@/store/useEditAdventureStore";
import BasicInfo from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/basic-info";
import UpdateImages from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/images";

interface EditModalProps {
  isOpen: boolean;
  section: EditSection;
  data: any; // Tipo da sua atividade
  onClose: () => void;
}

const activities: {
  name: "ar" | "terra" | "mar";
  title: string;
}[] = [
  {
    name: "ar",
    title: "Atividades Aéreas",
  },
  {
    name: "terra",
    title: "Atividades Terrestres",
  },
  {
    name: "mar",
    title: "Atividades Aquáticas",
  },
];

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
          <>
            <MyTextInput
              label="Preço Adulto"
              type="number"
              value={formData.priceAdult}
              onChange={(e) =>
                setFormData({ ...formData, priceAdult: e.target.value })
              }
            />
            <MyTextInput
              label="Preço Criança"
              type="number"
              value={formData.priceChildren}
              onChange={(e) =>
                setFormData({ ...formData, priceChildren: e.target.value })
              }
            />
            <MySelect
              label="Permite Crianças"
              value={formData.isChildrenAllowed ? "true" : "false"}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  isChildrenAllowed: value === "true",
                })
              }
            >
              <SelectItem value="true">Sim</SelectItem>
              <SelectItem value="false">Não</SelectItem>
            </MySelect>
          </>
        );

      case "schedule":
        return (
          <>
            <MyTextInput
              label="Antecedência para Agendamento (horas)"
              type="number"
              value={formData.hoursBeforeSchedule}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hoursBeforeSchedule: e.target.value,
                })
              }
            />
            <MyTextInput
              label="Antecedência para Cancelamento (horas)"
              type="number"
              value={formData.hoursBeforeCancellation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hoursBeforeCancellation: e.target.value,
                })
              }
            />
            <MyTextInput
              label="Limite de Pessoas"
              type="number"
              value={formData.personsLimit}
              onChange={(e) =>
                setFormData({ ...formData, personsLimit: e.target.value })
              }
            />
          </>
        );

      case "location":
        return (
          <>
            <MyTextInput
              label="Antecedência para Agendamento (horas)"
              type="number"
              value={formData.hoursBeforeSchedule}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hoursBeforeSchedule: e.target.value,
                })
              }
            />
            <MyTextInput
              label="Antecedência para Cancelamento (horas)"
              type="number"
              value={formData.hoursBeforeCancellation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hoursBeforeCancellation: e.target.value,
                })
              }
            />
            <MyTextInput
              label="Limite de Pessoas"
              type="number"
              value={formData.personsLimit}
              onChange={(e) =>
                setFormData({ ...formData, personsLimit: e.target.value })
              }
            />
          </>
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
