"use client";

import MyBadge from "@/components/atoms/my-badge";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { Adventure, adventures } from "@/services/api/adventures";
import { handleNameActivity, selectActivityImage } from "@/utils/formatters";
import PATHS from "@/utils/paths";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import MyShareButton from "../atoms/my-share-button";

type FavoriteActivityProps = {
  activity: Adventure;
  favoriteID: string;
};

export default function FavoriteActivity({
  activity,
  favoriteID,
}: FavoriteActivityProps) {
  const id = activity.id.toString();

  const query = useQueryClient();

  const removeFavorite = async () => {
    try {
      await adventures.removeFavorite(id, favoriteID);
      query.invalidateQueries();
      toast.success("Atividade removida dos favoritos!");
    } catch (error) {
      console.error("Falha ao remover dos favoritos");
    }
  };

  const frontBaseURL =
    process.env.NEXT_PUBLIC_PROD_URL ?? "http://localhost:3000";

  return (
    <div
      key={id}
      className="min-w-[70%] md:min-w-[30%] lg:min-w-[20%] flex flex-col gap-1 md:mb-8 max-sm:hidden"
    >
      <div className="relative z-10 overflow-hidden h-[265px] w-full  rounded-md">
        <Link href={PATHS.visualizarAtividade(id)}>
          <Image
            alt="Imagem da atividade"
            src={
              selectActivityImage(activity) ??
              "/images/atividades/paraquedas.webp"
            }
            width={250}
            height={300}
            className="w-full h-[265px] object-cover"
          />
        </Link>

        <MyIcon
          name="full-heart"
          className="absolute top-3 right-3 hover:cursor-pointer"
          onClick={removeFavorite}
        />
      </div>
      <span className="mt-2">
        <MyBadge variant="outline" className="p-2">
          {handleNameActivity(activity.typeAdventure)}
        </MyBadge>
      </span>
      <div className="flex justify-between items-center">
        <StarRating rating={activity.averageRating} />

        <MyShareButton url={`${frontBaseURL}/atividades/atividade/${id}`} />
      </div>
      <MyTypography variant="subtitle1" weight="bold" className="md:hidden">
        {activity?.title?.length > 35
          ? activity.title.slice(0, 35) + "..."
          : activity.title}
      </MyTypography>
      <MyTypography variant="subtitle1" weight="bold" className="max-sm:hidden">
        {activity.title.slice(0, 20) + "..."}
      </MyTypography>
      <MyTypography variant="body-big" className="max-sm:hidden">
        {activity.description.slice(0, 25).concat("...")}
      </MyTypography>
      <MyTypography variant="body-big" className="md:hidden mb-8">
        {activity.description}
      </MyTypography>
    </div>
  );
}
