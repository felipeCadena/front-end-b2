"use client";

import {
  isChildrenAllowedTypes,
  isInGroupTypes,
} from "@/common/constants/constants";
import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyLogo from "@/components/atoms/my-logo";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import { adventures } from "@/services/api/adventures";
import { useAdventureStore } from "@/store/useAdventureStore";
import { useEditAdventureStore } from "@/store/useEditAdventureStore";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function InformacoesAtividade({
  edit,
  onBack,
  step,
}: {
  edit?: boolean;
  step?: boolean;
  onBack?: () => void;
}) {
  const router = useRouter();
  const {
    isInGroup,
    isChildrenAllowed,
    priceChildren,
    priceAdult,
    personsLimit,
    addressCity,
    addressNeighborhood,
    addressState,
    addressStreet,
    addressPostalCode,
    addressNumber,
    addressComplement,
    addressCountry,
    pointRefAddress,
    description,
    difficult,
    itemsIncluded,
    transportIncluded,
    picturesIncluded,
    waterIncluded,
    foodIncluded,
    fuelIncluded,
    duration,
    hoursBeforeSchedule,
    hoursBeforeCancellation,
    isRepeatable,
    recurrences,
    tempImages,
    title,
    typeAdventure,
    coordinates,
    setEditData,
  } = useEditAdventureStore();

  const { id } = useParams();

  const b2Tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX;

  const handleTaxDetails = () => {
    const total = (Number(priceAdult) + Number(priceChildren)) * personsLimit;
    const tax = (total * Number(b2Tax)) / 100;
    const totalWithTax = total - tax;

    return {
      total,
      tax: tax ?? "30%",
      totalWithTax,
    };
  };

  const coordinatesString = `${coordinates?.lat}x${coordinates?.lng}`;

  const handleItemsIncluded = () => {
    const items = [];
    if (waterIncluded) items.push("Água");
    if (foodIncluded) items.push("Alimentação");
    if (fuelIncluded) items.push("Combustível");
    if (transportIncluded) items.push("Transporte");
    if (picturesIncluded) items.push("Fotos");
    return JSON.stringify(items);
  };

  const adventure = {
    title,
    pointRefAddress,
    typeAdventure: typeAdventure as "terra" | "ar" | "mar",
    coordinates: coordinatesString,
    isInGroup,
    isChildrenAllowed,
    priceAdult,
    priceChildren,
    personsLimit,
    addressCity,
    addressNeighborhood,
    addressState,
    addressStreet,
    addressPostalCode,
    addressNumber,
    addressComplement,
    addressCountry,
    description,
    difficult,
    itemsIncluded: handleItemsIncluded(),
    transportIncluded,
    picturesIncluded,
    duration,
    hoursBeforeSchedule,
    hoursBeforeCancellation,
    isRepeatable,
    recurrences,
  };

  console.log(adventure);
  console.log(tempImages);

  const handleSubmit = async () => {
    //     try {
    //       // 1. Atualiza a aventura
    //       const adventureResponse = await adventures.updateAdventureById(Number(id), adventure);
    //       // 2. Processa as imagens
    //       for (const image of tempImages) {
    //         if (image.file) {
    //           // Nova imagem
    //           const mediaResponse = await adventures.updateMedia(Number(id), [{
    //             filename: image.file.name,
    //             mimetype: image.file.type,
    //             isDefault: image.isDefault || false
    //           }]);
    //           // Upload do arquivo
    //           await fetch(mediaResponse[0].uploadUrl, {
    //             method: "PUT",
    //             body: image.file,
    //             headers: {
    //               "Content-Type": image.file.type,
    //             },
    //           });
    //         } else if (image.id) {
    //           // Imagem existente - atualiza apenas se necessário
    //           await adventures.updateMedia(Number(id), Number(image.id))
    //       }
    //       router.push(`${PATHS.visualizarAtividadeParceiro(Number(id))}?openModal=true`);
    //     } catch (error) {
    //       console.error("Erro ao atualizar aventura ou imagens:", error);
    //     }
    // }
  };

  return (
    <main className="w-full max-w-md md:max-w-3xl mx-auto md:p-4">
      <div className={cn("relative md:hidden", edit && "hidden")}>
        <MyLogo variant="mobile" width={100} height={100} className="mx-auto" />
        <MyIcon
          name="voltar"
          className="absolute bottom-8 left-0"
          onClick={() => router.back()}
        />
      </div>

      <MyTypography variant="heading2" weight="bold" className="max-sm:hidden">
        Informações da Atividade
      </MyTypography>
      <MyTypography variant="subtitle3" weight="medium" lightness={400}>
        Essa atividade será realizada:
      </MyTypography>

      <div className="grid grid-cols-2 gap-4 my-6 md:my-8">
        {isInGroupTypes.map((item, index) => (
          <MyButton
            key={index}
            variant="outline-muted"
            size="sm"
            className={cn(
              "flex justify-center gap-2 rounded-md py-6 border border-black text-nowrap",
              item.title === (isInGroup ? "Em grupo" : "Individual") &&
                "border border-black bg-[#E5E4E9] opacity-100"
            )}
            onClick={() =>
              setEditData({
                isInGroup: item.title == "Em grupo" ? true : false,
              })
            }
          >
            <MyIcon name={item.icon as IconsMapTypes} className="" />
            <span className="">{item.title}</span>
          </MyButton>
        ))}
        {isChildrenAllowedTypes.map((item, index) => (
          <MyButton
            key={index}
            variant="outline-muted"
            size="sm"
            className={cn(
              "flex justify-center gap-2 rounded-md py-6 border border-black text-nowrap",
              item.title ===
                (isChildrenAllowed ? "Com crianças" : "Sem crianças") &&
                "border border-black bg-[#E5E4E9] opacity-100"
            )}
            onClick={() =>
              setEditData({
                isChildrenAllowed: item.title == "Com crianças" ? true : false,
              })
            }
          >
            <MyIcon name={item.icon as IconsMapTypes} className="" />
            <span className="">{item.title}</span>
          </MyButton>
        ))}
      </div>

      <div className="space-y-4">
        <MyTextInput
          label="Quantidade de pessoas"
          placeholder="Digite a quantidade de pessoas"
          classNameLabel="font-bold text-black"
          className="pl-12"
          noHintText
          leftIcon={<MyIcon name="small-group" className="ml-5 mt-6" />}
          value={personsLimit}
          onChange={(e) =>
            setEditData({
              personsLimit: Number(e.target.value),
            })
          }
        />

        <MyTextInput
          label="Valor por adulto"
          placeholder="R$ 200"
          className="pl-12"
          noHintText
          leftIcon={<MyIcon name="dollar" className="ml-5 mt-5" />}
          value={priceAdult}
          onChange={(e) =>
            setEditData({
              priceAdult: e.target.value,
            })
          }
        />

        <MyTextInput
          label="Valor por criança"
          placeholder="R$ 100"
          className="pl-12"
          noHintText
          leftIcon={<MyIcon name="dollar" className="ml-5 mt-5" />}
          value={priceChildren}
          onChange={(e) =>
            setEditData({
              priceChildren: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col my-8">
        <div className="flex justify-between">
          <MyTypography variant="label" weight="regular" className="mb-1">
            Custo Adultos
          </MyTypography>
          <MyTypography variant="label" weight="bold" className="mb-1">
            R$ {priceAdult ?? "0,00"}
          </MyTypography>
        </div>
        <div className="flex justify-between">
          <MyTypography variant="label" weight="regular" className="mb-1">
            Custo Crianças
          </MyTypography>
          <MyTypography variant="label" weight="bold" className="mb-1">
            R$ {priceChildren ?? "0,00"}
          </MyTypography>
        </div>

        <div className="flex justify-between">
          <MyTypography variant="label" weight="regular" className="mb-1">
            Tarifa B2
          </MyTypography>
          <MyTypography variant="label" weight="bold" className="mb-1">
            R$ {handleTaxDetails().tax ?? "0,00"}
          </MyTypography>
        </div>

        <div className="flex justify-between mt-1">
          <MyTypography
            variant="label"
            weight="regular"
            className="text-primary-600"
          >
            Valor total da Atividade
          </MyTypography>
          <MyTypography
            variant="label"
            weight="bold"
            className="text-primary-600"
          >
            R$ {handleTaxDetails().total ?? "0,00"}
          </MyTypography>
        </div>
      </div>

      <div className={cn("space-y-8 my-6")}>
        <MyButton
          variant="black-border"
          borderRadius="squared"
          leftIcon={<MyIcon name="seta" className="rotate-180" />}
          className="w-full font-bold"
          size="lg"
          onClick={() => router.back()}
        >
          Voltar para etapa anterior
        </MyButton>

        <MyButton
          variant="default"
          borderRadius="squared"
          rightIcon={<MyIcon name="seta-direita" className="" />}
          className="w-full"
          size="lg"
          onClick={handleSubmit}
        >
          Concluir edição
        </MyButton>
      </div>
    </main>
  );
}
