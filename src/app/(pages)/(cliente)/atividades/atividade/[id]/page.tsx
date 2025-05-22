"use client";

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import CarouselImages from "@/components/organisms/carousel-images";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import MyBadge from "@/components/atoms/my-badge";
import StarRating from "@/components/molecules/my-stars";
import Image from "next/image";
import MyButton from "@/components/atoms/my-button";
import PATHS from "@/utils/paths";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AdventureImage,
  adventures,
  ClientSchedule,
} from "@/services/api/adventures";
import {
  formatAddress,
  handleActivityImages,
  handleNameActivity,
  sortImagesByDefaultFirst,
} from "@/utils/formatters";
import { useCart } from "@/store/useCart";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ActivityCancelationPolicy from "@/components/organisms/activity-cancelation-policy";
import ActivityDatePicker from "@/components/organisms/activity-date-picker";
import ActivityIncludedItems from "@/components/organisms/activity-included-items";
import ActivityTags from "@/components/organisms/actitity-tags";
import ActivityHeader from "@/components/organisms/activity-header";
import { v4 as uuidv4 } from "uuid";
import Loading from "@/app/loading";
import { users } from "@/services/api/users";

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
  const [expanded, setExpanded] = React.useState(false);
  const MAX_LENGTH = 1000;

  const { data: session } = useSession();

  const query = useQueryClient();

  const userId = session?.user?.id ?? "";

  const { data: fetchedActivity, isLoading } = useQuery({
    queryKey: ["this_activity"],
    queryFn: () => adventures.getAdventureById(Number(id)),
  });

  const price = {
    adult: fetchedActivity?.priceAdult,
    children: fetchedActivity?.priceChildren,
  };

  const renderDescription = () => {
    const full = fetchedActivity?.description ?? "";
    const isLong = full.length > MAX_LENGTH;

    if (!isLong) {
      return (
        <MyTypography
          variant="body-big"
          weight="regular"
          className="mt-1 whitespace-pre-wrap"
        >
          {full}
        </MyTypography>
      );
    }

    const displayedText = expanded ? full : full.slice(0, MAX_LENGTH);
    const toggleText = expanded ? "Ver menos" : "Ver mais";

    return (
      <MyTypography
        variant="body-big"
        weight="regular"
        className="mt-1 whitespace-pre-wrap"
      >
        {displayedText}
        {isLong && !expanded && "..."}
        <span
          onClick={() => setExpanded(!expanded)}
          className="px-1 inline text-gray-400 underline cursor-pointer"
        >
          {toggleText}
        </span>
      </MyTypography>
    );
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
    enabled: !!session?.user,
  });

  const handleFavorite = async () => {
    if (!session?.user) {
      toast.error("Você precisa ter uma conta para favoritar uma atividade");
      router.push(
        `${PATHS.login}?redirect=${PATHS.visualizarAtividade(id as string)}`
      );
      return;
    }

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
    if (!session?.user) {
      toast.error("Você precisa ter uma conta para adicionar ao carrinho.");
      router.push(
        `${PATHS.login}?redirect=${PATHS.visualizarAtividade(id as string)}`
      );
      return;
    }

    if (!schedule.scheduleTime) {
      toast.error("Selecione o horário da atividade.");
      return;
    }

    if (schedule.qntAdults === 0) {
      toast.error("Selecione a quantidade de adultos.");
      return;
    }

    if (fetchedActivity) {
      const adventureOrder = {
        purchaseId: uuidv4(),
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
    if (!session?.user) {
      toast.error("Você precisa ter uma conta para adicionar ao carrinho.");
      router.push(
        `${PATHS.login}?redirect=${PATHS.visualizarAtividade(id as string)}`
      );
      return;
    }

    if (!schedule.scheduleTime) {
      toast.error("Selecione o horário da atividade.");
      return;
    }

    if (schedule.qntAdults === 0) {
      toast.error("Selecione a quantidade de adultos.");
      return;
    }

    if (fetchedActivity) {
      const adventureOrder = {
        purchaseId: uuidv4(),
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

  // const images = handleActivityImages(fetchedActivity);

  const address = {
    addressState: fetchedActivity?.addressState ?? "",
    addressCity: fetchedActivity?.addressCity ?? "",
    addressNeighborhood: fetchedActivity?.addressNeighborhood ?? "",
    addressStreet: fetchedActivity?.addressStreet ?? "",
    addressNumber: fetchedActivity?.addressNumber,
    addressComplement: fetchedActivity?.addressComplement,
    addressPostalCode: fetchedActivity?.addressPostalCode,
    addressCountry: fetchedActivity?.addressCountry,
  };

  return isLoading ? (
    <div className="w-full h-[30vh] flex justify-center items-center">
      <Loading />
    </div>
  ) : !fetchedActivity ? (
    <div className="w-full h-[30vh] flex flex-col justify-center items-center">
      <MyTypography variant="subtitle3" weight="bold" className="mb-16">
        Atividade não encontrada!
      </MyTypography>
      <MyButton
        onClick={() => router.push(PATHS.atividades)}
        borderRadius="squared"
      >
        Ir para atividades
      </MyButton>
    </div>
  ) : (
    <section className="my-10">
      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8 md:hidden hover:cursor-pointer"
          onClick={() => router.back()}
        />

        <div className="md:hidden">
          <CarouselImages
            images={fetchedActivity?.images as AdventureImage[]}
          />
        </div>
        <ActivityHeader activity={fetchedActivity} />
        <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
          {fetchedActivity?.images &&
            sortImagesByDefaultFirst(fetchedActivity.images).map(
              (image, index) => (
                <Image
                  key={index}
                  src={image?.url}
                  alt="album"
                  width={300}
                  height={300}
                  className={`w-full max-h-[25rem] rounded-lg object-cover ${index === 0 ? "col-span-2 row-span-2 h-[25rem]" : "h-[12rem] max-h-[12rem]"}`}
                />
              )
            )}
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
          <MyTypography
            variant="body-big"
            weight="regular"
            className="mt-1 whitespace-pre-wrap break-words"
          >
            {renderDescription()}
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
            address={formatAddress(address)}
            transportAddress={fetchedActivity?.transportAddress ?? ""}
            duration={fetchedActivity?.duration}
            hoursBeforeCancelation={fetchedActivity?.hoursBeforeCancellation}
            price={price}
            isChildrenAllowed={fetchedActivity?.isChildrenAllowed ?? false}
          />

          <div className="md:flex md:flex-col md:items-center">
            <ActivityDatePicker
              activity={fetchedActivity}
              schedule={schedule}
              setSchedule={setSchedule}
            />
            <MyButton
              variant="default"
              className="mt-12 w-full md:hidden"
              size="lg"
              borderRadius="squared"
              rightIcon={<MyIcon name="seta-direita" className="ml-3" />}
              onClick={handleMobileOrder}
            >
              Garantir sua vaga
            </MyButton>

            <MyButton
              variant="default"
              className="mt-4 w-[320px] max-sm:hidden"
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
