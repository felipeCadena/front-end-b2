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
  getDifficultyDescription,
  getDifficultyNumber,
} from "@/utils/formatters";
import { dificulties } from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import { adventures } from "@/services/api/adventures";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type BasicInfoProps = {
  formData: any;
  setFormData: (data: any) => void;
  onClose: () => void;
};

export default function BasicInfo({
  formData,
  setFormData,
  onClose,
}: BasicInfoProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const handleItemsIncluded = () => {
    const items = JSON.parse(formData.itemsIncluded || "[]"); // garantimos que é array
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

  const data = {
    itemsIncluded: handleItemsIncluded(),
    isInGroup: formData.isInGroup,
    isChildrenAllowed: formData.isChildrenAllowed,
    personsLimit: formData.personsLimit,
    difficult: formData.difficult,
    transportIncluded: formData.transportIncluded,
    picturesIncluded: formData.picturesIncluded,
    title: formData.title,
    description: formData.description,
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await adventures.updateAdventureById(formData.id, data);

      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Atividade atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar atividade");
      console.error("Error updating adventure:", error);
    }
    setIsLoading(false);
    onClose();
  };
  return (
    <section className="space-y-4">
      <MyTextInput
        label="Título"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <MyTextarea
        label="Descrição"
        rows={5}
        className="rezize-y"
        maxLength={2000}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <MySelect
          label="Atividade em grupo"
          className="text-base text-black"
          value={formData.isInGroup ? "true" : "false"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              isInGroup: Boolean(value),
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="Em grupo" value="true">
              Em grupo
            </SelectItem>
            <SelectItem key="Individual" value="false">
              Individual
            </SelectItem>
          </SelectContent>
        </MySelect>

        <MySelect
          label="Permite Crianças"
          className="text-base text-black"
          value={formData.isChildrenAllowed ? "true" : "false"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              isChildrenAllowed: Boolean(value),
            })
          }
        >
          <SelectTrigger className="py-6 my-1">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="Com crianças" value="true">
              Com crianças
            </SelectItem>
            <SelectItem key="Sem crianças" value="false">
              Sem crianças
            </SelectItem>
          </SelectContent>
        </MySelect>

        <MySelect
          label="Grau de Dificuldade"
          className="text-base text-black"
          value={getDifficultyDescription(formData.difficult) ?? "Selecione"}
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

        <MyTextInput
          label="Quantidade de pessoas"
          placeholder="Digite a quantidade de pessoas"
          classNameLabel="font-bold text-black"
          noHintText
          className="mt-1"
          value={formData.personsLimit}
          onChange={(e) =>
            setFormData({
              ...formData,
              personsLimit: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <MySelect
          label="Transporte Incluso"
          className="text-base text-black"
          value={formData.transportIncluded ? "true" : "false"}
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

        <MySelect
          label="Fotos da atividade inclusa"
          className="text-base text-black"
          value={formData.picturesIncluded ? "true" : "false"}
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
            JSON.parse(formData.itemsIncluded || "[]").includes("Água")
              ? "true"
              : "false"
          }
          onValueChange={(value) =>
            setFormData({
              ...formData,
              itemsIncluded: updateItemsIncluded(
                "Água",
                value,
                formData.itemsIncluded
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
            JSON.parse(formData.itemsIncluded || "[]").includes("Alimentação")
              ? "true"
              : "false"
          }
          onValueChange={(value) =>
            setFormData({
              ...formData,
              itemsIncluded: updateItemsIncluded(
                "Alimentação",
                value,
                formData.itemsIncluded
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
            JSON.parse(formData.itemsIncluded || "[]").includes("Combustível")
              ? "true"
              : "false"
          }
          onValueChange={(value) =>
            setFormData({
              ...formData,
              itemsIncluded: updateItemsIncluded(
                "Combustível",
                value,
                formData.itemsIncluded
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
      </div>

      <div className="flex justify-end gap-2">
        <MyButton
          borderRadius="squared"
          size="lg"
          variant="outline-neutral"
          className="max-sm:w-full"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </MyButton>
        <MyButton
          type="submit"
          borderRadius="squared"
          size="lg"
          className="max-sm:w-full"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Salvar
        </MyButton>
      </div>
    </section>
  );
}
