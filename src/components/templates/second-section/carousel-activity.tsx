import MyBadge from "@/components/atoms/my-badge";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { handleNameActivity, selectActivityImage } from "@/utils/formatters";
import Image from "next/image";
import { Adventure, adventures } from "@/services/api/adventures";
import React, { use } from "react";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import MyButton from "@/components/atoms/my-button";
import favoriteActivity from "@/components/organisms/favorite-activity";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type CarouselActitityProps = {
  activity: Adventure;
  favoriteList: {
    favoriteID: string;
    adventureID: string;
  }[];
  type?: string;
};

const CarouselActivity = ({
  activity,
  type,
  favoriteList,
}: CarouselActitityProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const handleActivity = (id: string) => {
    if (type === "parceiro") {
      return router.push(PATHS.visualizarAtividadeParceiro(id));
    } else {
      router.push(PATHS.visualizarAtividade(id));
    }
  };

  const isFavorite = favoriteList.some(
    (favorite) => favorite.adventureID === activity.id.toString()
  );

  const handleFavorite = async (id: number) => {
    if (!session?.user) {
      toast.error("Você precisa estar logado para favoritar uma atividade");
      router.push(PATHS.login);
      return;
    }
    const favoriteActivity = favoriteList.find(
      (activity) => activity.adventureID === id.toString()
    );

    try {
      if (!favoriteActivity) {
        await adventures.addFavorite(id);
        queryClient.invalidateQueries();
      } else {
        await adventures.removeFavorite(
          id.toString(),
          favoriteActivity.favoriteID
        );
        queryClient.invalidateQueries();
      }
    } catch (error) {
      console.error("Erro ao favoritar");
    }
  };
  return (
    <div
      key={activity.id}
      className="min-w-[70%] md:w-[25%] md:min-w-[25%] flex flex-col gap-1 items-start md:mb-8 "
    >
      <div className="relative z-10 overflow-hidden h-[225px] w-full md:w-[250px] hover:cursor-pointer rounded-md">
        <Image
          alt="Fotos da atividade"
          src={selectActivityImage(activity)}
          fill
          className="object-cover cursor-pointer"
          onClick={() => handleActivity((activity?.id).toString())}
        />
        {type !== "parceiro" && isFavorite ? (
          <MyButton variant="ghost" className="z-20 border-2 border-red-500">
            <MyIcon
              name="full-heart"
              variant="circled"
              className="absolute top-3 right-3"
              onClick={() => {
                handleFavorite(activity.id);
              }}
            />
          </MyButton>
        ) : (
          type !== "parceiro" && (
            <MyButton
              variant="ghost"
              className="z-20"
              onClick={() => {
                handleFavorite(activity.id);
              }}
            >
              <MyIcon
                name="black-heart"
                variant="circled"
                className="absolute top-3 right-3"
              />
            </MyButton>
          )
        )}
      </div>
      <div className="mt-1 flex gap-2 items-center">
        <MyBadge variant="outline" className="p-1 text-nowrap">
          {handleNameActivity(activity?.typeAdventure)}
        </MyBadge>
        <StarRating rating={activity?.averageRating} />
      </div>
      <div className="flex gap-2 items-center mt-1">
        <Image
          alt="foto parceiro"
          src={activity?.partner?.logo?.url ?? "/user.png"}
          width={40}
          height={40}
          className="rounded-full object-cover w-8 h-8"
        />
        <MyTypography
          variant="body"
          weight="medium"
          className="mt-1 text-nowrap"
        >
          {activity?.partner?.fantasyName}
        </MyTypography>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => handleActivity((activity?.id).toString())}
      >
        <MyTypography variant="subtitle1" weight="bold">
          {activity?.title}
        </MyTypography>
        <MyTypography variant="body-big" className="md:pr-4">
          {activity?.description.slice(0, 105).concat("...")}
          <MyTypography
            variant="body-big"
            weight="bold"
            lightness={500}
            className="inline cursor-pointer"
          >
            Saiba Mais
          </MyTypography>
        </MyTypography>
      </div>
    </div>
  );
};

export default CarouselActivity;
