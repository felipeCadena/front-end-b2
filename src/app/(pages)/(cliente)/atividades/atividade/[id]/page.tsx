"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { album } from "@/common/constants/mock";
import MyBadge from "@/components/atoms/my-badge";
import StarRating from "@/components/molecules/my-stars";
import Image from "next/image";
import MyButton from "@/components/atoms/my-button";
import PATHS from "@/utils/paths";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Adventure,
  adventures,
  ClientSchedule,
} from "@/services/api/adventures";
import { handleActivityImages, handleNameActivity } from "@/utils/formatters";
import { useCart } from "@/store/useCart";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ActivityCancelationPolicy from "@/components/organisms/activity-cancelation-policy";
import ActivityDatePicker from "@/components/organisms/activity-date-picker";
import ActivityIncludedItems from "@/components/organisms/activity-included-items";
import ActivityTags from "@/components/organisms/actitity-tags";
import ActivityHeader from "@/components/organisms/activity-header";

const initialScheduleState = {
  qntAdults: 0,
  qntChildren: 0,
  qntBabies: 0,
  scheduleDate: new Date(),
  scheduleTime: "",
  pricePerAdult: "",
  pricePerChildren: "",
};

export default function Atividade() {
  const router = useRouter();
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);
  const [schedule, setSchedule] =
    useState<ClientSchedule>(initialScheduleState);

  const query = useQueryClient();
  const session = useSession();
  const userId = session.data?.user.id;

  const { data: fetchedActivity } = useQuery({
    queryKey: ["this_activity"],
    queryFn: () => adventures.getAdventureById(Number(id)),
  });

  console.log('ACT', fetchedActivity);

  const price = {
    adult: fetchedActivity?.priceAdult,
    children: fetchedActivity?.priceChildren,
  };

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await adventures.listFavorites();
      const isFavorite = response.some(
        (favorite) => Number(id) === favorite.adventure.id
      );
      setFavorite(isFavorite);

      return response;
    },
    enabled: !!session?.data?.user,
  });

  const handleFavorite = async () => {
    const favoriteActivity = favorites.find(
      (favorite) => favorite.adventure.id === Number(id)
    );

    try {
      if (!favoriteActivity) {
        await adventures.addFavorite(Number(id));
        query.invalidateQueries();

        setFavorite((prev) => !prev);
      } else {
        await adventures.removeFavorite(id as string, favoriteActivity?.id);
        query.invalidateQueries();

        setFavorite((prev) => !prev);
      }
    } catch (error) {
      console.error("Erro ao favoritar");
    }
  };

  const parsedItems: string[] = JSON.parse(
    `${fetchedActivity?.itemsIncluded ?? "[]"}`
  );

  const { addToCart } = useCart();

  const handleOrder = () => {
    if (fetchedActivity) {
      const adventureOrder = {
        adventure: fetchedActivity,
        schedule: {
          ...schedule,
          pricePerAdult: fetchedActivity.priceAdult,
          pricePerChildren: fetchedActivity.priceChildren,
        },
      };
      if (userId) {
        addToCart(adventureOrder, userId);
        router.push(PATHS["finalizar-compra"]);
        toast.success("Atividade adicionada ao carrinho!");
      }
    }
  };

  const handleMobileOrder = () => {
    if (fetchedActivity) {
      const adventureOrder = {
        adventure: fetchedActivity,
        schedule: {
          ...schedule,
          pricePerAdult: fetchedActivity.priceAdult,
          pricePerChildren: fetchedActivity.priceChildren,
        },
      };
      if (userId) {
        addToCart(adventureOrder, userId);
        router.push(PATHS["carrinho"]);
        toast.success("Atividade adicionada ao carrinho!");
      }
    }
  };

  const images = handleActivityImages(fetchedActivity);

  return (
    <section className="my-10">
      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8 md:hidden hover:cursor-pointer"
          onClick={() => router.back()}
        />

        <div className="md:hidden">
          <CarouselImages images={images} />
        </div>
        <ActivityHeader activity={fetchedActivity} />
        <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
          {album.slice(0, 5).map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="album"
              width={300}
              height={300}
              className={`h-full w-full rounded-lg object-cover ${index === 0 ? "col-span-2 row-span-2 h-full" : ""}`}
            />
          ))}
        </div>

        {favorite && (
          <MyTypography
            variant="body-big"
            weight="bold"
            className="hidden md:block text-red-400 absolute z-50 top-11 right-24"
          >
            Favoritada!
          </MyTypography>
        )}

        <div
          className="cursor-pointer md:border  rounded-full md:w-12 md:h-12 absolute z-50 top-8 right-8 flex items-center justify-center"
          onClick={handleFavorite}
        >
          <MyIcon
            name={favorite ? "full-heart" : "black-heart"}
            className="z-999"
          />
        </div>

        <div className="m-4 mx-6 md:hidden">
          <MyTypography variant="heading2" weight="bold" className="">
            {fetchedActivity?.title}
          </MyTypography>
          <div className="flex items-center justify-between">
            <MyBadge variant="outline" className="p-1">
              {handleNameActivity(fetchedActivity?.typeAdventure as string)}
            </MyBadge>
            <StarRating rating={fetchedActivity?.averageRating ?? 0} />
          </div>
        </div>

        <div className="mx-6 flex items-center gap-2 md:hidden">
          <Image
            alt="avatar"
            src={fetchedActivity?.partner?.logo?.url ?? "/user.png"}
            width={6}
            height={6}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <MyTypography variant="notification" weight="semibold">
              {fetchedActivity?.partner?.fantasyName}
            </MyTypography>
            <MyTypography
              variant="notification"
              weight="regular"
              lightness={400}
            >
              Parceiro e Guia de atividades
            </MyTypography>
          </div>
        </div>

        <div className="mx-6 my-4 mt-4 md:hidden">
          <MyTypography variant="subtitle3" weight="bold" className="">
            Descrição da atividade:
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            {fetchedActivity?.description}
          </MyTypography>
        </div>
      </div>

      <div className="mx-6">
        <div className="md:grid md:grid-cols-2 md:gap-8 my-4">
          <ActivityIncludedItems
            transportIncluded={fetchedActivity?.transportIncluded ?? false}
            itemsIncluded={parsedItems}
          />

          <ActivityTags
            isChildrenAllowed={fetchedActivity?.isChildrenAllowed ?? false}
            isInGroup={fetchedActivity?.isInGroup ?? false}
            activityDifficulty={fetchedActivity?.difficult}
          />
        </div>

        <div className="md:grid md:grid-cols-2 gap-8">
          <ActivityCancelationPolicy
            addressNeighborhood={fetchedActivity?.addressNeighborhood}
            addressState={fetchedActivity?.addressState}
            duration={fetchedActivity?.duration}
            hoursBeforeCancelation={fetchedActivity?.hoursBeforeCancellation}
            price={price}
          />

          <div className="md:flex md:flex-col md:items-center">
            <ActivityDatePicker
              isChildrenAllowed={fetchedActivity?.isChildrenAllowed ?? false}
              price={price}
              schedule={schedule}
              setSchedule={setSchedule}
              activityRecurrence={fetchedActivity?.recurrence ?? []}
            />
            <MyButton
              variant="default"
              className="mt-8 w-full md:hidden"
              size="lg"
              borderRadius="squared"
              rightIcon={<MyIcon name="seta-direita" className="ml-3" />}
              onClick={handleMobileOrder}
            >
              Garantir sua vaga
            </MyButton>

            <MyButton
              variant="default"
              className="mt-4 w-[280px] max-sm:hidden"
              size="lg"
              borderRadius="squared"
              onClick={handleOrder}
              rightIcon={<MyIcon name="seta-direita" className="ml-3" />}
            >
              Garantir sua vaga
            </MyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
