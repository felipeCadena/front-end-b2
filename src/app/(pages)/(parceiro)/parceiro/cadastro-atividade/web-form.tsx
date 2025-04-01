"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "@/components/molecules/controlled-text-input";
import ControlledTextarea from "@/components/molecules/controlled-textarea";
import ControlledSelect from "@/components/molecules/controlled-select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

const formSchema = z.object({
  title: z.string(),
  addressStreet: z.string(),
  addressPostalCode: z.string(),
  addressNumber: z.string(),
  addressComplement: z.string().optional(),
  addressNeighborhood: z.string(),
  addressCity: z.string(),
  addressState: z.string(),
  addressCountry: z.string(),
  coordinates: z.string(),
  pointRefAddress: z.string(),
  description: z.string(),
  itemsIncluded: z.array(z.string()),
  duration: z.string(),
  priceAdult: z.number(),
  priceChildren: z.number(),
  transportIncluded: z.boolean(),
  picturesIncluded: z.boolean(),
  typeAdventure: z.enum(["terra", "ar", "mar"]),
  personsLimit: z.number(),
  partnerId: z.string().optional(),
  isInGroup: z.boolean(),
  isChildrenAllowed: z.boolean(),
  difficult: z.number().min(1).max(5),
  daysBeforeSchedule: z.number(),
  daysBeforeCancellation: z.number(),
  isRepeatable: z.boolean(),
  recurrences: z
    .array(
      z.object({
        recurrenceWeekly: z.string().optional(),
        recurrenceMonthly: z.string().optional(),
        recurrenceHour: z.string(),
      })
    )
    .optional(),
});

export default function WebForm({ type }: { type?: string }) {
  const router = useRouter();
  const [files, setFiles] = React.useState<File[] | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<"ar" | "terra" | "mar">("ar");
  const [recurrenceWeekly, setRecurrenceWeekly] = useState<string[]>([]);
  const [recurrenceHour, setRecurrenceHour] = useState<string[]>([]);

  const [dates, setDates] = useState<Date[]>([]);
  const [formattedDates, setFormattedDates] = useState<string>("");

  // Função para formatar datas ao atualizar o estado
  const handleDateChange = (dates: Date[]) => {
    setDates(dates); // Atualiza o estado das datas selecionadas

    // Converte para o formato de string esperado pelo backend
    const formatted = dates
      .map((d) => format(d, "dd/MM", { locale: ptBR }))
      .join(",");
    setFormattedDates(formatted);
  };

  const methods = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      addressStreet: "",
      addressPostalCode: "",
      addressNumber: "",
      addressComplement: "",
      addressNeighborhood: "",
      addressCity: "",
      addressState: "",
      addressCountry: "",
      coordinates: "",
      pointRefAddress: "",
      description: "",
      itemsIncluded: [],
      duration: "",
      priceAdult: 0,
      priceChildren: 0,
      transportIncluded: false,
      picturesIncluded: false,
      typeAdventure: selected,
      personsLimit: 0,
      partnerId: "",
      isInGroup: false,
      isChildrenAllowed: false,
      difficult: 1,
      daysBeforeSchedule: 0,
      daysBeforeCancellation: 0,
      isRepeatable: false,
      recurrences: [
        {
          recurrenceWeekly: "",
          recurrenceMonthly: "",
          recurrenceHour: "",
        },
      ],
    },
    resolver: zodResolver(formSchema),
  });

  const { control, handleSubmit, reset, watch } = methods;

  const [selections, setSelections] = useState([{ id: Date.now() }]);

  const addSelection = () => {
    setSelections([...selections, { id: Date.now() }]);
  };

  const removeSelection = (id: number) => {
    setSelections(selections.filter((item) => item.id !== id));
  };

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  const onSubmit = (payload: any) => {};

  return (
    <main className="space-y-10 my-6">
      <FormProvider {...methods}>
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

        <ActivitiesFilter setSelected={setSelected} selected={selected} />

        <div className="border-2  border-gray-300 rounded-lg p-8">
          <div className="space-y-6">
            <ControlledTextInput
              control={control}
              name="title"
              label="Nome da atividade"
              placeholder="Nome da atividade"
              className="mt-2"
            />

            <ControlledTextarea
              control={control}
              name="description"
              label="Descrição da atividade"
              placeholder="Lorem ipsum dolor sit amet, consectetur di..."
              classNameLabel="text-black text-base font-bold"
              rows={5}
            />

            <div className="grid grid-cols-2 gap-8">
              <ControlledSelect
                control={control}
                name="daysBeforeSchedule"
                label="Antecedência de Agendamento"
                className="text-base text-black"
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
              </ControlledSelect>

              <ControlledSelect
                control={control}
                name="daysBeforeCancellation"
                label="Antecedência de Cancelamento"
                className="text-base text-black"
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
              </ControlledSelect>
            </div>
          </div>
          <div className="space-y-10 mt-6">
            <div>
              <MyTypography variant="subtitle3" weight="bold" className="mb-3">
                Repetir a atividade
              </MyTypography>

              <div className="space-y-4 flex flex-col items-center">
                {selections.map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full border px-6 first:py-4 py-8 rounded-lg space-y-4 relative"
                  >
                    <MultiSelect
                      placeholder="Selecione dias da semana"
                      options={daysOfWeek}
                      selected={recurrenceWeekly}
                      setSelected={setRecurrenceWeekly}
                    />
                    <MyDatePicker
                      withlabel="Selecione dias específicos"
                      selectedDates={dates}
                      setSelectedDates={handleDateChange}
                    />
                    <MultiSelect
                      grid
                      placeholder="Selecione os horários"
                      options={hours}
                      selected={recurrenceHour}
                      setSelected={setRecurrenceHour}
                    />

                    {index > 0 && (
                      <MyIcon
                        name="subtracao"
                        title="Remover"
                        className="absolute -top-3 right-1"
                        onClick={() => removeSelection(item.id)}
                      />
                    )}
                  </div>
                ))}

                <MyButton
                  variant="secondary"
                  borderRadius="squared"
                  size="lg"
                  className="w-1/2 mx-auto"
                  onClick={addSelection}
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
                <TimePickerModal iconColor="black" />
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-6 p-6 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="grid grid-cols-2 items-center gap-8">
              <MyTextInput
                label="Local"
                placeholder="Rio de Janeiro, Cristo Redentor"
                classNameLabel="text-base text-black"
                className="mt-2"
              />

              <MyTextInput
                label="Ponto de referência"
                placeholder="Próximo ao centro"
                classNameLabel="text-base text-black"
                className="mt-2"
              />
            </div>

            <GoogleMaps
              location={{ lat: -22.9519, lng: -43.2105 }}
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
        </div>
      </FormProvider>
    </main>
  );
}
