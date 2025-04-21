import MyBadge from "@/components/atoms/my-badge";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { handleNameActivity, selectActivityImage } from "@/utils/formatters";
import Image from "next/image";
import { Adventure } from "@/services/api/adventures";
import React from "react";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";

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
  return (
    <div
      key={activity.id}
      className="min-w-[85%] w-[25%] md:min-w-[25%] flex flex-col gap-1 cursor-pointer items-start md:mb-8"
      onClick={() => handleActivity((activity?.id).toString())}
    >
      <div className="relative z-10 overflow-hidden h-[225px] w-full md:w-[250px] hover:cursor-pointer rounded-md">
        <Image
          alt="Fotos da atividade"
          src={selectActivityImage(activity)}
          fill
          className="object-cover"
        />
        {type !== "parceiro" && isFavorite ? (
          <MyIcon
            name="full-heart"
            variant="circled"
            className="absolute top-3 right-3"
          />
        ) : (
          type !== "parceiro" && (
            <MyIcon
              name="black-heart"
              variant="circled"
              className="absolute top-3 right-3"
            />
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
  );
};

export default CarouselActivity;
