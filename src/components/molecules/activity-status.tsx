"use client";

import React from "react";
import Image from "next/image";
import MyTypography from "@/components/atoms/my-typography";
import MyBadge from "@/components/atoms/my-badge";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import { cn } from "@/utils/cn";
import Check from "../atoms/my-icon/elements/check";
import { Adventure } from "@/services/api/adventures";
import {
  getData,
  getHora,
  handleNameActivity,
  selectActivityImage,
} from "@/utils/formatters";
import RejectModal from "./reject-modal";
import { useRouter } from "next/navigation";

interface ActivityStatusCardProps {
  refusalMsg: string;
  setRefusalMsg: React.Dispatch<React.SetStateAction<string>>;
  activity: Adventure;
  isLoading: boolean;
  onApprove: () => void;
  onReject: () => void;
  onClose?: () => void;
}

export default function ActivityStatusCard({
  activity,
  refusalMsg,
  setRefusalMsg,
  onApprove,
  onReject,
  onClose,
  isLoading,
}: ActivityStatusCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm w-full">
      <div className="md:grid md:grid-cols-2 md:items-center md:justify-between md:gap-10">
        <div className="md:hidden">
          <div className="flex items-center gap-3 my-4">
            <Image
              src={activity?.partner?.logo?.url ?? "/user.png"}
              alt={activity?.partner?.fantasyName ?? "Parceiro"}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <MyTypography variant="body-big" weight="semibold">
                {activity?.partner?.fantasyName ?? "Parceiro"}
              </MyTypography>

              <MyTypography variant="button" lightness={400}>
                {`Solicitado em ${getData(activity?.createdAt)} às ${getHora(activity?.createdAt)}`}
              </MyTypography>
            </div>
          </div>
        </div>

        <div
          className="flex gap-2 my-2 md:my-6 cursor-pointer"
          onClick={() =>
            router.push(`/admin/aprovar-atividade/${activity?.id}`)
          }
        >
          <div className="relative w-[150px] min-w-[130px] md:min-w-[150px] h-[140px] rounded-lg overflow-hidden mb-3">
            <Image
              alt="imagem atividade"
              src={
                selectActivityImage(activity) ??
                "/images/atividades/paraquedas.webp"
              }
              width={250}
              height={300}
              className={cn(
                "w-[150px] min-w-[130px] md:min-w-[150px] h-[140px] object-cover object-center"
              )}
            />
          </div>

          <div className="space-y-4">
            <MyBadge variant="outline" className="p-1">
              {handleNameActivity(activity?.typeAdventure)}
            </MyBadge>

            <div>
              <MyTypography variant="subtitle3" weight="bold" className="">
                {activity?.title.length > 30
                  ? activity?.title.slice(0, 30).trim() + "..."
                  : activity?.title}
              </MyTypography>

              <MyTypography
                variant="body-big"
                className="text-gray-600 mt-1 max-sm:hidden"
              >
                {activity.description.slice(0, 120).concat("...")}
              </MyTypography>

              <MyTypography
                variant="body-big"
                className="text-gray-600 mt-1 md:hidden"
              >
                {activity.description.slice(0, 30).concat("...")}
              </MyTypography>
            </div>
          </div>
        </div>

        <div className="md:w-full md:max-w-[300px] md:ml-auto ">
          <div className="max-sm:hidden flex items-center gap-3 my-4">
            <Image
              src={activity?.partner?.logo?.url ?? "/user.png"}
              alt={activity?.partner?.fantasyName ?? "Parceiro"}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <MyTypography variant="body-big" weight="semibold">
                Parceiro: {activity?.partner?.fantasyName ?? "Parceiro"}
              </MyTypography>
              <MyTypography variant="button" lightness={400}>
                {`Solicitado em ${getData(activity?.createdAt)} às ${getHora(activity?.createdAt)}`}
              </MyTypography>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:justify-end">
            <MyButton
              variant="secondary-muted"
              className="w-full flex justify-center"
              borderRadius="squared"
              size="lg"
              onClick={onApprove}
              isLoading={isLoading}
            >
              <Check className="w-6 h-6" stroke="#97E169" strokeWidth="1" />
            </MyButton>

            <RejectModal
              customTitle="Rejeitar atividade"
              customConfirmMessage="Rejeitar"
              iconName="warning"
              callbackFn={onReject}
              refusalMsg={refusalMsg}
              setRefusalMsg={setRefusalMsg}
              customDescription="Escreva a justificativa da recusa da atividade"
            >
              <div>
                <MyButton
                  variant="red"
                  className="w-full"
                  onClick={onClose}
                  borderRadius="squared"
                  size="lg"
                >
                  <MyIcon name="x-red" />
                </MyButton>
              </div>
            </RejectModal>
          </div>
        </div>
      </div>

      {activity?.refusalMsg && (
        <div className="text-center mt-4">
          <MyTypography variant="body-big" weight="regular">
            <span className="font-bold">Motivo da recusa: </span>
            {activity?.refusalMsg ?? "Nenhuma justificativa informada"}
          </MyTypography>
        </div>
      )}
    </div>
  );
}
