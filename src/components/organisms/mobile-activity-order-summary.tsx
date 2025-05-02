import React from "react";

import Image from "next/image";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import MyIcon from "../atoms/my-icon";
import {
  formatPrice,
  formatTime,
  getData,
  handleNameActivity,
  selectActivityImage,
} from "@/utils/formatters";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import { AddToCartAdventure } from "@/services/api/adventures";
import MyButton from "../atoms/my-button";
import { useCart } from "@/store/useCart";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type ActivitiesOrderSummaryProps = {
  activities: AddToCartAdventure[];
};

const MobileActivitiesOrderSummary = ({
  activities,
}: ActivitiesOrderSummaryProps) => {
  const router = useRouter();
  const session = useSession();
  const { removeFromCart } = useCart();

  const handleRemoveActivity = (id: number) => {
    const userId = session.data?.user.id;

    if (userId) {
      removeFromCart(String(id), userId);
      toast.success("Atividade removida do carrinho!");
    } else {
      toast.error("Token expirado!");
    }
  };

  return (
    <section>
      {activities &&
        activities.map(({ adventure, schedule }, index: number) => (
          <div className="gap-4 mt-8 mb-16" key={index}>
            <div className="flex flex-row justify-start flex-wrap items-start">
              <div className="flex rounded-md w-fit">
                <Image
                  alt="sample_file"
                  src={selectActivityImage(adventure)}
                  width={114}
                  height={106}
                  className="w-[94px] h-[106px] object-cover rounded-md"
                />
                <div className="flex flex-col gap-2 ml-2">
                  <div className="flex justify-between">
                    <MyBadge
                      className="font-medium text-nowrap p-1 mr-2"
                      variant="outline"
                    >
                      {handleNameActivity(adventure.typeAdventure)}
                    </MyBadge>
                    <StarRating rating={adventure.averageRating} />
                  </div>
                  <div className="w-full flex flex-col">
                    <MyTypography
                      variant="subtitle3"
                      weight="bold"
                      className=""
                    >
                      {adventure.title}
                    </MyTypography>
                    <MyTypography variant="label" className="">
                      {adventure.description.slice(0, 30) + "..."}
                    </MyTypography>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4" />

            <div className="col-span-3 flex flex-col justify-between gap-2">
              <MyTypography variant="subtitle3" weight="bold">
                Detalhes:
              </MyTypography>
              <div
                className="w-full flex flex-col items-center gap-3 px-3 py-4 mt-2 border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm relative"
                onClick={() =>
                  router.push(PATHS.atividadeRealizada(adventure.id))
                }
              >
                <div className="w-full flex flex-col justify-between gap-1 text-nowrap">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-start gap-1">
                      <MyTypography variant="label" weight="bold">
                        Data da Atividade:
                      </MyTypography>
                      <MyTypography variant="body" weight="regular">
                        {getData(schedule.scheduleDate?.toString() as string)} -{" "}
                        {formatTime(schedule.scheduleTime)}
                      </MyTypography>
                    </div>

                    <div className="flex flex-col items-start gap-1">
                      <MyTypography variant="label" weight="bold" className="">
                        Duração da atividade:
                      </MyTypography>
                      <div className="flex items-center justify-start">
                        <MyIcon name="mobileDuracao" />
                        <MyTypography
                          variant="body"
                          weight="regular"
                          className=""
                        >
                          {adventure.duration}
                        </MyTypography>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 py-4">
                    <MyTypography variant="label" weight="bold">
                      Quant. de pessoas
                    </MyTypography>
                    <MyTypography variant="body" weight="regular">
                      {schedule.qntAdults}{" "}
                      {schedule.qntAdults > 1 ? "Adultos" : "Adulto"} x{" "}
                      {formatPrice(schedule.pricePerAdult)}
                    </MyTypography>
                    {schedule.qntChildren > 0 && (
                      <div className="gap-1 w-fit flex flex-col items-center">
                        <hr className="my-1 w-[50%]" />
                        <MyTypography variant="body" weight="regular">
                          {schedule.qntChildren}{" "}
                          {schedule.qntChildren > 1 ? "Crianças" : "Criança"} x{" "}
                          {formatPrice(schedule.pricePerChildren ?? "0")}
                        </MyTypography>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end">
                    <MyTypography
                      variant="body-big"
                      weight="bold"
                      className="text-left"
                    >
                      Total:
                    </MyTypography>
                    <MyTypography
                      variant="body"
                      weight="bold"
                      className="text-[#8ec74e] text-lg"
                    >
                      {formatPrice(
                        schedule.qntAdults * Number(schedule.pricePerAdult) +
                          schedule.qntChildren *
                            Number(schedule.pricePerChildren)
                      )}
                    </MyTypography>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end mt-2">
              <MyButton
                variant="ghost"
                className="underline text-slate-400 decoration-dotted p-0 w-fit h-fit"
                onClick={() => handleRemoveActivity(adventure.id)}
              >
                Remover atividade
              </MyButton>
            </div>
          </div>
        ))}
    </section>
  );
};

export default MobileActivitiesOrderSummary;
