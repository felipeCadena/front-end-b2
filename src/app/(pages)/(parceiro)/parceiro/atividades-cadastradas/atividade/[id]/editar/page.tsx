"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTextarea from "@/components/atoms/my-textarea";
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
import InformacoesAtividade from "@/components/templates/informacoes-atividade";
import StepperEdit from "./stepper";

export default function WebForm() {
  const router = useRouter();
  const [files, setFiles] = React.useState<File[] | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [next, setNext] = useState(false);

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

  return (
    <main>
      <div className="space-y-10 my-6 max-sm:hidden">
        <div>
          <MyTypography variant="heading2" weight="bold" className="mb-2">
            Edite sua atividade
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="medium"
            lightness={400}
            className="mb-8"
          >
            Atualize as informações da sua atividade
          </MyTypography>
        </div>
        {!next && <ActivitiesFilter withText={false} />}

        <div className="border-2  border-gray-300 rounded-lg p-8">
          {!next && (
            <div>
              <div className="space-y-6">
                <MyTextInput
                  label="Nome da Atividade"
                  placeholder="Nome da atividade"
                  className="mt-2"
                />

                <MyTextarea
                  placeholder="Lorem ipsum dolor sit amet, consectetur di..."
                  label="Descrição da atividade"
                  classNameLabel="text-black text-base font-bold"
                  rows={5}
                />

                <div className="grid grid-cols-2 gap-8">
                  <MySelect
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
                  </MySelect>

                  <MySelect
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
                  </MySelect>
                </div>
              </div>
              <div className="space-y-10 mt-6">
                <div>
                  <MyTypography
                    variant="subtitle3"
                    weight="bold"
                    className="mb-3"
                  >
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
                        />
                        <MyDatePicker withlabel="Selecione dias específicos" />
                        <MultiSelect
                          grid
                          placeholder="Selecione os horários"
                          options={hours}
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
                <MyTypography
                  variant="subtitle3"
                  weight="bold"
                  className="mb-1"
                >
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
            </div>
          )}

          {next && <InformacoesAtividade onBack={() => setNext(false)} edit />}

          {!next && (
            <div className="flex justify-center mt-12">
              <MyButton
                size="lg"
                borderRadius="squared"
                className="w-1/2"
                rightIcon={<MyIcon name="seta-direita" />}
                onClick={() => setNext(true)}
              >
                Próximo Passo
              </MyButton>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <StepperEdit />
      </div>
    </main>
  );
}
