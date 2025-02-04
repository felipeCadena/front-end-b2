"use client";

import Image from "next/image";
import React from "react";
import MyIcon from "../atoms/my-icon";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";
import { cn } from "@/utils/cn";
import { getData, isDateInPast } from "@/utils/formatters";

export default function ActivitiesDetails({
  activities,
  withDate = false,
}: {
  activities: any;
  withDate?: boolean;
}) {
  return (
    <section className={cn(withDate && "mx-6")}>
      {activities.map((activity: any, index: number) => (
        <div
          key={index}
          className={cn(
            "flex max-sm:justify-around gap-2 cursor-pointer my-6",
            withDate && "my-8 relative"
          )}
        >
          {withDate && (
            <MyIcon
              name="options"
              className="absolute top-0 right-0 cursor-pointer"
            />
          )}
          {withDate && (
            <div
              className={cn(
                "flex flex-col items-center justify-center",
                isDateInPast(activity.reserva.timestamp) && "opacity-70"
              )}
            >
              {isDateInPast(activity.reserva.timestamp) ? (
                <MyIcon name="calendar-opacity" />
              ) : (
                <MyIcon name="calendar" />
              )}
              <MyTypography
                variant="body"
                weight="semibold"
                className={cn(
                  "text-primary-600",
                  isDateInPast(activity.reserva.timestamp) && "text-[#c0c0c0]"
                )}
              >
                {getData(activity.reserva.timestamp)}
              </MyTypography>
            </div>
          )}
          <div
            className={cn(
              "relative z-10 overflow-hidden w-[6.625rem] h-[6.625rem] hover:cursor-pointer rounded-md flex-shrink-0",
            )}
          >
            <Image
              alt="sample_file"
              src={activity.image ?? ""}
              width={250}
              height={300}
              className="w-[6.625rem] h-[6.625rem] object-cover"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1 mr-4">
              <MyBadge className="font-medium flex-shrink-0" variant="outline">
                {activity.tag}
              </MyBadge>
              {!withDate && <StarRating rating={activity.stars} />}
            </div>

            <MyTypography
              variant="subtitle3"
              weight="bold"
              className={cn(withDate && "mt-4")}
            >
              {activity.title}
            </MyTypography>
            <MyTypography variant="label" className="">
              {activity.description.slice(0, 40).concat("...")}
            </MyTypography>
          </div>
        </div>
      ))}
    </section>
  );
}
