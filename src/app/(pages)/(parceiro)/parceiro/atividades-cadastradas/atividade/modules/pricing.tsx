"use client";

import React from "react";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import { adventures } from "@/services/api/adventures";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import MyButton from "@/components/atoms/my-button";
import { ModalProps } from "@/components/organisms/edit-modal";

export default function Pricing({
  formData,
  setFormData,
  onClose,
}: ModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const queryClient = useQueryClient();

  const data = {
    isInGroup: formData.isInGroup,
    isChildrenAllowed: formData.isChildrenAllowed,
    personsLimit: formData.personsLimit,
    priceAdult: formData.priceAdult,
    priceChildren: formData.priceChildren,
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
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <MySelect
          label="Atividade em grupo"
          className="text-base text-black"
          value={formData.isInGroup ? "true" : "false"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              isInGroup: value == "true",
            })
          }
        >
          <SelectTrigger className="py-6 ">
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
              isChildrenAllowed: value == "true",
            })
          }
        >
          <SelectTrigger className="py-6">
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

        <MyTextInput
          label="Quantidade de pessoas"
          placeholder="Digite a quantidade de pessoas"
          classNameLabel="font-bold text-black text-base"
          noHintText
          className="mt-1"
          value={formData.personsLimit}
          onChange={(e) =>
            setFormData({
              ...formData,

              personsLimit: formData.isInGroup ? Number(e.target.value) : 1,
            })
          }
        />

        <MyTextInput
          label="Valor por adulto"
          placeholder="R$ 200"
          className="mt-1"
          classNameLabel="font-bold text-black text-base"
          noHintText
          value={formData.priceAdult}
          onChange={(e) =>
            setFormData({
              ...formData,
              priceAdult: e.target.value,
            })
          }
        />

        {formData.isChildrenAllowed && (
          <MyTextInput
            label="Valor por criança"
            placeholder="R$ 100"
            className="mt-1"
            classNameLabel="font-bold text-black text-base"
            noHintText
            value={formData.priceChildren}
            onChange={(e) =>
              setFormData({
                ...formData,
                priceChildren: e.target.value,
              })
            }
          />
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4">
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
