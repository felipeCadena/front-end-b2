"use client";

import React from "react";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTextarea from "@/components/atoms/my-textarea";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import {
  capitalizeFirstLetter,
  convertToHours,
  convertToTimeString,
  getDifficultyDescription,
  getDifficultyNumber,
} from "@/utils/formatters";
import { days, dificulties } from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import { adventures } from "@/services/api/adventures";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ModalProps } from "@/components/organisms/edit-activity";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import Duration from "@/components/molecules/duration";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import LanguageSelector from "@/components/molecules/group-checkbox";
import ModalAlert from "@/components/molecules/modal-alert";

export default function BasicInfo({
  formData,
  setFormData,
  onClose,
  isApproved,
}: ModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [showWarning, setShowWarning] = React.useState(false);
  const queryClient = useQueryClient();

  const formatDuration = (hours: string) => {
    if (!hours) return "";

    const [h, m] = hours.split(":");

    // Garante que temos números válidos
    const hour = parseInt(h);
    const minute = parseInt(m);

    if (isNaN(hour)) return "";

    const formattedHour = hour <= 9 ? `0${hour}` : `${hour}`;
    const formattedMinute =
      !isNaN(minute) && minute > 0
        ? `${minute > 9 ? minute : `0${minute}`}`
        : "00";

    return `${formattedHour}:${formattedMinute}`;
  };

  React.useEffect(() => {
    if (formData?.languages) {
      try {
        const parsed = JSON.parse(formData?.languages);
        setSelected(parsed);
      } catch {
        setSelected([]);
      }
    }
  }, [formData?.languages]);

  React.useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      languages: JSON.stringify(selected),
    }));
  }, [selected, setFormData]);

  const handleItemsIncluded = () => {
    const items = JSON.parse(formData?.itemsIncluded || "[]");
    const included = [];

    if (items.includes("Água")) included.push("Água");
    if (items.includes("Alimentação")) included.push("Alimentação");
    if (items.includes("Combustível")) included.push("Combustível");

    return JSON.stringify(included);
  };

  const updateItemsIncluded = (
    item: string,
    value: string,
    current: string
  ): string => {
    const items: string[] = JSON.parse(current || "[]");
    let updated: string[];

    if (value == "true") {
      updated = items.includes(item) ? items : [...items, item];
    } else {
      updated = items.filter((i) => i !== item);
    }

    return JSON.stringify(updated);
  };

  const data = React.useMemo(() => {
    if (!formData) return {};

    return {
      itemsIncluded: handleItemsIncluded(),
      difficult: formData.difficult,
      transportIncluded: formData.transportIncluded,
      picturesIncluded: formData.picturesIncluded,
      title: formData.title,
      description: formData.description,
      hoursBeforeSchedule: formData.hoursBeforeSchedule,
      hoursBeforeCancellation: formData.hoursBeforeCancellation,
      transportAddress: formData.transportAddress,
      duration: formData.duration,
      typeAdventure: formData.typeAdventure,
      languages: formData.languages,
    };
  }, [formData]);

  const handleSubmit = async () => {
    if (isApproved && !showWarning) {
      setShowWarning(true);
      return;
    }

    setIsLoading(true);

    try {
      await adventures.updateAdventureById(formData.id, data);

      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success(
        isApproved
          ? "Alterações enviadas para aprovação!"
          : "Atividade atualizada com sucesso!"
      );
      setShowWarning(false);
      onClose();
    } catch (error) {
      toast.error("Erro ao atualizar atividade");
      console.error("Error updating adventure:", error);
    }
    setIsLoading(false);
  };

  return (
    <section className="">
      <ModalAlert
        open={showWarning}
        onClose={() => setShowWarning(false)}
        onAction={handleSubmit}
        iconName="warning"
        title="Alteração em atividade aprovada"
        descrition="Esta atividade já está aprovada e online. As alterações que você fizer precisarão ser validadas pelo administrador da B2 Adventure antes de serem publicadas no site."
        button="Continuar"
        isLoading={isLoading}
      />

      <div className="flex gap-4 items-center mb-10">
        <MyIcon name="voltar-black" className="-ml-2" onClick={onClose} />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Editar Informações Gerais
        </MyTypography>
      </div>

      <div className="space-y-6">
        <ActivitiesFilter
          withText={false}
          setSelected={(value) =>
            setFormData({
              ...formData,
              typeAdventure: value,
            })
          }
          selected={formData?.typeAdventure}
        />

        <MyTextInput
          label="Título"
          value={formData?.title}
          className="mt-1"
          onChange={(e) =>
            setFormData({
              ...formData,
              title: capitalizeFirstLetter(e.target.value),
            })
          }
        />
        <div>
          <MyTextarea
            label="Descrição"
            rows={5}
            className="resize-y"
            maxLength={2000}
            value={formData?.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="text-sm text-gray-4 text-right mt-1">
            {formData?.description?.length} / 2000 caracteres
          </div>
        </div>
      </div>

      <LanguageSelector
        selected={JSON.parse(formData?.languages || "[]")}
        setSelected={setSelected}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 space-y-6">
        <MySelect
          label="Grau de Dificuldade"
          className="text-base text-black mt-6"
          value={getDifficultyDescription(formData?.difficult) ?? "Selecione"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              difficult: getDifficultyNumber(value),
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {dificulties.map((dificulty) => (
              <SelectItem key={dificulty} value={dificulty}>
                {dificulty}
              </SelectItem>
            ))}
          </SelectContent>
        </MySelect>

        <MySelect
          label="Transporte Incluso"
          className="text-base text-black"
          value={formData?.transportIncluded ? "true" : "false"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              transportIncluded: value == "true",
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não Oferecemos</SelectItem>
          </SelectContent>
        </MySelect>

        {formData?.transportIncluded && (
          <MyTextInput
            value={formData?.transportAddress}
            onChange={(value) =>
              setFormData({ ...formData, transportAddress: value.target.value })
            }
            placeholder="Local de saída e retorno"
            label="Local de saída e retorno"
            className="mt-1"
            classNameLabel="text-base text-black"
          />
        )}

        <MySelect
          label="Fotos da atividade inclusa"
          className="text-base text-black"
          value={formData?.picturesIncluded ? "true" : "false"}
          onValueChange={(value) =>
            setFormData({
              ...formData,

              picturesIncluded: value == "true",
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não Oferecemos</SelectItem>
          </SelectContent>
        </MySelect>

        <MySelect
          label="Água inclusa"
          className="text-base text-black"
          value={
            JSON.parse(formData?.itemsIncluded || "[]").includes("Água")
              ? "true"
              : "false"
          }
          onValueChange={(value) =>
            setFormData({
              ...formData,
              itemsIncluded: updateItemsIncluded(
                "Água",
                value,
                formData?.itemsIncluded
              ),
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não Oferecemos</SelectItem>
          </SelectContent>
        </MySelect>

        <MySelect
          label="Alimentação inclusa"
          className="text-base text-black"
          value={
            JSON.parse(formData?.itemsIncluded || "[]").includes("Alimentação")
              ? "true"
              : "false"
          }
          onValueChange={(value) =>
            setFormData({
              ...formData,
              itemsIncluded: updateItemsIncluded(
                "Alimentação",
                value,
                formData?.itemsIncluded
              ),
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não Oferecemos</SelectItem>
          </SelectContent>
        </MySelect>

        <MySelect
          label="Combustível incluso"
          className="text-base text-black"
          value={
            JSON.parse(formData?.itemsIncluded || "[]").includes("Combustível")
              ? "true"
              : "false"
          }
          onValueChange={(value) =>
            setFormData({
              ...formData,
              itemsIncluded: updateItemsIncluded(
                "Combustível",
                value,
                formData?.itemsIncluded
              ),
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não Oferecemos</SelectItem>
          </SelectContent>
        </MySelect>

        <MySelect
          label="Antecedência de Agendamento"
          className="text-base text-black"
          value={String(convertToTimeString(formData?.hoursBeforeSchedule))}
          onValueChange={(value) =>
            setFormData({
              ...formData,

              hoursBeforeSchedule: convertToHours(value),
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione o número de dias" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </MySelect>

        <MySelect
          name="daysBeforeCancellation"
          label="Antecedência de Cancelamento"
          className="text-base text-black"
          value={String(convertToTimeString(formData?.hoursBeforeCancellation))}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              hoursBeforeCancellation: convertToHours(value),
            })
          }
        >
          <SelectTrigger className="py-6 myt1">
            <SelectValue placeholder="Selecione o número de dias" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </MySelect>

        <div>
          <MyTypography
            variant="label"
            weight="bold"
            className="mb-1 text-base text-black"
          >
            Duração
          </MyTypography>
          <Duration
            iconColor="black"
            selectedTime={formatDuration(formData?.duration)}
            setSelectedTime={(time) =>
              setFormData({ ...formData, duration: formatDuration(time) })
            }
          />
        </div>
      </div>

      <div className="md:w-1/2 md:mx-auto mt-12">
        <MyButton
          type="submit"
          borderRadius="squared"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Salvar
        </MyButton>
      </div>
    </section>
  );
}
