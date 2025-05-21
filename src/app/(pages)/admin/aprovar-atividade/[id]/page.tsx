"use client";

import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import MyBadge from "@/components/atoms/my-badge";
import Image from "next/image";
import { adventures } from "@/services/api/adventures";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  formatAddress,
  formatPrice,
  getDifficultyDescription,
  getDifficultyDescriptionResume,
  handleNameActivity,
} from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { toast } from "react-toastify";
import MyButton from "@/components/atoms/my-button";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Check from "@/components/atoms/my-icon/elements/check";
import RejectModal from "@/components/molecules/reject-modal";
import { adminService } from "@/services/api/admin";
import { AxiosError } from "axios";
import ChatWeb from "@/components/atoms/my-icon/elements/chat-web";
import Chat from "@/components/atoms/my-icon/elements/chat";

export default function AprovarAtividade() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingChat, setIsLoadingChat] = React.useState(false);
  const queryClient = useQueryClient();

  const [refusalMsg, setRefusalMsg] = React.useState("");

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activity", id],
    queryFn: () => adventures.getAdventureById(Number(id)),
    enabled: !!id,
  });

  const { data: partner } = useQuery({
    queryKey: ["partner", activity?.partnerId],
    queryFn: () => adminService.getPartnerById(String(activity?.partnerId)),
    enabled: !!activity?.partnerId,
  });

  const getAddress = (address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    return googleMapsUrl;
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

  const onApproveActivity = async (id: number) => {
    setIsLoading(true);
    const body = {
      adminApproved: true,
      onSite: false,
      refusalMsg: "",
    };
    try {
      await adminService.approveOrRejectAdventure(id, body);
      toast.success("Atividade aprovada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["activity"] });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message == "string"
            ? err.response?.data?.message
            : "Erro ao aprovar atividade.";
        toast.error(`${message}`);
      } else {
        toast.error("Erro desconhecido ao aprovar atividade.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async (userId: string) => {
    setIsLoadingChat(true);
    try {
      await adminService.createChat({ userToId: userId });
      router.push(`/chat`);
      toast.success("Chat criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar chat:", error);
      toast.error("Erro ao criar chat");
    } finally {
      setIsLoadingChat(false);
    }
  };

  const onRejectActivity = async (id: number) => {
    const body = {
      adminApproved: false,
      onSite: false,
      refusalMsg,
    };
    try {
      await adminService.approveOrRejectAdventure(id, body);
      toast.success("Atividade rejeitada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["activity"] });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message == "string"
            ? err.response?.data?.message
            : "Erro ao rejeitar atividade.";
        toast.error(`${message}`);
      } else {
        toast.error("Erro desconhecido ao rejeitar atividade.");
      }
    }
  };

  return (
    <section className="my-10">
      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8 md:hidden"
          onClick={() => router.back()}
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
                  onClick={() => router.back()}
                />
                <MyTypography variant="heading2" weight="bold" className="">
                  {activity?.title
                    ? activity.title.charAt(0).toUpperCase() +
                      activity.title.slice(1).toLowerCase()
                    : ""}
                </MyTypography>
              </div>
              <div className="flex gap-2 items-center">
                <MyBadge variant="outline" className="p-1 ">
                  {handleNameActivity(activity?.typeAdventure ?? "")}
                </MyBadge>
                {!activity.onSite && activity.adminApproved && (
                  <MyBadge variant="error" className="md:mx-4 p-1">
                    Atividade Desativada
                  </MyBadge>
                )}
              </div>
            </div>
            <div className="max-sm:hidden grid grid-cols-2 gap-4">
              {!activity.adminApproved && (
                <>
                  <MyButton
                    variant="secondary-muted"
                    className="w-full flex justify-center"
                    borderRadius="squared"
                    size="lg"
                    onClick={() => onApproveActivity(activity?.id)}
                    isLoading={isLoading}
                  >
                    <Check
                      className="w-6 h-6"
                      stroke="#97E169"
                      strokeWidth="1"
                    />
                  </MyButton>
                  <RejectModal
                    customTitle="Rejeitar atividade"
                    customConfirmMessage="Rejeitar"
                    iconName="warning"
                    callbackFn={() => onRejectActivity(activity?.id)}
                    refusalMsg={refusalMsg}
                    setRefusalMsg={setRefusalMsg}
                    customDescription="Escreva a justificativa da recusa da atividade"
                  >
                    <div>
                      <MyButton
                        variant="red"
                        className="w-full"
                        borderRadius="squared"
                        size="lg"
                      >
                        <MyIcon name="x-red" />
                      </MyButton>
                    </div>
                  </RejectModal>
                </>
              )}
              <div className="col-span-2">
                <MyButton
                  variant="partner"
                  borderRadius="squared"
                  size="lg"
                  className="font-bold text-[1rem] w-full"
                  leftIcon={<Chat fill="#2DADE4" />}
                  onClick={() => handleChat(partner?.userId)}
                >
                  Falar com o parceiro
                </MyButton>
              </div>
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
                {activity?.description}
              </MyTypography>
            </div>
          </div>
        </div>
        <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
          {activity?.images?.length &&
            activity.images
              .slice(0, 5)
              .sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
              .map((image, index) => (
                <Image
                  key={index}
                  src={`${image.url ?? "/images/atividades/ar/ar-1.jpeg"}?v=${image.updatedAt ?? image.id}`}
                  alt="fotos da atividade"
                  width={300}
                  height={300}
                  className={`h-full w-ful max-h-[27rem] rounded-lg object-cover ${index === 0 ? "col-span-2 row-span-2 w-full h-[27rem]" : "h-[12rem] max-h-[12rem]"}`}
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
            {activity?.description}
          </MyTypography>
        </div>
      </div>

      <div className="mx-6">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {formattedItemsIncluded().length > 0 && (
            <div
              className={cn(
                "grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 my-10"
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
          )}

          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-3 gap-4 md:my-auto",
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
                    className="mt-4"
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
              Ponto de encontro da atividade:
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
        <div className="w-full grid grid-cols-2 gap-4 md:hidden mt-6">
          {!activity.adminApproved && (
            <>
              <MyButton
                variant="secondary-muted"
                className="w-full flex justify-center"
                borderRadius="squared"
                size="lg"
                onClick={() => onApproveActivity(activity?.id)}
                isLoading={isLoading}
              >
                <Check className="w-6 h-6" stroke="#97E169" strokeWidth="1" />
              </MyButton>
              <RejectModal
                customTitle="Rejeitar atividade"
                customConfirmMessage="Rejeitar"
                iconName="warning"
                callbackFn={() => onRejectActivity(activity?.id)}
                refusalMsg={refusalMsg}
                setRefusalMsg={setRefusalMsg}
                customDescription="Escreva a justificativa da recusa da atividade"
              >
                <div>
                  <MyButton
                    variant="red"
                    className="w-full"
                    borderRadius="squared"
                    size="lg"
                  >
                    <MyIcon name="x-red" />
                  </MyButton>
                </div>
              </RejectModal>
            </>
          )}
          <div className="col-span-2 w-full">
            <MyButton
              variant="partner"
              borderRadius="squared"
              size="lg"
              className="font-bold text-[1rem] w-full"
              leftIcon={<MyIcon name="chat-web" className="" />}
              onClick={() => handleChat(partner?.userId)}
            >
              Falar com o parceiro
            </MyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
