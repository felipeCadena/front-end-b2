import React from "react";
import Image from "next/image";
import MyTypography from "@/components/atoms/my-typography";
import MyBadge from "@/components/atoms/my-badge";
import { cn } from "@/utils/cn";
import MyButton from "../atoms/my-button";
import StarRating from "./my-stars";
import Check from "../atoms/my-icon/elements/check";
import MyIcon from "../atoms/my-icon";
import XRed from "../atoms/my-icon/elements/x-red";

interface PartnerApprovalCardProps {
  name: string;
  activitiesCount: number;
  avatar: string;
  isNew?: boolean;
  withButton?: boolean;
  rating?: number;
  onClick: () => void;
}

export default function PartnerApprovalCard({
  name,
  activitiesCount,
  avatar,
  isNew,
  withButton,
  rating,
  onClick,
}: PartnerApprovalCardProps) {
  return (
    <section className="flex gap-4">
      <div
        className="w-full flex items-center justify-between bg-gray-50 py-3 px-3 rounded-lg cursor-pointer hover:bg-gray-100 relative"
        onClick={onClick}
      >
        {isNew && (
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-2 rounded-l-md bg-primary-600"
            )}
          />
        )}
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={avatar}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>

          <div className="flex-1 min-w-0">
            <MyTypography
              variant="body-big"
              weight="semibold"
              className="whitespace-nowrap"
            >
              {name}
            </MyTypography>
            <MyTypography variant="body-big" lightness={500}>
              {activitiesCount} Atividades
            </MyTypography>
          </div>

          {rating && rating > 0 && (
            <div className="flex-shrink-0">
              <StarRating rating={rating} />
            </div>
          )}
        </div>

        {isNew && (
          <MyButton borderRadius="squared" size="sm" className="text-sm p-2">
            Novo
          </MyButton>
        )}
      </div>

      {withButton && (
        <>
          <MyButton
            variant="default"
            className="bg-[#97E16933] max-sm:hidden px-8 py-10"
            borderRadius="squared"
            size="lg"
          >
            <Check className="w-7 h-7" stroke="#97E169" strokeWidth="1" />
          </MyButton>
          <MyButton
            variant="red"
            className="max-sm:hidden px-8 py-10"
            borderRadius="squared"
            size="lg"
          >
            <XRed width="30" height="30" />
          </MyButton>
        </>
      )}
    </section>
  );
}
