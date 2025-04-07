"use client";

import MyIcon from "../atoms/my-icon";
import { Skeleton } from "../atoms/my-skeleton";

export function ActivityCardSkeleton() {
  return (
    <div className="mb-6 w-[20%] md:min-w-[30%] lg:min-w-[25%] flex flex-col gap-1 animate-pulse">
      {/* Imagem */}
      <div className="relative z-10 h-[225px] w-full md:w-[250px] bg-gray-400 rounded-md" />

      {/* Badge e Rating */}
      <div className="mt-1 flex gap-2 items-center">
        <div className="h-6 w-24 bg-gray-400 rounded" />
        <div className="h-4 w-20 bg-gray-400 rounded" />
      </div>

      {/* Foto e Nome do Parceiro */}
      <div className="flex gap-2 items-center mt-1">
        <div className="h-10 w-10 bg-gray-400 rounded-full" />
        <div className="h-4 w-32 bg-gray-400 rounded" />
      </div>

      {/* Título */}
      <div className="h-6 w-3/4 bg-gray-400 rounded mt-1" />

      {/* Descrição */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-400 rounded" />
        <div className="h-4 w-3/4 bg-gray-400 rounded" />
      </div>
    </div>
  );
}
