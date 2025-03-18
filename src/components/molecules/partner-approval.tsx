import React from "react";
import Image from "next/image";
import MyTypography from "@/components/atoms/my-typography";
import MyBadge from "@/components/atoms/my-badge";
import { cn } from "@/utils/cn";
import MyButton from "../atoms/my-button";

interface PartnerApprovalCardProps {
  name: string;
  activitiesCount: number;
  avatar: string;
  isNew?: boolean;
  onClick: () => void;
}

export default function PartnerApprovalCard({
  name,
  activitiesCount,
  avatar,
  isNew,
  onClick,
}: PartnerApprovalCardProps) {
  return (
    <div
      className="flex items-center justify-between bg-gray-50 py-3 px-6 rounded-lg cursor-pointer hover:bg-gray-100 relative"
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-3 rounded-l-md bg-primary-600"
        )}
      />
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image
            src={avatar}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div>
          <MyTypography variant="body-big" weight="semibold">
            {name}
          </MyTypography>
          <MyTypography variant="body-big" lightness={500}>
            {activitiesCount} Atividades
          </MyTypography>
        </div>
      </div>
      {isNew && (
        <MyButton borderRadius="squared" size="sm" className="text-sm p-2">
          Novo
        </MyButton>
      )}
    </div>
  );
}
