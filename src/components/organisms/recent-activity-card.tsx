import { PartnerSchedule } from "@/services/api/admin";
import React from "react";
import MyTypography from "../atoms/my-typography";
import { formatDateToUTC3, getTimeInterval } from "@/utils/formatters";
import Now from "../atoms/my-icon/elements/now";
import Hide from "../atoms/my-icon/elements/hide";
import PopupActivity from "./popup-activity";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { cn } from "@/utils/cn";
import { addHours, addMinutes } from "date-fns";

type RecentActivityCardProps = {
  recentActivity: PartnerSchedule;
  hidden?: boolean;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
  index: number;
};

const RecentActivityCard = ({
  recentActivity,
  hidden,
  setShowModal,
  index,
}: RecentActivityCardProps) => {
  const { adventure, adventureStatus, schedule } = recentActivity;
  const router = useRouter();

  const activityDateTime = new Date(schedule.datetime);

  const [hoursStr, minutesStr] = adventure.duration.split(":");
  const durationHours = hoursStr.includes("h")
    ? Number(hoursStr.split("h")[0])
    : Number(hoursStr);
  const durationMinutes = Number(minutesStr);

  const activityStartAt = activityDateTime.toISOString().slice(11, 16);

  const withHours = addHours(activityDateTime, durationHours);
  const activityEndDate = addMinutes(withHours, durationMinutes ?? 0);
  const activityEndAt =
    activityEndDate && activityEndDate.toISOString().slice(11, 16);

  const handleCancel = (id: string | number) => {
    router.push(PATHS.cancelarAtividade(id));
  };

  const handleEdit = (id: string) => {
    router.push(PATHS.editarAtividadeParceiro(id));
  };

  return (
    <div
      key={schedule.id}
      className={cn(
        "w-full flex flex-col gap-2 px-3 py-2 bg-[#F1F0F5] rounded-lg shadow-sm hover:bg-gray-100 relative cursor-pointer",
        adventureStatus.includes("cancelad")
          ? "border border-[#FF7272]"
          : adventureStatus.includes("confirmad")
            ? "border border-primary-600"
            : "border"
      )}
    >
      {!hidden && (
        <div className="absolute top-0 right-3 z-20">
          <PopupActivity
            onDuplicar={() => console.log("Duplicar")}
            onCancelar={() => handleCancel(schedule?.id as string)}
            onEditar={() => handleEdit(schedule?.id as string)}
            onOcultar={() => console.log("Ocultar")}
            onExcluir={() => console.log("Excluir")}
            onCustomer={() => setShowModal(true)}
          />
        </div>
      )}

      {adventureStatus && activityStartAt && activityEndAt && (
        <div className="flex items-center justify-between w-full">
          <MyTypography
            variant="notification"
            weight="semibold"
            className="mt-1 flex gap-2 items-center"
          >
            <Now
              iconColor={
                adventureStatus.includes("agendad")
                  ? "#8DC63F"
                  : adventureStatus.includes("realizad")
                    ? "#9F9F9F"
                    : adventureStatus.includes("cancelad")
                      ? "#FF7272"
                      : "#2DADE4"
              }
            />
            {activityStartAt + " - " + activityEndAt}
          </MyTypography>
        </div>
      )}

      <MyTypography variant="label" weight="semibold" className="">
        {index < 9 ? `0${index + 1}` : index} - {adventure.title}
      </MyTypography>
      <MyTypography
        variant="notification"
        weight="regular"
        className="flex justify-between"
        lightness={400}
      >
        {adventureStatus.includes("cancelad")
          ? "Atividade cancelada"
          : adventureStatus.includes("agendad")
            ? schedule.qntConfirmedPersons +
              " clientes participando desta atividade"
            : adventureStatus.includes("realizad")
              ? schedule.qntConfirmedPersons +
                " clientes participaram desta atividade"
              : schedule.qntConfirmedPersons +
                " clientes vão participar desta atividade"}
      </MyTypography>
    </div>
  );
};

export default RecentActivityCard;
