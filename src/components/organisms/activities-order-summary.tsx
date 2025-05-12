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

const ActivitiesOrderSummary = ({
  activities,
}: ActivitiesOrderSummaryProps) => {
  const router = useRouter();
  const session = useSession();
  const { removeFromCart } = useCart();

  const handleRemoveActivity = (id: string) => {
    const userId = session.data?.user.id;

    if (userId) {
      removeFromCart(id, userId);
      toast.success("Atividade removida do carrinho!");
    } else {
      toast.error("Token expirado!");
    }
  };

  return (
    <section>
      {activities &&
        activities.map(({ adventure, schedule, purchaseId }, index: number) => (
          <div className="md:grid md:grid-cols-4 gap-4 mt-8 mb-16" key={index}>
            <div
              className="md:col-span-1 relative z-10 overflow-hidden md:min-w-[8rem] md:min-h-full hover:cursor-pointer rounded-md md:flex"
              onClick={() =>
                router.push(PATHS.visualizarAtividade(adventure?.id))
              }
            >
              <Image
                alt="Imagem Aventura"
                src={selectActivityImage(adventure)}
                width={265}
                height={265}
                priority
                className="md:w-[265px] md:h-[265px] w-[114px] h-[106px] object-cover"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-between gap-2">
              <div className="w-full flex flex-col">
                <div className="flex justify-between md:items-center items-start w-full mr-4 mb-1">
                  <div className="flex md:flex-row flex-col md:items-center gap-4 ">
                    <div className="flex justify-start">
                      <MyBadge
                        className="font-medium text-nowrap p-1 mr-2"
                        variant="outline"
                      >
                        {handleNameActivity(adventure?.typeAdventure)}
                      </MyBadge>
                      <StarRating rating={adventure?.averageRating} />
                    </div>
                    <div className="flex gap-2 items-center my-1">
                      <Image
                        alt="foto parceiro"
                        src={adventure?.partner?.logo?.url}
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full border-2"
                      />
                      <MyTypography
                        variant="body"
                        weight="medium"
                        className="mt-1 text-nowrap"
                      >
                        {adventure?.partner?.fantasyName}
                      </MyTypography>
                    </div>
                  </div>
                  <MyButton
                    variant="ghost"
                    className="z-10 ml-auto"
                    onClick={() => handleRemoveActivity(purchaseId)}
                  >
                    <MyIcon name="trash" className="hover:cursor-pointer" />
                  </MyButton>
                </div>

                <MyTypography variant="subtitle3" weight="bold" className="">
                  {adventure?.title}
                </MyTypography>
                <MyTypography variant="label" className="">
                  {adventure?.description}
                </MyTypography>
              </div>
              <div className="w-full flex flex-col items-center gap-3 p-3 mt-2 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
                <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>

                <div className="w-full flex md:flex-row flex-col md:items-center justify-between gap-1 text-nowrap">
                  <div className="flex flex-col">
                    <MyTypography
                      variant="label"
                      weight="bold"
                      className="ml-3"
                    >
                      Data da Atividade
                    </MyTypography>

                    <MyTypography
                      variant="body"
                      weight="regular"
                      className="ml-3"
                    >
                      {getData(schedule?.scheduleDate?.toString() as string)} -{" "}
                      {formatTime(schedule?.scheduleTime)}
                    </MyTypography>
                  </div>

                  <div className="flex items-center gap-1">
                    <div>
                      <MyTypography variant="label" weight="bold" className="">
                        Duração da atividade
                      </MyTypography>
                      <MyTypography
                        variant="body"
                        weight="regular"
                        className="flex items-center"
                      >
                        <MyIcon name="mobileDuracao" />
                        {adventure?.duration + " horas"}
                      </MyTypography>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <MyTypography
                      variant="label"
                      weight="bold"
                      className="ml-3"
                    >
                      Quant. de Adultos
                    </MyTypography>
                    <MyTypography
                      variant="body"
                      weight="regular"
                      className="ml-3"
                    >
                      {schedule?.qntAdults} x{" "}
                      {formatPrice(schedule?.pricePerAdult)}
                    </MyTypography>
                  </div>
                  {schedule?.qntChildren > 0 && (
                    <div className="flex flex-col">
                      <MyTypography
                        variant="label"
                        weight="bold"
                        className="ml-3"
                      >
                        Quant. de Crianças
                      </MyTypography>
                      <MyTypography
                        variant="body"
                        weight="regular"
                        className="ml-3"
                      >
                        {schedule?.qntChildren} x{" "}
                        {formatPrice(schedule?.pricePerChildren ?? "0")}
                      </MyTypography>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <MyTypography
                      variant="body-big"
                      weight="bold"
                      className="text-right"
                    >
                      Total:
                    </MyTypography>
                    <MyTypography variant="body" weight="bold" className="">
                      {formatPrice(
                        schedule?.qntAdults * Number(schedule?.pricePerAdult) +
                          schedule?.qntChildren *
                            Number(schedule?.pricePerChildren)
                      )}
                    </MyTypography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default ActivitiesOrderSummary;
