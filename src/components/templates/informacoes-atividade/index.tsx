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
import { authService } from "@/services/api/auth";
import { partnerService } from "@/services/api/partner";
import { useAdventureStore } from "@/store/useAdventureStore";
import { useStepperStore } from "@/store/useStepperStore";
import { cn } from "@/utils/cn";
import { brlToApiNumberString } from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function InformacoesAtividade({
  edit,
  onBack,
  step,
  create = false,
}: {
  edit?: boolean;
  step?: boolean;
  onBack?: () => void;
  create?: boolean;
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
    availableDates,
    transportAddress,
    setAdventureData,
    clearAdventure,
  } = useAdventureStore();

  const {
    bankAccount,
    bankAgency,
    bankName,
    cnpjOrCpf,
    email,
    fantasyName,
    name,
    password,
    payday,
    phone,
    pixKey,
    clearForm,
    cpf,
    bankAccountDigit,
    bankAccountType,
    bankCode,
    pixAddressKeyType,
    bankOwnerName,
    bankOwnerDocument,
  } = useStepperStore();

  const { data: session } = useSession();

  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedGroup, setSelectedGroup] = React.useState("");
  const [selectedChildren, setSelectedChildren] = React.useState("");

  const b2Tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX_B2;
  const tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX;

  const { data: partner } = useQuery({
    queryKey: ["partner-tag"],
    queryFn: () => partnerService.getPartnerLogged(),
    enabled: !!session?.user,
  });

  // Aplicar desconto pra quem criar atividade até 01/06/2025
  const today = new Date();
  const cutoffDate = new Date("2025-05-31");
  const isFreeTaxPeriod = today <= cutoffDate;

  function parseFormattedNumber(value: string): number {
    if (!value) return 0;
    // Remove pontos (milhar) e troca vírgula por ponto (decimal)
    return Number(value.replace(/\./g, "").replace(",", "."));
  }

  // const handleTaxDetails = () => {
  //   const taxB2Percentage = Number(b2Tax) || 0;
  //   const taxPercentage = Number(tax) || 0;

  //   const adultPrice = parseFormattedNumber(priceAdult);

  //   const b2Fee = (Number(adultPrice) * taxB2Percentage) / 100;
  //   const taxTotal = (Number(b2Fee) * taxPercentage) / 100;

  //   const realTax = (taxTotal * taxPercentage) / 100;
  //   const allTax = taxTotal + realTax;

  //   if (isFreeTaxPeriod || partner?.tag == "LAUNCH") {
  //     return {
  //       valorParceiro: adultPrice,
  //       b2Fee,
  //       tax: Math.round(allTax),
  //       totalCliente: adultPrice,
  //     };
  //   }

  //   const totalCliente = Number(adultPrice) + b2Fee + taxTotal + realTax;

  //   return {
  //     valorParceiro: adultPrice,
  //     b2Fee,
  //     tax: Math.round(allTax),
  //     totalCliente: Math.round(totalCliente),
  //   };
  // };

  const formatCurrency = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    const number = (parseInt(numeric) / 100).toFixed(2);
    return number.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleTaxDetails = () => {
    const taxB2Percentage = Number(b2Tax) || 0;
    const taxPercentage = Number(tax) || 0;

    const adultPrice = parseFormattedNumber(String(priceAdult));

    const b2Fee = (adultPrice * taxB2Percentage) / 100;

    const taxTotal = (Number(b2Fee) * taxPercentage) / 100;

    const realTax = (taxTotal * taxPercentage) / 100;
    const allTax = taxTotal + realTax;

    if (isFreeTaxPeriod || partner?.tag == "LAUNCH") {
      return {
        valorParceiro: adultPrice,
        b2Fee: b2Fee.toFixed(2),
        tax: Math.round(allTax),
        totalCliente: adultPrice,
      };
    }

    const totalCliente = adultPrice + b2Fee + taxTotal + realTax;

    return {
      valorParceiro: adultPrice,
      b2Fee: b2Fee.toFixed(2),

      tax: Math.round(allTax),
      totalCliente: Math.round(totalCliente),
    };
  };

  const coordinatesString = `${coordinates?.lat}:${coordinates?.lng}`;

  const handleItemsIncluded = () => {
    const items = [];
    if (waterIncluded) items.push("Água");
    if (foodIncluded) items.push("Alimentação");
    if (fuelIncluded) items.push("Combustível");
    // if (transportIncluded) items.push("Transporte");
    // if (picturesIncluded) items.push("Fotos");
    return JSON.stringify(items);
  };

  // Função pro fluxo de criação de parceiro + atividade
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedGroup) {
      toast.error("Preencha se a atividade é em grupo ou individual.");
      return;
    }

    if (!selectedChildren) {
      toast.error("Preencha se a atividade é com crianças ou sem crianças.");
      return;
    }

    if (!priceAdult) {
      toast.error("Preencha o valor por adulto.");
      return;
    }
    if (isInGroup && !personsLimit) {
      toast.error("Preencha a quantidade de pessoas.");
      return;
    }

    if (isChildrenAllowed && !priceChildren) {
      toast.error("Preencha o valor por criança.");
      return;
    }

    const user = {
      name,
      email,
      password,
      cpf,
      phone,
    };

    const partner = {
      fantasyName,
      businessEmail: email,
      businessPhone: phone,
      cnpj: cnpjOrCpf.length != 18 ? undefined : cnpjOrCpf,
      cpf: cnpjOrCpf.length == 14 ? cnpjOrCpf : undefined,
      bankAccount,
      bankAgency,
      bankName,
      pixKey: pixKey.length == 0 ? undefined : pixKey,
      payday,
      companyName: fantasyName,
      bankAccountDigit,
      bankAccountType:
        bankAccountType?.length == 0 ? undefined : bankAccountType,
      bankCode,
      pixAddressKeyType:
        pixAddressKeyType?.length == 0 ? undefined : pixAddressKeyType,
      bankOwnerName,
      bankOwnerDocument,
      about: undefined,
      address: undefined,
    };

    const adventure = {
      title,
      pointRefAddress,
      typeAdventure: typeAdventure as "terra" | "ar" | "mar",
      coordinates: coordinatesString,
      isInGroup,
      isChildrenAllowed,
      priceAdult:
        priceAdult.length > 0 ? brlToApiNumberString(priceAdult) : "0",
      priceChildren:
        priceChildren.length > 0 ? brlToApiNumberString(priceChildren) : "0",
      personsLimit: isInGroup ? personsLimit : 1,
      addressCity,
      addressNeighborhood,
      addressState,
      transportAddress,
      addressStreet,
      addressPostalCode,
      addressNumber,
      addressComplement,
      addressCountry,
      description,
      partnerId: "",
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

    try {
      setIsLoading(true);

      const response = await partnerService.createPartnerAndAdventure(
        user,
        partner,
        adventure
      );

      const credentials = {
        email,
        password,
      };

      const adventureId = response?.adventure?.id;
      const access_token = response?.tokens?.access_token;

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
            filename: `image-${index}.${blob.type.split("/")[1]}`, // nome do arquivo
            mimetype: blob.type,
            file: blob,
            isDefault: index === 0, // primeira imagem como default
          };
        })
      );

      const uploadMedias = await adventures.addMediaWithToken(
        String(adventureId),
        files.map(({ filename, mimetype, isDefault }) => ({
          filename,
          mimetype,
          isDefault,
        })),
        access_token
      );
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

      clearForm();
      clearAdventure();

      await signIn("credentials", {
        ...credentials,
        callbackUrl: `${PATHS.visualizarAtividadeParceiro(adventureId)}?openModal=true`,
      });

      console.log("Aventura criada e imagens enviadas com sucesso!");
    } catch (err) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message ||
          "Erro ao criar parceiro e/ou aventura.";
        toast.error(
          `${typeof message === "string" && message !== null ? `Erro: ${message}` : "Erro desconhecido ao criar parceiro e/ou aventura."}`
        );
      } else {
        toast.error("Erro desconhecido ao criar parceiro e/ou aventura.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Função apenas pra criar atividade
  const handleCreateAdventure = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!selectedGroup) {
      toast.error("Preencha se a atividade é em grupo ou individual.");
      return;
    }

    if (!selectedChildren) {
      toast.error("Preencha se a atividade é com crianças ou sem crianças.");
      return;
    }

    if (!priceAdult) {
      toast.error("Preencha o valor por adulto.");
      return;
    }
    if (isInGroup && !personsLimit) {
      toast.error("Preencha a quantidade de pessoas.");
      return;
    }

    if (isChildrenAllowed && !priceChildren) {
      toast.error("Preencha o valor por criança.");
      return;
    }

    try {
      // 1. Cria a aventura

      const adventure = {
        title,
        pointRefAddress,
        typeAdventure: typeAdventure as "terra" | "ar" | "mar",
        coordinates: coordinatesString,
        isInGroup,
        isChildrenAllowed,
        priceAdult:
          priceAdult.length > 0 ? brlToApiNumberString(priceAdult) : "0",
        priceChildren:
          priceChildren.length > 0 ? brlToApiNumberString(priceChildren) : "0",
        personsLimit: isInGroup ? personsLimit : 1,
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
        transportAddress,
      };

      setIsLoading(true);

      // 2. Cria a aventura com o access_token
      const adventureResponse = await adventures.createAdventure(adventure);

      const adventureId = adventureResponse.id;

      // Se a atividade não for repetida, cria os horários
      if (!isRepeatable && availableDates) {
        try {
          await partnerService.createMoreSchedule(adventureId, availableDates);
        } catch (err) {
          console.log(err);
          if (err instanceof AxiosError) {
            const message =
              err.response?.data?.message || "Erro ao criar horários.";
            toast.error(
              `${typeof message === "string" && message !== null ? `Erro: ${message}` : "Erro ao criar horários."}`
            );
          } else {
            toast.error("Erro ao criar horários.");
          }
          return;
        }
      }
      // 3. Converte base64 para Blob e cria estrutura dos arquivos
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
            filename: `image-${index}.${blob.type.split("/")[1]}`, // nome do arquivo
            mimetype: blob.type,
            file: blob,
            isDefault: index === 0, // primeira imagem como default
          };
        })
      );

      try {
        // 4. Chama addMedia para obter os uploadUrls
        const uploadMedias = await adventures.addMedia(
          String(adventureId),
          files.map(({ filename, mimetype, isDefault }) => ({
            filename,
            mimetype,
            isDefault,
          }))
        );

        // 5. Envia os blobs para os uploadUrls
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
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          const message =
            err.response?.data?.message || "Erro ao adicionar imagens.";
          toast.error(
            `${typeof message === "string" && message !== null ? `Erro: ${message}` : "Erro ao adicionar imagens."}`
          );
        } else {
          toast.error("Erro ao adicionar imagens.");
        }
        return;
      }

      // 6. Limpa o estado global
      clearForm();
      clearAdventure();

      // 7. Redireciona para a página de visualização da atividade
      router.push(
        `${PATHS.visualizarAtividadeParceiro(adventureId)}?openModal=true`
      );

      console.log("Aventura criada e imagens enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao criar aventura ou enviar imagens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <main className="w-full max-w-md md:max-w-3xl mx-auto md:p-4">
      <div className={cn("relative md:hidden", (edit || step) && "hidden")}>
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
              item.title ===
                (selectedGroup == "Em grupo"
                  ? "Em grupo"
                  : !isInGroup && "Individual") &&
                "border border-black bg-[#E5E4E9] opacity-100"
            )}
            onClick={() => {
              setSelectedGroup(item.title);
              setAdventureData({
                isInGroup: item.title == "Em grupo" ? true : false,
              });
            }}
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
                (selectedChildren == "Com crianças"
                  ? "Com crianças"
                  : !isChildrenAllowed &&
                    selectedChildren == "Sem crianças" &&
                    "Sem crianças") &&
                "border border-black bg-[#E5E4E9] opacity-100"
            )}
            onClick={() => {
              setSelectedChildren(item.title);
              setAdventureData({
                isChildrenAllowed: item.title == "Com crianças" ? true : false,
              });
            }}
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
          className="mt-2"
          noHintText
          leftIcon={<MyIcon name="small-group" className="ml-2 mt-6" />}
          value={isInGroup ? personsLimit : "1"}
          onChange={(e) =>
            setAdventureData({
              personsLimit: isInGroup ? Number(e.target.value) : 1,
            })
          }
        />

        <MyTextInput
          label="Valor por adulto"
          placeholder="R$ 200"
          className="mt-2"
          noHintText
          leftIcon={<MyIcon name="dollar" className="ml-2 mt-6" />}
          value={priceAdult}
          onChange={(e) =>
            setAdventureData({
              priceAdult: formatCurrency(e.target.value),
            })
          }
        />

        {isChildrenAllowed && (
          <MyTextInput
            label="Valor por criança"
            placeholder="R$ 100"
            className="mt-2 "
            noHintText
            leftIcon={<MyIcon name="dollar" className="ml-2 mt-6" />}
            value={priceChildren}
            onChange={(e) =>
              setAdventureData({
                priceChildren: formatCurrency(e.target.value),
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
            R$ {priceAdult ?? "0,00"}
          </MyTypography>
        </div>

        <div className="flex justify-between">
          <MyTypography
            variant="label"
            weight="regular"
            className={cn(
              "mb-1",
              (isFreeTaxPeriod || partner?.tag == "LAUNCH") && "line-through"
            )}
          >
            Tarifa B2
          </MyTypography>
          <MyTypography
            variant="label"
            weight="regular"
            className={cn(
              "mb-1",
              (isFreeTaxPeriod || partner?.tag == "LAUNCH") && "line-through"
            )}
          >
            R$ {handleTaxDetails().b2Fee ?? "0,00"}
          </MyTypography>
        </div>

        <div className="flex justify-between">
          <MyTypography
            variant="label"
            weight="regular"
            className={cn(
              "mb-1",
              (isFreeTaxPeriod || partner?.tag == "LAUNCH") && "line-through"
            )}
          >
            Imposto
          </MyTypography>
          <MyTypography
            variant="label"
            weight="regular"
            className={cn(
              "mb-1",
              (isFreeTaxPeriod || partner?.tag == "LAUNCH") && "line-through"
            )}
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
        {create ? (
          <MyButton
            variant="default"
            borderRadius="squared"
            rightIcon={<MyIcon name="seta-direita" className="" />}
            className="w-full"
            size="lg"
            isLoading={isLoading}
            onClick={handleCreateAdventure}
          >
            Concluir atividade
          </MyButton>
        ) : (
          <MyButton
            variant="default"
            borderRadius="squared"
            rightIcon={<MyIcon name="seta-direita" className="" />}
            className="w-full"
            size="lg"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            {edit ? "Concluir edição" : "Concluir atividade"}
          </MyButton>
        )}
      </div>
    </main>
  );
}
