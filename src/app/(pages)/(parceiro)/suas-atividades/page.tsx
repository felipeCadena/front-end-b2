"use client";
import { useEffect, useState } from "react";
import useSearchQueryService from "@/services/use-search-query-service";
import ModalAlert from "@/components/molecules/modal-alert";
import MyButton from "@/components/atoms/my-button";

export default function SuasAtividades() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {params} = useSearchQueryService()

  useEffect(() => {
    if (params.openModal === "true") {
      setIsModalOpen(true);
    }
  }, [params]);

  return (
    <div>
      <h1>Suas Atividades</h1>
      <ModalAlert
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua nova atividade já foi cadastrada e já pode ser visualizada pelos nossos clientes."
        button="Voltar ao início"
      />
    </div>
  );
}
