"use client";

import MyBadge from "@/components/atoms/my-badge";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Activities({
  activities,
  type,
  withoutHeart,
  withoutShared,
}: {
  activities: any;
  type?: string;
  withoutHeart?: boolean;
  withoutShared?: boolean;
}) {
  const router = useRouter();

  const handleActivity = (id: string) => {
    if (type === "parceiro") {
      return router.push(PATHS.visualizarAtividadeParceiro(id));
    } else if (type === "admin") {
      return router.push(`/admin/avaliacoes/atividade/${id}`);
    } else {
      router.push(PATHS.visualizarAtividade(id));
    }
  };

  return (
    <section className={cn("grid grid-cols-4 gap-6")}>
      {activities.map((activity: any, index: number) => (
        <div
          key={index}
          className="min-w-[70%] md:min-w-[30%] lg:min-w-[20%] flex flex-col gap-1 cursor-pointer md:mb-8"
          onClick={() => handleActivity(activity.id)}
        >
          <div className="relative z-10 overflow-hidden h-[265px] w-full hover:cursor-pointer rounded-md">
            <Image
              alt="sample_file"
              src={activity.image ?? ""}
              width={250}
              height={300}
              className="w-full h-[265px] object-cover"
            />

            {!withoutHeart && activity.favorite ? (
              <MyIcon
                name="full-heart"
                variant="circled"
                className="absolute top-3 right-3"
              />
            ) : (
              !withoutHeart && (
                <MyIcon
                  name="black-heart"
                  variant="circled"
                  className="absolute top-3 right-3"
                />
              )
            )}
          </div>
          <span className="mt-2">
            <MyBadge variant="outline" className="p-2">
              {activity.tag}
            </MyBadge>
          </span>
          <div className="flex justify-between items-center">
            <StarRating rating={activity.stars} />
            {!withoutShared && (
              <MyIcon name="shared-muted" className="cursor-pointer mx-2" />
            )}
          </div>
          <MyTypography variant="subtitle1" weight="bold" className="">
            {activity.title}
          </MyTypography>
          <MyTypography variant="body-big" className="">
            {activity.description.slice(0, 25).concat("...")}
          </MyTypography>
        </div>
      ))}
    </section>
  );
}
