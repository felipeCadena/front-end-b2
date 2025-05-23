"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import { useParams, useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import ModalAlert from "@/components/molecules/modal-alert";
import { useAlert } from "@/hooks/useAlert";
import { useQuery } from "@tanstack/react-query";
import { schedules } from "@/services/api/schedules";
import { partnerService } from "@/services/api/partner";
import { toast } from "react-toastify";
import { adminService } from "@/services/api/admin";

// const justificativas = [
//   'Houve um imprevisto e irei precisar cancelar nossa atividade, desculpe!',
//   'Condições climáticas desfavoráveis para a realização da atividade.',
//   'Problemas técnicos com equipamentos necessários.',
//   'Número insuficiente de participantes.',
//   'Motivos de força maior/emergência.',
// ];

export default function CancelarAtividade() {
  const router = useRouter();
  const { id } = useParams();

  const { data: justificativas, isLoading } = useQuery({
    queryKey: ["configs"],
    queryFn: () => adminService.listConfig({ type: "justificativa" }),
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedJustificativa, setSelectedJustificativa] =
    React.useState<string>("");

  const { data: parterSchedules } = useQuery({
    queryKey: ["parterSchedules"],
    queryFn: () => schedules.getScheduleById(id as string),
  });

  const hasClient = parterSchedules?.ordersScheduleAdventure;
  const handleCancel = async () => {
    try {
      await partnerService.cancelSchedule(
        id as string,
        String(parterSchedules?.adventureId),
        selectedJustificativa
      );

      router.push(`${PATHS["reservas-parceiro"]}?openModal=true`);
    } catch (error) {
      console.error("Error canceling schedule:", error);
      toast.error("Erro ao cancelar a atividade. Tente novamente mais tarde.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Cancelar atividade
        </MyTypography>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Card de informações */}
        <div className="space-y-6 bg-gray-50 rounded-lg px-4 pt-8 pb-1 border-l-8 border-red-500 border-opacity-50 mb-6">
          <MyTypography variant="subtitle2" weight="bold" className="mb-2">
            Cancelamento de Atividade
          </MyTypography>

          {parterSchedules && parterSchedules.ordersScheduleAdventure && (
            <MyTypography
              variant="body-big"
              weight="bold"
              className="text-red-500 mb-1 uppercase "
            >
              Atenção: Essa atividade tem clientes confirmados!
            </MyTypography>
          )}

          <MyTypography variant="body-big" className="text-gray-600 mb-1">
            Você está prestes a cancelar a atividade!
          </MyTypography>
          <div className="flex items-center gap-2 mt-2">
            <MyTypography variant="body-big">
              Status da Atividade{" "}
              <span className="font-semibold">
                {parterSchedules && parterSchedules.isCanceled
                  ? "Cancelada"
                  : "Confirmada"}
              </span>
            </MyTypography>
          </div>
          <div className="flex justify-end">
            <MyIcon name="doble-check" />
          </div>
        </div>

        {/* Seção de Justificativa */}
        <div className="mb-6">
          <MyTypography variant="subtitle2" weight="bold" className="mb-4">
            Justificativa
          </MyTypography>

          <div className="space-y-3">
            {justificativas &&
              justificativas.map((justificativa: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all border-l-8 ${
                    selectedJustificativa === justificativa?.text
                      ? "border-black bg-gray-50"
                      : "border-gray-200 bg-gray-50 opacity-80"
                  }`}
                  onClick={() => setSelectedJustificativa(justificativa?.text)}
                >
                  <MyTypography variant="body-big">
                    {justificativa?.text}
                  </MyTypography>
                </div>
              ))}
          </div>
        </div>

        <ModalAlert
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAction={handleCancel}
          iconName="cancel"
          title="Cancelamento de Atividade"
          descrition={
            hasClient
              ? "Tem certeza que deseja cancelar essa atividade? Há clientes que já agendaram essa atividade."
              : "Tem certeza que deseja cancelar?"
          }
          button="Cancelar atividade "
        />

        {/* Botão de Cancelar */}
        <MyButton
          variant="default"
          className="w-full"
          size="lg"
          borderRadius="squared"
          disabled={!selectedJustificativa}
          onClick={() => setIsModalOpen(true)}
        >
          Cancelar Atividade
        </MyButton>
      </div>
    </main>
  );
}
