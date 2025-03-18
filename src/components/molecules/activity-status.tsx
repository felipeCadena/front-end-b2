import React from "react";
import Image from "next/image";
import MyTypography from "@/components/atoms/my-typography";
import MyBadge from "@/components/atoms/my-badge";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import { cn } from "@/utils/cn";
import Check from "../atoms/my-icon/elements/check";

interface ActivityStatusCardProps {
  type: "new" | "pending";
  activity: {
    title: string;
    description: string;
    image: string;
    category: string;
  };
  user: {
    name: string;
    avatar: string;
    timestamp: string;
    status?: string;
  };
  partner?: {
    name: string;
    avatar: string;
    status: string;
  };
  onApprove?: () => void;
  onReject?: () => void;
  onNotify?: () => void;
}

export default function ActivityStatusCard({
  type,
  activity,
  user,
  partner,
  onApprove,
  onReject,
  onNotify,
}: ActivityStatusCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <MyTypography variant="subtitle3" weight="bold" className="mb-4">
        {type === "new"
          ? "Nova atividade cadastrada"
          : "Atividade pendente de confirmação"}
      </MyTypography>
      {/* Usuário */}
      <div className="flex items-center gap-3 my-4">
        <Image
          src={user.avatar}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <MyTypography variant="body-big" weight="semibold">
            {user.name}
          </MyTypography>
          <MyTypography variant="button" lightness={400}>
            {user.timestamp}
          </MyTypography>
        </div>
      </div>

      {/* Parceiro (se existir) */}
      {partner && (
        <div className="flex items-center gap-3 my-4">
          <Image
            src={partner.avatar}
            alt={partner.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <MyTypography variant="body-big" weight="semibold">
              Parceiro: {partner.name}
            </MyTypography>
            <MyTypography variant="button" lightness={400}>
              {partner.status}
            </MyTypography>
          </div>
        </div>
      )}

      <div className="flex gap-2 my-6">
        {/* Atividade */}
        <div className="relative w-[210px] h-[110px] rounded-lg overflow-hidden mb-3">
          <Image
            alt="imagem atividade"
            src={activity.image ?? ""}
            width={250}
            height={300}
            className={cn("object-cover w-full h-full")}
          />
        </div>

        <div className="">
          <MyBadge variant="outline" className="mb-2 p-1">
            {activity.category}
          </MyBadge>

          <MyTypography variant="subtitle3" weight="bold" className="mt-1">
            {activity.title}
          </MyTypography>

          <MyTypography variant="body-big" className="text-gray-600 mt-1">
            {activity.description.slice(0, 40)}...
          </MyTypography>
        </div>
      </div>

      {/* Ações */}
      {type === "new" ? (
        <div className="grid grid-cols-2 gap-2">
          <MyButton
            variant="default"
            className="w-full bg-[#97E16933]"
            borderRadius="squared"
            size="lg"
            onClick={onApprove}
          >
            <Check className="w-6 h-6" stroke="#97E169" strokeWidth="1" />
          </MyButton>
          <MyButton
            variant="red"
            className="w-full"
            onClick={onReject}
            borderRadius="squared"
            size="lg"
          >
            <MyIcon name="x-red" />
          </MyButton>
        </div>
      ) : (
        <MyButton
          variant="default"
          className="w-full bg-blue-50 text-blue-500"
          borderRadius="squared"
          size="lg"
          onClick={onNotify}
        >
          <MyIcon name="bell" />
        </MyButton>
      )}
    </div>
  );
}
