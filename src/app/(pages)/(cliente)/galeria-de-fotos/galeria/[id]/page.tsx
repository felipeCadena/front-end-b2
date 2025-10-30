"use client";

import Loading from "@/app/loading";
import { album } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { schedules } from "@/services/api/schedules";
import { getData } from "@/utils/formatters";
import PATHS from "@/utils/paths";
import downloadImagesAsZip from "@/utils/zipPhotos";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import handleDownloadImage from "@/utils/downloadImage";

export default function Galeria() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [loadingRedirect, setLoadingRedirect] = React.useState(true);

  const { data: activity } = useQuery({
    queryKey: ["activity_schedule"],
    queryFn: () => schedules.getScheduleById(id as string),
  });

  const { data: activityPhotos = [], isLoading: isLoadingPhotos } = useQuery({
    queryKey: ["activity_photos"],
    queryFn: async () => await schedules.getScheduleMedias(id as string),
  });

  const handleFetchPhotos = async (id: string, downloadAll?: boolean) => {
    if (downloadAll && id !== "") {
      if (activityPhotos.length === 0) {
        return;
      }
      try {
        setLoading(true);
        await downloadImagesAsZip(activityPhotos);
      } catch (error) {
        console.error("Erro ao baixar imagens", error);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    setLoadingRedirect(true);
    if (window) {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        router.push(`${PATHS.informacoes}?tab=galeria`);
      } else {
        setLoadingRedirect(false);
      }
    }
  }, []);

  return loadingRedirect ? (
    <div>
      <Loading />
    </div>
  ) : (
    <section className="m-6">
      <div className="relative flex gap-4 items-center">
        <MyIcon
          name="seta"
          className="rotate-180"
          onClick={() => router.back()}
        />
        <MyTypography variant="heading3" weight="bold" className="">
          Albúm de fotos
        </MyTypography>
      </div>

      <div className="flex flex-col gap-2 cursor-pointer w-1/2 mt-8">
        <MyTypography variant="heading3" weight="bold">
          {activity?.title}
        </MyTypography>
        <MyTypography variant="body-big" weight="bold">
          Data: {getData(activity?.datetime ?? "", true)}
        </MyTypography>

        <div className="flex gap-2 items-center">
          <Image
            alt="foto parceiro"
            src={activity?.adventure?.partner?.logo.url ?? "/user.png"}
            width={40}
            height={40}
            className="rounded-full"
          />
          <MyTypography variant="body" weight="medium" className="">
            {activity?.adventure?.partner?.fantasyName}
          </MyTypography>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <MyButton
          variant="default"
          borderRadius="squared"
          size="md"
          className="col-span-2 my-4"
          rightIcon={<MyIcon name="download" className="" />}
          isLoading={loading}
          onClick={() => handleFetchPhotos(activity?.id ?? "", true)}
        >
          Baixar todas as imagens
        </MyButton>
        {isLoadingPhotos ? (
          <div className="w-full h-[30vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          activityPhotos.map((media, index) => (
            <div key={index} className="flex justify-center relative">
              <Image
                src={media.url ?? ""}
                alt={media.title ?? "foto"}
                width={150}
                height={150}
                className="w-40 h-40 rounded-lg object-cover"
              />
              <MyIcon
                name="download-green"
                className="absolute top-2 right-2 bg-white p-2 rounded-lg group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() =>
                  handleDownloadImage(media.url, media?.title ?? "")
                }
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
