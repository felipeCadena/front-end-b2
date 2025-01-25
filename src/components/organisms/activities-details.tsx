"use client";

import Image from "next/image";
import React from "react";
import MyIcon from "../atoms/my-icon";
import MyBadge from "../atoms/my-badge";
import StarRating from "../molecules/my-stars";
import MyTypography from "../atoms/my-typography";

export default function ActivitiesDetails({ activities }: any) {
  return (
    <section className="">
      {activities.map((activity: any, index: number) => (
        <div
          key={index}
          className="flex justify-around gap-2 cursor-pointer my-4"
        >
          <div className="relative z-10 overflow-hidden w-[6.625rem] h-[6.625rem] hover:cursor-pointer rounded-md">
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
              <StarRating rating={activity.stars} />
            </div>

            <MyTypography variant="subtitle3" weight="bold" className="">
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
