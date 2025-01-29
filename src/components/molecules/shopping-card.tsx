"use client";

import React from "react";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";

export default function ShoppingCard({ items }: { items: string }) {
  const router = useRouter();

  return (
    <div 
    className="fixed bottom-8 right-8 z-20"
    onClick={() => router.push(PATHS.carrinho)}
    >
      <MyIcon name="shopping-card" className="relative" />
      <div className="h-[1.1rem] w-[1.1rem] bg-black rounded-full absolute top-1 right-3 text-center">
        <MyTypography
          variant="label"
          weight="bold"
          className="text-white text-center text-[0.75rem]"
        >
          {items}
        </MyTypography>
      </div>
    </div>
  );
}
