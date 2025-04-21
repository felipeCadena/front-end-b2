"use client";

import { useEffect, useState } from "react";
import { EditSection } from "./edit-activity-menu";
import BasicInfo from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/basic-info";
import UpdateImages from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/images";
import Pricing from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/pricing";
import Schedules from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/schedules";
import Location from "@/app/(pages)/(parceiro)/parceiro/atividades-cadastradas/atividade/modules/location";
import { CalendarAvailability } from "./calendar-availability";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";

interface EditModalProps {
  section: EditSection;
  data: any; // Tipo da sua atividade
  onClose: () => void;
}

export type ModalProps = {
  formData: any;
  setFormData: (data: any) => void;
  onClose: () => void;
};

export function EditarAtividadeTemplate({
  section,
  data,
  onClose,
}: EditModalProps) {
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
      case "availability":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center mb-4">
              <MyIcon name="voltar-black" className="-ml-2" onClick={onClose} />
              <MyTypography variant="subtitle1" weight="bold" className="">
                Atualizar Disponibilidade
              </MyTypography>
            </div>
            <div className="relative mb-10">
              <CalendarAvailability formData={formData} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="px-4 mb-4">{renderForm()}</div>;
}
