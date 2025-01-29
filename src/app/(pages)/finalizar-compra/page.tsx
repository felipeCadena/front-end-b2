"use client"

import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { useRouter } from "next/navigation";
import React from "react";

export default function FinalizarCompra() {
  const router = useRouter();

  return (
    <section className="mx-4">
      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className=""
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="">
          Pagamento de atividades
        </MyTypography>
      </div>
    </section>
  );
}
