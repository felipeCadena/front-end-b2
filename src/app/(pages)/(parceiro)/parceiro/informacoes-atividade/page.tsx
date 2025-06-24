"use client";

import InformacoesAtividade from "@/components/templates/informacoes-atividade";
import { useRouter } from "next/navigation";
import React from "react";

export default function InformacoesAtividadePage() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return <InformacoesAtividade step onBack={handleBack} create />;
}
