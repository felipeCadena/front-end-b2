"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import {
  days,
  daysOfWeek,
  dificulties,
  hours,
} from "@/common/constants/constants";
import MultiSelect from "@/components/molecules/combobox";
import { MyDatePicker } from "@/components/molecules/my-date-picker";
import TimePickerModal from "@/components/molecules/time-picker";
import GoogleMaps from "@/components/organisms/google-maps";
import { Dropzone } from "@/components/molecules/drop-zone";
import Image from "next/image";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  Recurrence,
  TypeAdventure,
  useAdventureStore,
} from "@/store/useAdventureStore";
import MyTextarea from "@/components/atoms/my-textarea";
import {
  convertToHours,
  convertToTimeString,
  getDifficultyDescription,
  getDifficultyNumber,
} from "@/utils/formatters";
import AutocompleteInput from "@/components/organisms/google-autocomplete";
import { LoadScript, useLoadScript } from "@react-google-maps/api";
import GoogleTeste from "@/components/organisms/google-teste";

interface AddressData {
  addressStreet: string;
  addressPostalCode: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  coordinates: string;
}

interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
}

export default function WebForm({
  type,
  handleBack,
  handleNext,
}: {
  type?: string;
  handleBack?: () => void;
  handleNext?: () => void;
}) {
  const router = useRouter();
  const {
    setAdventureData,
    typeAdventure,
    description,
    title,
    hoursBeforeCancellation,
    hoursBeforeSchedule,
    selectionBlocks,
    addSelectionBlock,
    removeSelectionBlock,
    updateSelectionBlock,
    recurrences,
    difficult,
    duration,
    addressCity,
    addressNeighborhood,
    addressNumber,
    addressPostalCode,
    addressState,
    addressStreet,
    addressComplement,
    addressCountry,
  } = useAdventureStore();

  const [files, setFiles] = React.useState<File[] | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [adress, setAdress] = useState<LocationData | null>(null);

  console.log(addressCity);
  console.log(addressNeighborhood);
  console.log(addressNumber);
  console.log(addressPostalCode);
  console.log(addressState);
  console.log(addressStreet);
  console.log(addressComplement);
  console.log(addressCountry);

  // Atualiza as datas para um bloco específico
  const handleDateChange = (blockId: number, dates: Date[]) => {
    updateSelectionBlock(blockId, "dates", dates);
  };

  // Função para formatar os dados antes de salvar
  const formatRecurrences = (): Recurrence[] => {
    const formattedRecurrences: Recurrence[] = [];

    selectionBlocks.forEach((block) => {
      // Cria uma recorrência por bloco
      if (block.recurrenceHour.length > 0) {
        const recurrence: Recurrence = {
          recurrenceHour: block.recurrenceHour.join(","),
        };

        // Adiciona dias da semana se existirem
        if (block.recurrenceWeekly.length > 0) {
          recurrence.recurrenceWeekly = block.recurrenceWeekly
            .map((day) => daysOfWeek.findIndex((d) => d.value === day) + 1)
            .filter((index) => index !== -1)
            .sort((a, b) => a - b)
            .join(",");
        }

        // Adiciona dias do mês se existirem
        if (block.dates.length > 0) {
          recurrence.recurrenceMonthly = block.dates
            .map((date) => format(date, "dd"))
            .map((day) => parseInt(day))
            .sort((a, b) => a - b)
            .join(",");
        }

        // Só adiciona a recorrência se tiver pelo menos um tipo de recorrência
        if (recurrence.recurrenceWeekly || recurrence.recurrenceMonthly) {
          formattedRecurrences.push(recurrence);
        }
      }
    });

    return formattedRecurrences;
  };

  // Atualiza o store quando necessário
  useEffect(() => {
    const formattedRecurrences = formatRecurrences();
    console.log("Blocos de seleção:", selectionBlocks);
    console.log("Recorrências formatadas:", formattedRecurrences);

    setAdventureData({
      isRepeatable: formattedRecurrences.length > 0,
      recurrences: formattedRecurrences, // Agora salvamos as recorrências já formatadas
    });
  }, [selectionBlocks]);

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const handleNextStep = () => {
    handleNext && handleNext();
  };

  const handleSelectType = (value: TypeAdventure) => {
    setAdventureData({
      typeAdventure: value,
    });
  };

  const handleAddSelectionBlock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addSelectionBlock();
  };

  // Converte de "HH:mm" para "Xh" ou "XhYY"
  const formatDuration = (hours: string) => {
    if (!hours) return "";

    const [h, m] = hours.split("h");

    // Garante que temos números válidos
    const hour = parseInt(h);
    const minute = parseInt(m);

    if (isNaN(hour)) return "";

    // Mantém os minutos se existirem e forem diferentes de zero
    if (!isNaN(minute) && minute > 0) {
      return `${hour}h${minute}`;
    }

    return `${hour}h`;
  };

  const handleLocationSelected = (locationData: LocationData) => {
    setAdress({
      address: locationData.address,
      coordinates: locationData.coordinates,
    });
    // Função para extrair o CEP do endereço
    const extractPostalCode = (address: string) => {
      const cepRegex = /\d{5}-?\d{3}/;
      const match = address.match(cepRegex);
      return match ? match[0] : "";
    };

    // Função para parsear o endereço
    const parseAddress = (fullAddress: string) => {
      // Divide o endereço em partes usando a vírgula como separador
      const parts = fullAddress.split(",").map((part) => part.trim());

      // Primeira parte geralmente contém rua, número e bairro
      const firstPart = parts[0].split("-").map((part) => part.trim());
      const streetAndNumber = firstPart[0];
      const neighborhood = firstPart[1] || "";

      // Segunda parte geralmente contém cidade
      const city = parts[1]?.replace(/-.*$/, "").trim() || "";

      // Terceira parte geralmente contém estado
      const state = parts[1]?.split("-")[1]?.trim() || "";

      // Extrai número da rua (se houver)
      const numberMatch = streetAndNumber.match(/,?\s*(\d+)\s*$/);
      const number = numberMatch ? numberMatch[1] : "";
      const street = streetAndNumber.replace(/,?\s*\d+\s*$/, "");

      return {
        street,
        number,
        neighborhood,
        city,
        state,
        country: "BR",
        postalCode: extractPostalCode(fullAddress),
      };
    };

    const addressInfo = parseAddress(locationData.address);

    // Atualiza o store com os dados parseados
    setAdventureData({
      addressStreet: addressInfo.street,
      addressNumber: addressInfo.number,
      addressNeighborhood: addressInfo.neighborhood,
      addressCity: addressInfo.city,
      addressState: addressInfo.state,
      addressCountry: addressInfo.country,
      addressPostalCode: addressInfo.postalCode,
      addressComplement: "",
      coordinates: locationData.coordinates
        ? `${locationData.coordinates.lat}:${locationData.coordinates.lng}`
        : "",
    });
  };

  return (
    <main className="space-y-10 my-6">
      <form>
        <div>
          <MyTypography variant="heading2" weight="bold" className="mb-2">
            Cadastre a sua atividade
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="medium"
            lightness={400}
            className="mb-8"
          >
            Preencha os dados da sua atividade
          </MyTypography>
        </div>

        <ActivitiesFilter
          setSelected={handleSelectType}
          selected={typeAdventure}
        />

        <div className="border-2  border-gray-300 rounded-lg p-8">
          <div className="space-y-6">
            <MyTextInput
              value={title}
              onChange={(e) => setAdventureData({ title: e.target.value })}
              label="Nome da atividade"
              placeholder="Nome da atividade"
              className="mt-2"
            />

            <MyTextarea
              value={description}
              onChange={(e) =>
                setAdventureData({
                  description: e.target.value,
                })
              }
              label="Descrição da atividade"
              placeholder="Lorem ipsum dolor sit amet, consectetur di..."
              classNameLabel="text-black text-base font-bold"
              rows={5}
            />

            <div className="grid grid-cols-2 gap-8">
              <MySelect
                label="Antecedência de Agendamento"
                className="text-base text-black"
                value={String(convertToTimeString(hoursBeforeSchedule))}
                onValueChange={(value) =>
                  setAdventureData({
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
                value={String(convertToTimeString(hoursBeforeCancellation))}
                onValueChange={(value) =>
                  setAdventureData({
                    hoursBeforeCancellation: convertToHours(value),
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
            </div>
          </div>
          <div className="space-y-10 mt-6">
            <div>
              <MyTypography variant="subtitle3" weight="bold" className="mb-3">
                Repetir a atividade
              </MyTypography>

              <div className="space-y-4 flex flex-col items-center">
                {selectionBlocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="w-full border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
                  >
                    <MultiSelect
                      placeholder="Selecione dias da semana"
                      options={daysOfWeek}
                      selected={block.recurrenceWeekly}
                      setSelected={(value) =>
                        updateSelectionBlock(
                          block.id,
                          "recurrenceWeekly",
                          value
                        )
                      }
                    />

                    <MyDatePicker
                      withlabel="Selecione dias específicos"
                      selectedDates={block.dates}
                      setSelectedDates={(dates) =>
                        handleDateChange(block.id, dates)
                      }
                    />

                    <MultiSelect
                      grid
                      placeholder="Selecione os horários"
                      options={hours}
                      selected={block.recurrenceHour}
                      setSelected={(value) =>
                        updateSelectionBlock(block.id, "recurrenceHour", value)
                      }
                    />
                    {index > 0 && (
                      <MyIcon
                        name="subtracao"
                        title="Remover"
                        className="absolute -top-3 right-1"
                        onClick={() => removeSelectionBlock(block.id)}
                      />
                    )}
                  </div>
                ))}

                <MyButton
                  variant="secondary"
                  borderRadius="squared"
                  size="lg"
                  className="w-1/2 mx-auto"
                  onClick={(e) => handleAddSelectionBlock(e)}
                  leftIcon={<MyIcon name="soma" />}
                >
                  Adicionar outro conjunto
                </MyButton>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-8">
              <MySelect
                label="Grau de Dificuldade"
                className="text-base text-black"
                value={getDifficultyDescription(difficult) ?? ""}
                onValueChange={(value) =>
                  setAdventureData({
                    difficult: getDifficultyNumber(value) ?? undefined,
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

              <div>
                <MyTypography
                  variant="subtitle3"
                  weight="bold"
                  className="mb-1"
                >
                  Duração
                </MyTypography>

                <TimePickerModal
                  iconColor="black"
                  value={duration}
                  onChange={(time) =>
                    setAdventureData({ duration: formatDuration(time) })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-6 p-6 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 items-center gap-8">
              <div className="mb-4">
                <MyTypography
                  variant="subtitle4"
                  weight="bold"
                  className="mb-2"
                >
                  Local
                </MyTypography>

                <AutocompleteInput
                  icon={false}
                  className="text-neutral-600 text-base"
                  onLocationSelected={handleLocationSelected}
                />

                <GoogleTeste />
              </div>
              <MyTextInput
                label="Ponto de referência"
                placeholder="Próximo ao centro"
                classNameLabel="text-base text-black"
                className="mt-2"
                onChange={(e) =>
                  setAdventureData({
                    addressComplement: e.target.value,
                  })
                }
                value={addressComplement}
              />
            </div>

            <GoogleMaps
              location={{
                lat: adress?.coordinates?.lat ?? -22.9519,
                lng: adress?.coordinates?.lng ?? -43.2105,
              }}
              height="400px"
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-8 mt-6">
            <MySelect
              label="Transporte Incluso"
              className="text-base text-black"
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

          {/* Seção de Upload de Imagens */}
          <div className="mt-8">
            <MyTypography variant="subtitle3" weight="bold" className="mb-1">
              Imagens da Atividade
            </MyTypography>
            <MyTypography
              variant="body"
              weight="medium"
              lightness={400}
              className="mb-4"
            >
              Máximo de 5 fotos por atividade
            </MyTypography>

            <Dropzone
              ref={inputRef}
              disabled={files?.length == 5}
              onChange={(fileList) => {
                fileList &&
                  setFiles((prev) => {
                    if (prev) {
                      return [...prev, ...Array.from(fileList)];
                    }
                    return [...Array.from(fileList)];
                  });
              }}
              multiple={true}
              accept="jpg, png, image/*"
            >
              <div
                className="flex cursor-pointer flex-col items-center justify-center gap-y-2"
                onClick={handleClickUpload}
              >
                <MyIcon name="upload" />
                <div className="text-center space-y-2">
                  <MyTypography variant="body-big" lightness={400}>
                    Enviar imagens
                  </MyTypography>
                  <MyTypography lightness={400}>
                    ou arraste os arquivos aqui
                  </MyTypography>
                  <MyTypography lightness={400}>JPG e PNG</MyTypography>
                  <MyTypography lightness={400}>
                    Tamanho máximo de cada imagem: 1MB
                  </MyTypography>
                </div>
              </div>
            </Dropzone>

            <div className="grid grid-cols-5 gap-4 my-6">
              {Array.from({ length: 5 }).map((_, index) => {
                const file = files && files[index];
                return file ? (
                  <div key={file.name} className="relative">
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-[100px] rounded-md object-cover"
                    />
                    <MyIcon
                      name="x-red"
                      className="absolute top-1 right-1 cursor-pointer bg-white rounded-full"
                      onClick={() =>
                        setFiles((prev) =>
                          prev
                            ? prev.filter((item) => item.name !== file.name)
                            : []
                        )
                      }
                    />
                  </div>
                ) : (
                  <div
                    key={`placeholder-${index}`}
                    className="w-full h-[100px] border border-dashed border-neutral-400 rounded-md"
                  />
                );
              })}
            </div>
          </div>

          <div
            className={cn(
              "flex justify-center mt-12",
              type === "cadastro" && "hidden"
            )}
          >
            <MyButton
              size="lg"
              borderRadius="squared"
              className="w-1/2"
              rightIcon={<MyIcon name="seta-direita" />}
              onClick={() => router.push(PATHS["informacoes-atividades"])}
            >
              Próximo Passo
            </MyButton>
          </div>

          {type == "cadastro" && (
            <div className="flex justify-between items-center w-full max-w-3xl mx-auto p-4">
              <MyButton
                variant="default"
                borderRadius="squared"
                onClick={handleBack}
                leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
              >
                Voltar
              </MyButton>
              <MyButton
                variant="default"
                borderRadius="squared"
                onClick={handleNextStep}
                rightIcon={<MyIcon name="seta-direita" />}
              >
                Próximo
              </MyButton>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
