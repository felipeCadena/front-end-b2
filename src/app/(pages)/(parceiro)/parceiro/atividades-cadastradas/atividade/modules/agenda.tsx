import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { CalendarAvailability } from "@/components/organisms/calendar-availability";
import { ModalProps } from "@/components/organisms/edit-activity";
import { partnerService } from "@/services/api/partner";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

export default function Agenda({ formData, setFormData, onClose }: ModalProps) {
  const queryClient = useQueryClient();

  const handleCreateSchedule = async (datetimes: string[]) => {
    // Remove duplicate datetimes
    datetimes = Array.from(new Set(datetimes));
    const body = datetimes.map((datetime) => ({
      datetime: datetime.trim(),
      isAvailable: true,
    }));

    try {
      await partnerService.createMoreSchedule(formData.id, body);
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Horários criados com sucesso!");
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Erro ao criar horário!");
    }
  };

  const handleCancelSchedule = async (scheduleId: string) => {
    try {
      console.log("scheduleId", scheduleId);
      await partnerService.cancelSchedule(scheduleId, formData.id);

      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Horário cancelado com sucesso!");
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Erro ao cancelar horário!");
    }
  };

  const handleCancelAllSchedules = async (schedulesId: string[]) => {
    try {
      const allSchedules = schedulesId.map((scheduleId) =>
        partnerService.cancelSchedule(scheduleId, formData.id)
      );

      await Promise.all(allSchedules);

      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Horários cancelados com sucesso!");
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Erro ao cancelar todos os horário!");
    }
  };

  const getSchedulesActive = (formData?.schedules ?? []).filter(
    (schedule: any) =>
      schedule.isAvailable === true && schedule.isCanceled === false
  );

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 items-center">
        <MyIcon name="voltar-black" className="-ml-2" onClick={onClose} />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Editar Datas Específicas
        </MyTypography>
      </div>
      <MyTypography variant="subtitle4" weight="regular" className="mb-6">
        Você pode cancelar uma data e/ou horários específicos ou criar uma
        agenda.
      </MyTypography>
      <div className="relative mt-4 mb-10">
        <CalendarAvailability
          duration={formData?.duration}
          schedules={getSchedulesActive}
          onCreateSchedule={handleCreateSchedule}
          onCancelSchedule={handleCancelSchedule}
          onCancelAllSchedules={handleCancelAllSchedules}
        />
      </div>
    </div>
  );
}
