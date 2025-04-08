"use client";

import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import MyBadge from "@/components/atoms/my-badge";
import Image from "next/image";
import MyButton from "@/components/atoms/my-button";
import { album, mockAlbum } from "@/common/constants/mock";
import Edit from "@/components/atoms/my-icon/elements/edit";
import ModalAlert from "@/components/molecules/modal-alert";
import { useAlert } from "@/hooks/useAlert";
import { adventures } from "@/services/api/adventures";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatAddress, handleNameActivity } from "@/utils/formatters";
import { ActivityEditMenu } from "@/components/organisms/edit-activity";
import { EditModal } from "@/components/organisms/edit-modal";

export type EditSection =
  | "basic"
  | "schedule"
  | "location"
  | "pricing"
  | "images";

export default function Atividade() {
  const router = useRouter();
  const { id } = useParams();
  const [editingSection, setEditingSection] =
    React.useState<EditSection | null>(null);

  const queryClient = useQueryClient();

  const handleEdit = (section: EditSection) => {
    setEditingSection(section);
  };

  const { handleClose, isModalOpen } = useAlert();

  const { data: activity } = useQuery({
    queryKey: ["activity"],
    queryFn: () => adventures.getAdventureById(Number(id)),
  });

  const formattedActivity = React.useMemo(() => {
    if (!activity) return null;

    return {
      id: activity.id,
      title: activity.title,
      addressStreet: activity.addressStreet,
      addressPostalCode: activity.addressPostalCode,
      addressNumber: activity.addressNumber,
      addressComplement: activity.addressComplement,
      addressNeighborhood: activity.addressNeighborhood,
      addressCity: activity.addressCity,
      addressState: activity.addressState,
      addressCountry: activity.addressCountry,
      coordinates: activity.coordinates,
      pointRefAddress: activity.pointRefAddress,
      description: activity.description,
      itemsIncluded: activity.itemsIncluded,
      duration: activity.duration,
      priceAdult: activity.priceAdult,
      priceChildren: activity.priceChildren,
      transportIncluded: activity.transportIncluded,
      picturesIncluded: activity.picturesIncluded,
      typeAdventure: activity.typeAdventure,
      personsLimit: activity.personsLimit,
      partnerId: activity.partnerId,
      isInGroup: activity.isInGroup,
      isChildrenAllowed: activity.isChildrenAllowed,
      difficult: activity.difficult,
      hoursBeforeSchedule: activity.hoursBeforeSchedule,
      hoursBeforeCancellation: activity.hoursBeforeCancellation,
      isRepeatable: activity.isRepeatable,
      images: activity.images,
      recurrences: activity.recurrence
        ? {
            recurrenceWeekly: activity.recurrence
              .filter((rec) => rec.type === "WEEKLY")
              .map((rec) => rec.value)
              .join(","),
            recurrenceMonthly: activity.recurrence
              .filter((rec) => rec.type === "MONTHLY")
              .map((rec) => rec.value)
              .join(","),
            recurrenceHour: activity.recurrence
              .filter((rec) => rec.type === "HOUR")
              .map((rec) => {
                const hours = Math.floor(rec.value / 100);
                const minutes = rec.value % 100;
                return `${hours.toString().padStart(2, "0")}:${minutes
                  .toString()
                  .padStart(2, "0")}`;
              })
              .join(","),
          }
        : null,
    };
  }, [activity, activity?.images]);

  if (!activity) {
    return <div>Carregando...</div>;
  }

  const includedItems =
    typeof activity?.itemsIncluded === "string"
      ? JSON.parse(activity?.itemsIncluded)
      : [];

  const address = {
    addressState: activity?.addressState,
    addressCity: activity?.addressCity,
    addressNeighborhood: activity?.addressNeighborhood,
    addressStreet: activity?.addressStreet,
    addressNumber: activity?.addressNumber,
    addressComplement: activity?.addressComplement,
    addressPostalCode: activity?.addressPostalCode,
    addressCountry: activity?.addressCountry,
  };

  const schedules = {
    diasSemana:
      activity?.recurrence
        ?.filter((rec) => rec.type === "WEEKLY")
        .map(
          (rec) =>
            [
              "Domingo",
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado",
            ][rec.value]
        ) || [],
    horarios:
      activity?.recurrence
        ?.filter((rec) => rec.type === "HOUR")
        .map((rec) => {
          const hours = Math.floor(rec.value / 100);
          const minutes = rec.value % 100;
          return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        }) || [],
    datas:
      activity?.recurrence
        ?.filter((rec) => rec.type === "MONTHLY")
        .map((rec) => rec.value) || [],
  };

  const formattedItemsIncluded = () => {
    const includedItems = [];

    const itemsArray =
      typeof activity?.itemsIncluded === "string"
        ? JSON.parse(activity?.itemsIncluded)
        : activity?.itemsIncluded || [];

    const map = [
      { key: "Água", icon: "agua", label: "Água" },
      { key: "Alimentação", icon: "alimentacao", label: "Alimentação" },
      { key: "Combustível", icon: "combustivel", label: "Combustível" },
      {
        key: "Transporte",
        icon: "transporte",
        label: "Transporte",
        value: activity?.transportIncluded,
      },
      {
        key: "Fotos",
        icon: "fotografia",
        label: "Fotos",
        value: activity?.picturesIncluded,
      },
    ];

    for (const item of map) {
      const isIncluded =
        item.value !== undefined ? item.value : itemsArray.includes(item.key);

      if (isIncluded) {
        includedItems.push({
          label: item.label,
          icon: item.icon,
        });
      }
    }

    return includedItems;
  };

  return (
    <section className="my-10">
      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua nova atividade já foi cadastrada e já pode ser visualizada pelos nossos clientes."
        button="Voltar ao início"
      />

      {/* Modal de edição */}
      {editingSection && (
        <EditModal
          isOpen={true}
          section={editingSection}
          data={formattedActivity}
          onClose={() => setEditingSection(null)}
        />
      )}

      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8 md:hidden"
          onClick={() => router.back()}
        />

        <div className="md:hidden">
          <CarouselImages images={activity?.images} />
        </div>
        <div className="flex flex-col max-sm:items-center my-8">
          <div className="flex max-sm:flex-col items-start justify-between gap-8 px-4">
            <div className="">
              <MyTypography variant="heading2" weight="bold" className="">
                {activity?.title}
              </MyTypography>
              <MyBadge variant="outline" className="p-1 mt-2">
                {handleNameActivity(activity?.typeAdventure ?? "")}
              </MyBadge>
            </div>
            <div className="max-sm:hidden">
              <ActivityEditMenu onEdit={handleEdit} />
            </div>
          </div>

          <div className="mt-4 max-sm:hidden">
            <MyTypography variant="subtitle3" weight="bold" className="">
              Descrição da atividade:
            </MyTypography>
            <MyTypography variant="body-big" weight="regular" className="mt-1">
              {activity?.description}
            </MyTypography>
          </div>
        </div>
        <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
          {(activity?.images?.length ? activity.images : mockAlbum).map(
            (image, index) => (
              <Image
                key={index}
                src={image.url ?? "/images/atividades/ar/ar-1.jpeg"}
                alt="fotos da atividade"
                width={300}
                height={300}
                className={`h-full w-full rounded-lg object-cover ${index === 0 ? "col-span-2 row-span-2 h-full" : ""}`}
              />
            )
          )}
        </div>

        <div className="mx-6 mt-4 md:hidden">
          <MyTypography variant="subtitle3" weight="bold" className="">
            Descrição da atividade:
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            {activity?.description}
          </MyTypography>
        </div>
      </div>

      <div className="mx-6">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 my-10">
            {formattedItemsIncluded().map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <MyIcon
                  name={item.icon as IconsMapTypes}
                  className="p-2 bg-primary-900 rounded-md text-white"
                />
                <MyTypography variant="body" weight="bold">
                  {item.label}
                </MyTypography>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:my-auto">
            <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                {activity?.isInGroup
                  ? "Atividade em grupo"
                  : "Atividade individual"}
              </MyTypography>
            </div>

            <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                {activity?.isChildrenAllowed
                  ? "Permite crianças"
                  : "Não permite crianças"}
              </MyTypography>
            </div>

            <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                Grau de dificuldade: {activity?.difficult}
              </MyTypography>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-8">
          <div className="md:w-2/3">
            <div className="my-6 flex items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>
              <MyIcon
                name="localizacaoRedonda"
                className="w-6 h-6 text-primary-900 ml-3"
              />
              <div className="ml-3">
                <MyTypography variant="body-big" weight="regular">
                  {formatAddress(address)}
                </MyTypography>
                <MyTypography
                  variant="body"
                  weight="regular"
                  className="text-gray-600"
                >
                  Ponto de encontro: {activity?.pointRefAddress}
                </MyTypography>
              </div>
            </div>

            <div className="space-y-6 my-10">
              <div className="flex items-center gap-2">
                <MyIcon name="duracao" />
                <div>
                  <MyTypography variant="subtitle3" weight="bold">
                    Duração da atividade
                  </MyTypography>
                  <MyTypography variant="body-big" weight="regular">
                    {activity?.duration}
                  </MyTypography>
                </div>
              </div>

              {schedules.diasSemana && (
                <div className="flex items-center gap-2">
                  <MyIcon name="calendar" />
                  <div>
                    <MyTypography variant="subtitle3" weight="bold">
                      Dias disponíveis
                    </MyTypography>
                    {schedules.diasSemana.length > 0 && (
                      <MyTypography variant="body-big" weight="regular">
                        {schedules.diasSemana.map((dia, index) => (
                          <span key={index}>
                            {dia}
                            {index < schedules.diasSemana.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </MyTypography>
                    )}
                  </div>
                </div>
              )}

              {schedules.datas && schedules.datas.length > 0 && (
                <div className="flex items-center gap-2">
                  <MyIcon name="calendar" />
                  <div>
                    <MyTypography variant="subtitle3" weight="bold">
                      Se repetem nas datas:
                    </MyTypography>
                    {
                      <MyTypography variant="body-big" weight="regular">
                        {schedules.datas.map((dia, index) => (
                          <span key={index}>
                            {dia}
                            {index < schedules.datas.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </MyTypography>
                    }
                  </div>
                </div>
              )}

              {schedules.horarios && (
                <div className="flex items-center gap-2">
                  <MyIcon name="calendar" />
                  <div>
                    <MyTypography variant="subtitle3" weight="bold">
                      Horários
                    </MyTypography>
                    {schedules.horarios.length > 0 && (
                      <MyTypography variant="body-big" weight="regular">
                        {schedules.horarios.map((dia, index) => (
                          <span key={index}>
                            {dia}
                            {index < schedules.horarios.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </MyTypography>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="space-y-8 mt-4">
              <div className="space-y-2">
                <MyTypography variant="subtitle3" weight="bold">
                  Políticas da atividade
                </MyTypography>
                {activity?.hoursBeforeSchedule && (
                  <MyTypography variant="body-big" weight="regular">
                    • Antecedência mínima para agendamento:{" "}
                    <span className="block">
                      {activity?.hoursBeforeSchedule}h
                    </span>
                  </MyTypography>
                )}
                {activity?.hoursBeforeCancellation && (
                  <MyTypography variant="body-big" weight="regular">
                    • Antecedência mínima para cancelamento:{" "}
                    <span className="block">
                      {activity?.hoursBeforeCancellation}h
                    </span>
                  </MyTypography>
                )}
                <MyTypography variant="body-big" weight="regular">
                  • Quantidade de pessoas: {activity?.personsLimit}
                </MyTypography>
              </div>

              <div className="space-y-2">
                <MyTypography variant="subtitle3" weight="bold">
                  Essa atividade será realizada:
                </MyTypography>

                <MyTypography variant="body-big" weight="regular">
                  • {activity.isInGroup ? "Em grupo" : "Individual"}
                </MyTypography>

                <MyTypography variant="body-big" weight="regular">
                  • {activity.isChildrenAllowed ? "Com criança" : "Sem criança"}
                </MyTypography>
              </div>

              <div className="space-y-4">
                <MyTypography variant="subtitle3" weight="regular">
                  <span className="font-bold">Valor por adulto:</span> R${" "}
                  {activity?.priceAdult}
                </MyTypography>

                {activity.isChildrenAllowed && (
                  <MyTypography variant="subtitle3" weight="regular">
                    <span className="font-bold">Valor por criança:</span> R${" "}
                    {activity?.priceChildren}
                  </MyTypography>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden mt-6">
          <ActivityEditMenu onEdit={handleEdit} />
        </div>
      </div>
    </section>
  );
}
