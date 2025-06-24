"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from "@/components/molecules/my-dialog";
import MyTypography from "../atoms/my-typography";
import User from "../atoms/my-icon/elements/user";
import X from "../atoms/my-icon/elements/x";
import { toast } from "react-toastify";
import { ordersAdventuresService } from "@/services/api/orders";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { partnerService } from "@/services/api/partner";

interface ModalAlertProps {
  open: boolean;
  onClose: () => void;
  // data: any[];
  icon: React.ReactNode;
  title: string;
  descrition: string;
  button: string;
  id: string;
}

export default function GenericModal({
  open,
  onClose,
  // data,
  icon,
  title,
  descrition,
  button,
  id,
}: ModalAlertProps) {
  const queryClient = useQueryClient();

  const handleConfirmSchedule = async (
    scheduleId: string,
    orderScheduleAdventureId: string
  ) => {
    try {
      const response = await ordersAdventuresService.partnerConfirmSchedule(
        scheduleId,
        orderScheduleAdventureId
      );
      if (response) {
        toast.success("Agendamento confirmado com sucesso!");
      }

      queryClient.invalidateQueries({ queryKey: ["clientList"] });
      queryClient.invalidateQueries({ queryKey: ["parterSchedules"] });
    } catch (error) {
      console.error("Error confirming schedule:", error);
      toast.error("Erro ao confirmar agendamento!");
    }
  };

  const { data: clientList } = useQuery({
    queryKey: ["clientList", id],
    queryFn: () => partnerService.getPartnerScheduleById(id),
    enabled: !!id,
  });

  return (
    <MyDialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white flex flex-col gap-4 max-w-sm md:w-full h-auto rounded-2xl text-left px-4 md:max-h-[90vh] md:max-w-3xl overflow-auto">
        <DialogHeader className="text-left relative">
          <div onClick={onClose} className="absolute -top-2 -right-2">
            <X width="24" height="24" />
          </div>
          <DialogTitle className="text-lg md:text-xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg">
            {descrition}
          </DialogDescription>
        </DialogHeader>

        {clientList &&
          clientList?.ordersScheduleAdventure.map(
            (schedule: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-start gap-4 py-2 border-b border-gray-200"
              >
                {icon}
                <div className="flex items-center justify-between w-full">
                  <div>
                    <MyTypography
                      variant="subtitle2"
                      lightness={500}
                      className="text-base md:text-lg"
                    >
                      {schedule?.orderAdventure?.customer?.name}
                    </MyTypography>
                    <MyTypography
                      variant="subtitle3"
                      lightness={500}
                      className="text-base md:text-lg"
                    >
                      Pessoas: {schedule?.qntAdults + schedule?.qntChildren}
                    </MyTypography>
                  </div>
                  {!schedule?.partnerConfirmed ? (
                    <MyButton
                      onClick={() =>
                        handleConfirmSchedule(
                          schedule?.orderAdventure?.id,
                          schedule?.id
                        )
                      }
                      variant="outline-neutral"
                      borderRadius="squared"
                      size="md"
                    >
                      Confirmar
                    </MyButton>
                  ) : (
                    <MyTypography
                      variant="subtitle3"
                      className="text-base md:text-lg mx-2"
                    >
                      Confirmado
                    </MyTypography>
                  )}
                </div>
              </div>
            )
          )}

        <div>
          <MyButton
            onClick={onClose}
            borderRadius="squared"
            size="lg"
            className="w-full mt-4"
          >
            {button}
          </MyButton>
        </div>
      </DialogContent>
    </MyDialog>
  );
}
