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
import { ModalProps } from "@/components/organisms/edit-activity";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { cn } from "@/utils/cn";

export default function Pricing({
  formData,
  setFormData,
  onClose,
}: ModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const b2Tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX_B2;
  const tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX;
  const freeTax = process.env.NEXT_PUBLIC_FREE_TAX;

  const handleTaxDetails = () => {
    const taxB2Percentage = Number(b2Tax) || 0;
    const taxPercentage = Number(tax) || 0;

    const b2Fee = (Number(formData?.priceAdult) * taxB2Percentage) / 100;
    const taxTotal = (Number(b2Fee) * taxPercentage) / 100;

    const realTax = (taxTotal * taxPercentage) / 100;
    const allTax = taxTotal + realTax;

    if (Boolean(freeTax)) {
      return {
        valorParceiro: formData?.priceAdult,
        b2Fee: b2Fee.toFixed(2),
        tax: Math.round(allTax),
        totalCliente: formData?.priceAdult,
      };
    }

    const totalCliente =
      Number(formData?.priceAdult) + b2Fee + taxTotal + realTax;

    return {
      valorParceiro: formData?.priceAdult,
      b2Fee,
      tax: Math.round(allTax),
      totalCliente: Math.round(totalCliente),
    };
  };

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
      <div className="flex gap-4 items-center mb-8">
        <MyIcon name="voltar-black" className="-ml-2" onClick={onClose} />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Editar Valores
        </MyTypography>
      </div>
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

      <div className="flex flex-col my-8">
        <div className="flex justify-between mt-4">
          <MyTypography variant="subtitle3" weight="bold" className="mb-1">
            Valor do Parceiro
          </MyTypography>
          <MyTypography variant="subtitle3" weight="bold" className="mb-1">
            R$ {formData?.priceAdult ?? "0,00"}
          </MyTypography>
        </div>

        <div className="flex justify-between">
          <MyTypography
            variant="label"
            weight="regular"
            className={cn("mb-1", Boolean(freeTax) && "line-through")}
          >
            Tarifa B2
          </MyTypography>
          <MyTypography
            variant="label"
            weight="regular"
            className={cn("mb-1", Boolean(freeTax) && "line-through")}
          >
            R$ {handleTaxDetails().b2Fee ?? "0,00"}
          </MyTypography>
        </div>

        <div className="flex justify-between">
          <MyTypography
            variant="label"
            weight="regular"
            className={cn("mb-1", Boolean(freeTax) && "line-through")}
          >
            Imposto
          </MyTypography>
          <MyTypography
            variant="label"
            weight="regular"
            className={cn("mb-1", Boolean(freeTax) && "line-through")}
          >
            R$ {handleTaxDetails().tax ?? "0,00"}
          </MyTypography>
        </div>

        <div className="flex justify-between mt-1">
          <MyTypography
            variant="subtitle3"
            weight="bold"
            className="text-primary-600"
          >
            Valor total da Atividade
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="bold"
            className="text-primary-600"
          >
            R$ {handleTaxDetails().totalCliente ?? "0,00"}
          </MyTypography>
        </div>

        <MyTypography
          variant="button"
          weight="regular"
          lightness={500}
          className="my-2"
        >
          * Baseado no valor unitário adulto
        </MyTypography>
      </div>

      <div className="md:w-1/2 md:mx-auto mt-12 ">
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
