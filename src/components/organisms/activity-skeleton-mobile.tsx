// components/organisms/activities-skeleton.tsx
"use client";

import React from "react";
import { cn } from "@/utils/cn";

export const ActivityCardSkeletonMobile = ({
  withDate = false,
}: {
  withDate?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex max-sm:max-h-[120px] max-sm:justify-around gap-2 my-2 animate-pulse",
        withDate && "my-8 relative"
      )}
    >
      {withDate && (
        <div className="absolute top-0 right-0 w-5 h-5 bg-gray-200 rounded-full" />
      )}
      {withDate && (
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <div className="w-12 h-3 bg-gray-200 rounded" />
        </div>
      )}
      <div
        className={cn(
          "rounded-md bg-gray-200 flex-shrink-0",
          withDate ? "w-[7.5rem] h-[7.5rem]" : "w-[6.625rem] h-[6.625rem]"
        )}
      />
      <div className="flex flex-col justify-between w-full">
        <div className="flex gap-1 justify-between mb-1 mr-4">
          <div className="w-16 h-5 bg-gray-200 rounded" />
          {!withDate && <div className="w-16 h-4 bg-gray-200 rounded" />}
        </div>
        <div className={cn(withDate ? "mt-4" : "mt-2")}>
          <div className="w-2/3 h-5 bg-gray-200 rounded mb-1" />
        </div>
        <div
          className={cn(
            "h-4 bg-gray-200 rounded",
            withDate ? "w-1/2" : "w-2/3"
          )}
        />
        {withDate && (
          <div className="flex items-center gap-1 mt-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
            <div className="w-20 h-3 bg-gray-200 rounded" />
          </div>
        )}
      </div>
    </div>
  );
};
