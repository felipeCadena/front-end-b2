"use client";

import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import MyBadge from "@/components/atoms/my-badge";
import Image from "next/image";
import ModalAlert from "@/components/molecules/modal-alert";
import { useAlert } from "@/hooks/useAlert";
import { adventures } from "@/services/api/adventures";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  formatAddress,
  formatPrice,
  getDifficultyDescription,
  getDifficultyDescriptionResume,
  handleNameActivity,
  sortImagesByDefaultFirst,
} from "@/utils/formatters";
import {
  ActivityEditMenu,
  EditSection,
} from "@/components/organisms/edit-activity-menu";
import { partnerService } from "@/services/api/partner";
import PATHS from "@/utils/paths";
import { toast } from "react-toastify";
import MyButton from "@/components/atoms/my-button";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Atividade() {
  const router = useRouter();
  const { id } = useParams();
  const [cancel, setCancel] = React.useState(false);
  const [confirmedCancel, setConfirmedCancel] = React.useState(false);
  const [hasClient, setHasClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hideActivity, setHideActivity] = React.useState(false);
  const [confirmedHideActivity, setConfirmedHideActivity] =
    React.useState(false);
  const { handleClose, isModalOpen } = useAlert();
  const queryClient = useQueryClient();

  const [expanded, setExpanded] = React.useState(false);
  const MAX_LENGTH = 1000;

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activity"],
    queryFn: () => adventures.getAdventureById(Number(id)),
  });

  const renderDescription = () => {
    const full = activity?.description ?? "";
    const isLong = full.length > MAX_LENGTH;

    if (!isLong) {
      return (
        <MyTypography
          variant="body-big"
          weight="regular"
          className="mt-1 whitespace-pre-wrap"
        >
          {full}
        </MyTypography>
      );
    }

    const displayedText = expanded ? full : full.slice(0, MAX_LENGTH);
    const toggleText = expanded ? "Ver menos" : "Ver mais";

    return (
      <MyTypography
        variant="body-big"
        weight="regular"
        className="mt-1 whitespace-pre-wrap"
      >
        {displayedText}
        {isLong && !expanded && "..."}
        <span
          onClick={() => setExpanded(!expanded)}
          className="px-1 inline text-gray-400 underline cursor-pointer"
        >
          {toggleText}
        </span>
      </MyTypography>
    );
  };

  useQuery({
    queryKey: ["mySchedules"],
    queryFn: () =>
      partnerService.getMySchedules({
        limit: 30,
        skip: 0,
        adventureId: id as string,
        isAvailable: true,
      }),
  });

  const getAddress = (address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    return googleMapsUrl;
  };

  const handleEdit = (section: EditSection) => {
    if (section == "cancel") {
      setCancel(true);
      return;
    }

    if (section == "hide") {
      setHideActivity(true);
      return;
    }

    router.push(
      `/parceiro/atividades-cadastradas/atividade/${id}/editar?section=${section}`
    );
  };

  if (!activity) {
    return isLoadingActivity ? (
      <div className="flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="B2 Adventure Logo"
          width={250}
          height={250}
          className="object-contain animate-pulse"
        />
      </div>
    ) : (
      <div className="flex flex-col gap-4 items-center justify-center my-10">
        <MyTypography variant="subtitle3" weight="bold">
          A atividade buscada não foi encontrada.
        </MyTypography>
        <MyButton
          variant="default"
          size="lg"
          borderRadius="squared"
          onClick={() => router.push(PATHS["atividades-cadastradas"])}
        >
          Voltar
        </MyButton>
      </div>
    );
  }

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

  const handleCancel = async () => {
    setIsLoading(true);

    try {
      await adventures.deleteAdventureById(Number(id));

      setConfirmedCancel(true);
      setCancel(false);
    } catch (error) {
      console.error("Error canceling activity:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleConfirmCancel = () => {
    router.push(PATHS["atividades-cadastradas"]);
    setConfirmedCancel(false);
  };

  const handleHideActivity = async () => {
    setIsLoading(true);
    try {
      if (activity?.onSite) {
        await adventures.updateAdventureById(Number(id), {
          onSite: false,
        });
      } else {
        await adventures.updateAdventureById(Number(id), {
          onSite: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      setHideActivity(false);
      setConfirmedHideActivity(true);
    } catch (error) {
      console.error("Error hiding activity:", error);
      toast.error("Erro ao ocultar/ativar atividade. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="my-10">
      {/* Modal de Atividade Cadastrada */}
      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        onAction={handleClose}
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua atividade foi cadastrada com sucesso e já pode ser visualizada pelos nossos clientes!"
        button="Voltar ao início"
      />

      {/* Modal de cancelamento de atividade */}
      <ModalAlert
        open={cancel}
        onClose={() => setCancel(false)}
        onAction={handleCancel}
        isLoading={isLoading}
        iconName="cancel"
        title="Exclusão de Atividade"
        descrition="Tem certeza que deseja excluir a atividade? Você não poderá voltar atrás!"
        button="Excluir atividade"
      />

      {/* Modal que confirma o cancelamento da atividade */}
      <ModalAlert
        open={confirmedCancel}
        onClose={() => setConfirmedCancel(false)}
        onAction={handleConfirmCancel}
        iconName="warning"
        title="Atividade cancelada"
        descrition="A atividade foi excluída."
        button="Voltar ao início"
      />

      {/* Modal que oculta a atividade no site */}
      <ModalAlert
        open={hideActivity}
        onClose={() => setHideActivity(false)}
        onAction={handleHideActivity}
        iconName="warning"
        title={activity.onSite ? "Desativar Atividade" : "Ativar Atividade"}
        descrition={
          activity.onSite
            ? "A atividade será desativada e não aparecerá mais para os clientes."
            : "A atividade será reativada e aparecerá novamente para os clientes."
        }
        button={activity.onSite ? "Desativar Atividade" : "Reativar Atividade"}
      />

      {/* Modal que confirma que a atividade foi ocultada */}
      <ModalAlert
        open={confirmedHideActivity}
        onClose={() => setConfirmedHideActivity(false)}
        onAction={() => setConfirmedHideActivity(false)}
        iconName="warning"
        title={
          !activity.onSite ? "Atividade Desativada" : "Atividade Reativada"
        }
        descrition={
          !activity.onSite
            ? "A atividade foi desativada e não aparecerá mais para os clientes."
            : "A atividade foi reativada e aparecerá novamente para os clientes."
        }
        button="Voltar"
      />

      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8 md:hidden"
          onClick={() => router.push(PATHS["atividades-cadastradas"])}
        />

        <div className="md:hidden">
          <CarouselImages images={activity?.images.slice(0, 5)} />
        </div>
        <div className="flex flex-col my-4">
          <div className="flex max-sm:flex-col items-start justify-between gap-8 max-sm:px-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <MyIcon
                  name="voltar-black"
                  className="cursor-pointer max-sm:hidden"
                  onClick={() => router.push(PATHS["atividades-cadastradas"])}
                />
                <MyTypography variant="heading2" weight="bold" className="">
                  {activity?.title}
                </MyTypography>
              </div>
              <div className="flex max-sm:flex-col items-start gap-2 md:items-center">
                <MyBadge variant="outline" className="p-1 ">
                  {handleNameActivity(activity?.typeAdventure ?? "")}
                </MyBadge>
                {!activity.onSite && activity.adminApproved && (
                  <MyBadge variant="error" className="md:mx-4 p-1">
                    Atividade Desativada
                  </MyBadge>
                )}
                {!activity.adminApproved && (
                  <MyBadge variant="error" className="md:mx-4 p-1">
                    Pendente de aprovação pela B2
                  </MyBadge>
                )}
              </div>
            </div>
            <div className="max-sm:hidden">
              <ActivityEditMenu
                onEdit={handleEdit}
                isOcult={!activity.onSite}
                adminAprroved={activity?.adminApproved}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 max-sm:hidden">
            <div className="flex items-center gap-2">
              <Image
                alt="avatar"
                src={activity?.partner?.logo?.url ?? "/user.png"}
                width={6}
                height={6}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <MyTypography variant="notification" weight="semibold">
                  {activity?.partner.fantasyName}
                </MyTypography>
                <MyTypography
                  variant="notification"
                  weight="regular"
                  lightness={400}
                >
                  Parceiro e Guia de atividades
                </MyTypography>
              </div>
            </div>
            <div className="">
              <MyTypography variant="subtitle3" weight="bold" className="">
                Descrição da atividade:
              </MyTypography>
              <MyTypography
                variant="body-big"
                weight="regular"
                className="mt-1 whitespace-pre-wrap"
              >
                {renderDescription()}
              </MyTypography>
            </div>
          </div>
        </div>
        <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
          {activity?.images?.length &&
            sortImagesByDefaultFirst(activity.images)
              .slice(0, 5)
              .map((image, index) => (
                <Image
                  key={index}
                  src={`${image.url ?? "/images/atividades/ar/ar-1.jpeg"}?v=${image.updatedAt ?? image.id}`}
                  alt="fotos da atividade"
                  width={300}
                  height={300}
                  className={`w-full max-h-[25rem] rounded-lg object-cover ${index === 0 ? "col-span-2 row-span-2 h-[25rem]" : "h-[12rem] max-h-[12rem]"}`}
                />
              ))}
        </div>

        <div className="mx-4 md:hidden">
          <div className="flex items-center gap-2 mb-4">
            <Image
              alt="avatar"
              src={activity?.partner?.logo?.url ?? "/user.png"}
              width={6}
              height={6}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <MyTypography variant="notification" weight="semibold">
                {activity?.partner?.fantasyName}
              </MyTypography>
              <MyTypography
                variant="notification"
                weight="regular"
                lightness={400}
              >
                Parceiro e Guia de atividades
              </MyTypography>
            </div>
          </div>
          <MyTypography variant="subtitle3" weight="bold" className="">
            Descrição da atividade:
          </MyTypography>
          <MyTypography
            variant="body-big"
            weight="regular"
            className="mt-1 whitespace-pre-wrap"
          >
            {renderDescription()}
          </MyTypography>
        </div>
      </div>

      <div className="mx-6 mt-4">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {formattedItemsIncluded().length > 0 && (
            <div>
              <MyTypography variant="body-big" weight="semibold">
                Está incluso:
              </MyTypography>
              <div
                className={cn(
                  "grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mt-4 mb-8"
                )}
              >
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
            </div>
          )}

          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-3 gap-4 md:my-auto mb-4",
              formattedItemsIncluded().length == 0 && "my-4 md:my-4"
            )}
          >
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
                Grau de dificuldade:{" "}
                {getDifficultyDescriptionResume(activity?.difficult)}
              </MyTypography>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-8">
          <div className="md:w-full">
            {activity?.transportAddress &&
              activity?.transportAddress?.length > 0 && (
                <div className="mb-6">
                  <MyTypography
                    variant="body-big"
                    weight="semibold"
                    className=""
                  >
                    Local de saida e retorno do transporte incluído:
                  </MyTypography>
                  <div className="max-sm:my-2 flex items-center mt-2 p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
                    <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

                    <MyIcon name="localizacaoRedonda" className="" />
                    <MyTypography className="ml-2">
                      <Link
                        href={getAddress(activity?.transportAddress)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {activity?.transportAddress}
                      </Link>
                    </MyTypography>
                  </div>
                </div>
              )}

            <MyTypography variant="body-big" weight="semibold">
              Local da atividade:
            </MyTypography>
            <div className="max-sm:my-2 flex items-center mt-2 p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>
              <MyIcon
                name="localizacaoRedonda"
                className="w-6 h-6 text-primary-900 ml-3"
              />
              <div className="ml-3">
                <MyTypography variant="body-big" weight="regular">
                  <Link
                    href={getAddress(formatAddress(address))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formatAddress(address)}
                  </Link>
                </MyTypography>
                <MyTypography
                  variant="body"
                  weight="regular"
                  className="text-gray-600"
                >
                  Ponto de referência: {activity?.pointRefAddress}
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
                    {activity?.duration +
                      (activity?.duration == "01:00" ? " hora" : " horas")}
                  </MyTypography>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6 mt-4 md:mt-2">
              <div className="space-y-2">
                <MyTypography variant="subtitle3" weight="bold">
                  Políticas da atividade
                </MyTypography>
                {activity?.hoursBeforeSchedule && (
                  <MyTypography variant="body-big" weight="regular">
                    • Antecedência mínima para agendamento:{" "}
                    <span className="max-sm:block">
                      {activity?.hoursBeforeSchedule}h
                    </span>
                  </MyTypography>
                )}
                {activity?.hoursBeforeCancellation && (
                  <MyTypography variant="body-big" weight="regular">
                    • Antecedência mínima para cancelamento:{" "}
                    <span className="max-sm:block">
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
                <div className="flex justify-between items-center mt-1">
                  <MyTypography
                    variant="subtitle3"
                    weight="bold"
                    className="text-md md:text-lg"
                  >
                    Valor por adulto:
                  </MyTypography>

                  <MyTypography
                    variant="heading2"
                    weight="extrabold"
                    className="text-primary-600 text-lg md:text-2xl"
                  >
                    {formatPrice(activity?.priceAdult ?? "")}
                  </MyTypography>
                </div>

                {activity?.isChildrenAllowed && (
                  <div className="flex justify-between items-center mt-4">
                    <MyTypography
                      variant="subtitle3"
                      weight="bold"
                      className="text-md md:text-lg"
                    >
                      Valor por criança:
                    </MyTypography>
                    <MyTypography
                      variant="heading2"
                      weight="extrabold"
                      className="text-primary-600 text-lg md:text-2xl"
                    >
                      {formatPrice(activity?.priceChildren ?? "")}
                    </MyTypography>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden mt-6">
          <ActivityEditMenu
            onEdit={handleEdit}
            adminAprroved={activity?.adminApproved}
            isOcult={!activity.onSite}
          />
          <MyButton
            variant="outline-neutral"
            size="lg"
            borderRadius="squared"
            className="mt-4 w-full md:hidden"
            leftIcon={<MyIcon name="voltar-black" />}
            onClick={() => router.push(PATHS["atividades-cadastradas"])}
          >
            Ir para atividades
          </MyButton>
        </div>
      </div>
    </section>
  );
}
