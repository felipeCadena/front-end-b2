"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
import GoogleMaps from "@/components/organisms/google-maps";
import { Dropzone } from "@/components/molecules/drop-zone";
import Image from "next/image";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import {
  DateOption,
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
import AutocompleteCombobox from "@/components/organisms/google-autocomplete";
import { toast } from "react-toastify";
import { MySingleDatePicker } from "@/components/molecules/my-single-date-picker";
import Duration from "@/components/molecules/duration";

interface AddressData {
  addressStreet: string;
  addressPostalCode: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
}

interface LocationData {
  address: string;
  completeAddress: AddressData;
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
    difficult,
    duration,
    pointRefAddress,
    transportIncluded,
    picturesIncluded,
    waterIncluded,
    foodIncluded,
    fuelIncluded,
    tempImages,
    coordinates,
    address,
    isRepeatable,
    recurrences,
    availableDates,
    addTempImage,
  } = useAdventureStore();

  const inputRef = React.useRef<HTMLInputElement>(null);

  console.log(recurrences);
  console.log(availableDates);

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
        // if (block.dates.length > 0) {
        //   recurrence.recurrenceMonthly = block.dates
        //     .map((date) => format(date, "dd"))
        //     .map((day) => parseInt(day))
        //     .sort((a, b) => a - b)
        //     .join(",");
        // }

        // Só adiciona a recorrência se tiver pelo menos um tipo de recorrência
        if (recurrence.recurrenceWeekly) {
          formattedRecurrences.push(recurrence);
        }
      }
    });

    return formattedRecurrences;
  };

  const formatAvailableDates = (): DateOption[] => {
    const availableDates: DateOption[] = [];

    selectionBlocks.forEach((block) => {
      block.dates.forEach((date) => {
        block.recurrenceHour.forEach((hourStr) => {
          const [hour, minute] = hourStr.split(":").map(Number);

          const newDate = new Date(date);
          newDate.setHours(hour);
          newDate.setMinutes(minute);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);

          availableDates.push({
            datetime: format(newDate, "yyyy-MM-dd'T'HH:mm:ss"),
            isAvailable: true,
          });
        });
      });
    });

    return availableDates;
  };

  useEffect(() => {
    if (isRepeatable) {
      const formattedRecurrences = formatRecurrences();

      setAdventureData({
        recurrences: formattedRecurrences,
        availableDates: [],
      });
    } else {
      const formattedDates = formatAvailableDates();

      setAdventureData({
        recurrences: [],
        availableDates: formattedDates,
      });
    }
  }, [selectionBlocks, isRepeatable]);

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleNext && handleNext();
  };

  const handleBackStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleBack && handleBack();
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
      return `0${hour}:${minute}`;
    }

    return `0${hour}:00`;
  };

  const handleLocationSelected = (locationData: LocationData) => {
    console.log("Location Data Received:", locationData);

    if (locationData.coordinates) {
      // Atualiza o store com o endereço
      setAdventureData({
        address: locationData.address,
        addressStreet: locationData.completeAddress.addressStreet,
        coordinates: {
          lat: locationData.coordinates.lat,
          lng: locationData.coordinates.lng,
        },
        addressPostalCode: locationData.completeAddress.addressPostalCode,
        addressNumber: locationData.completeAddress.addressNumber,
        addressNeighborhood: locationData.completeAddress.addressNeighborhood,
        addressCity: locationData.completeAddress.addressCity,
        addressState: locationData.completeAddress.addressState,
      });
    }
  };

  const handleImages = (fileList: FileList) => {
    const files = Array.from(fileList);
    for (const file of files) {
      addTempImage(file); // Usa o método do store que já converte para base64 e salva como string
    }
  };

  // Somente para o cadastro isolado de atividade
  const handleNextStepRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !typeAdventure ||
      !title ||
      !description ||
      !hoursBeforeCancellation ||
      !hoursBeforeSchedule ||
      // !selectionBlocks.length ||
      duration === "" ||
      !tempImages.length ||
      !address
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (tempImages.length < 5) {
      toast.error("São necessárias 5 imagens.");
      return;
    }
    router.push(PATHS["informacoes-atividades"]);
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
              maxLength={2000}
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
                  variant="label"
                  weight="bold"
                  className="mb-1 text-base text-black"
                >
                  Duração
                </MyTypography>

                <Duration
                  iconColor="black"
                  selectedTime={duration}
                  setSelectedTime={(time) =>
                    setAdventureData({ duration: formatDuration(time) })
                  }
                />
              </div>
            </div>

            <div>
              {/* <MyTypography variant="subtitle3" weight="bold" className="mb-3">
                Repetir a atividade
              </MyTypography> */}
              <MySelect
                label="Calendário da atividade"
                className="text-base text-black"
                value={isRepeatable == true ? "true" : "false"}
                onValueChange={(value) =>
                  setAdventureData({
                    isRepeatable: value === "true",
                  })
                }
              >
                <SelectTrigger className="py-6 my-1">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Repetir a atividade</SelectItem>
                  <SelectItem value="false">Datas específicas</SelectItem>
                </SelectContent>
              </MySelect>

              {isRepeatable ? (
                <div className="space-y-8 flex flex-col items-center mt-8">
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

                      <MultiSelect
                        grid
                        placeholder="Selecione os horários"
                        options={hours}
                        duration={duration}
                        selected={block.recurrenceHour}
                        setSelected={(value) =>
                          updateSelectionBlock(
                            block.id,
                            "recurrenceHour",
                            value
                          )
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
              ) : (
                <div className="space-y-8 flex flex-col items-center mt-8">
                  {selectionBlocks.map((block, index) => (
                    <div
                      key={block.id}
                      className="w-full border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
                    >
                      {/* <MyDatePicker
                        withlabel="Selecione dias específicos"
                        selectedDates={block.dates}
                        setSelectedDates={(dates) =>
                          handleDateChange(block.id, dates)
                        }
                      /> */}

                      <MySingleDatePicker
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
                        duration={duration}
                        selected={block.recurrenceHour}
                        setSelected={(value) =>
                          updateSelectionBlock(
                            block.id,
                            "recurrenceHour",
                            value
                          )
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
                    className="w-1/2 mx-auto mt-4"
                    onClick={(e) => handleAddSelectionBlock(e)}
                    leftIcon={<MyIcon name="soma" />}
                  >
                    Adicionar outro conjunto
                  </MyButton>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 mt-6 p-6 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 items-center gap-8">
              <div className="">
                <MyTypography
                  variant="subtitle4"
                  weight="bold"
                  className="mb-2"
                >
                  Local
                </MyTypography>
                <AutocompleteCombobox
                  onLocationSelected={handleLocationSelected}
                  formData={address}
                  setFormData={setAdventureData}
                />
              </div>
              <MyTextInput
                label="Ponto de referência"
                placeholder="Próximo ao centro"
                classNameLabel="text-base text-black"
                className="mt-2"
                onChange={(e) =>
                  setAdventureData({
                    pointRefAddress: e.target.value,
                  })
                }
                value={pointRefAddress}
              />
            </div>

            <GoogleMaps
              location={{
                lat: coordinates?.lat ?? -22.9519,
                lng: coordinates?.lng ?? -43.2105,
              }}
              height="400px"
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-8 mt-6">
            <MySelect
              label="Transporte Incluso"
              className="text-base text-black"
              value={transportIncluded ? "true" : "false"}
              onValueChange={(value) =>
                setAdventureData({
                  transportIncluded: Boolean(value) ?? false,
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
              value={waterIncluded ? "true" : "false"}
              onValueChange={(value) =>
                setAdventureData({
                  waterIncluded: Boolean(value) ?? false,
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
              value={foodIncluded ? "true" : "false"}
              onValueChange={(value) =>
                setAdventureData({
                  foodIncluded: Boolean(value) ?? false,
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
              value={fuelIncluded ? "true" : "false"}
              onValueChange={(value) =>
                setAdventureData({
                  fuelIncluded: Boolean(value) ?? false,
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
              value={picturesIncluded ? "true" : "false"}
              onValueChange={(value) =>
                setAdventureData({
                  picturesIncluded: Boolean(value) ?? false,
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
              disabled={tempImages?.length == 5}
              onChange={(files) => files && handleImages(files)}
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
                const file = tempImages && tempImages[index];

                const isBase64 = typeof file === "string";
                const imageUrl = isBase64
                  ? file
                  : file instanceof File
                    ? URL.createObjectURL(file)
                    : "";

                return file ? (
                  <div key={index} className="relative w-full h-[100px] ">
                    <Image
                      fill
                      src={imageUrl}
                      alt={`Imagem ${index}`}
                      className="rounded-md object-cover"
                    />
                    <MyIcon
                      name="x-red"
                      className="absolute top-1 right-1 cursor-pointer bg-white rounded-full"
                      onClick={() =>
                        setAdventureData({
                          tempImages: tempImages.filter((_, i) => i !== index),
                        })
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
              onClick={handleNextStepRegister}
            >
              Próximo Passo
            </MyButton>
          </div>

          {type == "cadastro" && (
            <div className="flex justify-between items-center w-full max-w-3xl mx-auto p-4">
              <MyButton
                variant="default"
                borderRadius="squared"
                onClick={(e) => handleBackStep(e)}
                leftIcon={<MyIcon name="seta-direita" className="rotate-180" />}
              >
                Voltar
              </MyButton>
              <MyButton
                variant="default"
                borderRadius="squared"
                onClick={(e) => handleNextStep(e)}
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
