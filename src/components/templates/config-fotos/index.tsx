"use client";

import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import SendImages from "@/components/organisms/send-images";
import ChevronDown from "@/components/atoms/my-icon/elements/down";

export default function ConfigFotos() {
  return (
    <section className="my-4 space-y-12">
      <div>
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold">
            Editar fotos de capa da Landing Page
          </MyTypography>
        </div>

        {/* <SendImages config /> */}
      </div>

      <div>
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Editar fotos da área dos Parceiros
          </MyTypography>
        </div>

        {/* <SendImages config /> */}
      </div>
    </section>
  );
}
