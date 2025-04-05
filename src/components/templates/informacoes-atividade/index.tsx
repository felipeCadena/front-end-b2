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
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
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
    setAdventureData,
  } = useAdventureStore();
  const params = "1";

  const b2Tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX;

  const handleTaxDetails = () => {
    const total = (priceAdult + priceChildren) * personsLimit;
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

  const handleNext = () => {
    if (edit) {
      router.push(
        `${PATHS.visualizarAtividadeParceiro(params)}?openModal=true`
      );
    } else {
      router.push(`${PATHS["minhas-atividades"]}?openModal=true`);
    }
  };

  const handleSubmit = async () => {
    try {
      // 1. Cria a aventura
      const adventureResponse = await adventures.createAdventure({
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
      });

      const adventureId = adventureResponse.id;

      // 2. Converte base64 para Blob e cria estrutura dos arquivos
      const files = await Promise.all(
        tempImages.map(async (base64Image, index) => {
          if (typeof base64Image !== "string") {
            throw new Error(
              "Esperado base64 string. Verifique o conteúdo de tempImages."
            );
          }

          const res = await fetch(base64Image);
          const arrayBuffer = await res.arrayBuffer();
          const blob = new Blob([arrayBuffer], {
            type: base64Image.substring(
              base64Image.indexOf(":") + 1,
              base64Image.indexOf(";")
            ),
          });

          return {
            filename: `image-${index}.jpg`,
            mimetype: blob.type,
            file: blob,
            isDefault: index === 0, // primeira imagem como default
          };
        })
      );

      // 3. Chama addMedia para obter os uploadUrls
      const uploadMedias = await adventures.addMedia(
        adventureId,
        files.map(({ filename, mimetype, isDefault }) => ({
          filename,
          mimetype,
          isDefault,
        }))
      );

      // 4. Envia os blobs para os uploadUrls
      await Promise.all(
        uploadMedias.map((media, index) =>
          fetch(media.uploadUrl, {
            method: "PUT",
            body: files[index].file,
            headers: {
              "Content-Type": files[index].mimetype,
            },
          }).then((res) => {
            if (!res.ok) {
              console.error(`Falha ao enviar imagem ${index}`, res);
            }
          })
        )
      );

      console.log("Aventura criada e imagens enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao criar aventura ou enviar imagens:", error);
    }
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
              setAdventureData({
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
              setAdventureData({
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
          className="mt-2 pl-12"
          noHintText
          leftIcon={<MyIcon name="small-group" className="ml-5 mt-6" />}
          value={personsLimit}
          onChange={(e) =>
            setAdventureData({
              personsLimit: Number(e.target.value),
            })
          }
        />

        <MyTextInput
          label="Valor por adulto"
          placeholder="R$ 200"
          className="mt-2 pl-12"
          noHintText
          leftIcon={<MyIcon name="dollar" className="ml-5 mt-5" />}
          value={priceAdult}
          onChange={(e) =>
            setAdventureData({
              priceAdult: Number(e.target.value),
            })
          }
        />

        <MyTextInput
          label="Valor por criança"
          placeholder="R$ 100"
          className="mt-2 pl-12"
          noHintText
          leftIcon={<MyIcon name="dollar" className="ml-5 mt-5" />}
          value={priceChildren}
          onChange={(e) =>
            setAdventureData({
              priceChildren: Number(e.target.value),
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
        {(edit || step) && (
          <MyButton
            variant="black-border"
            borderRadius="squared"
            leftIcon={<MyIcon name="seta" className="rotate-180" />}
            className="w-full font-bold"
            size="lg"
            onClick={onBack}
          >
            Voltar para etapa anterior
          </MyButton>
        )}
        {!edit && (
          <MyButton
            variant="black-border"
            borderRadius="squared"
            rightIcon={<MyIcon name="seta" className="ml-3" />}
            className="w-full font-bold"
            size="lg"
            onClick={() => router.push(PATHS.visualizarAtividade(params))}
          >
            Visualizar atividade
          </MyButton>
        )}

        <MyButton
          variant="default"
          borderRadius="squared"
          rightIcon={<MyIcon name="seta-direita" className="" />}
          className="w-full"
          size="lg"
          onClick={handleNext}
        >
          {edit ? "Concluir edição" : "Concluir atividade"}
        </MyButton>
      </div>
    </main>
  );
}
