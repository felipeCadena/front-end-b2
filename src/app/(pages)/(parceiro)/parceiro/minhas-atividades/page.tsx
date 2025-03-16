"use client";
import { useEffect, useState } from "react";
import useSearchQueryService from "@/services/use-search-query-service";
import ModalAlert from "@/components/molecules/modal-alert";
import MyButton from "@/components/atoms/my-button";
import AtividadesTemplate from "@/components/templates/atividades";
import SearchActivity from "@/components/organisms/search-activity";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import MyTypography from "@/components/atoms/my-typography";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import { activities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";

export default function SuasAtividades() {
  const router = useRouter();
  const { handleClose, isModalOpen } = useAlert();

  return (
    <main className="max-w-screen-custom">
      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua nova atividade já foi cadastrada e já pode ser visualizada pelos nossos clientes."
        button="Voltar ao início"
      />
      <section className="px-4">
        <div className="md:hidden ">
          <SearchActivity />
        </div>

        <div className="hidden md:flex items-center w-full gap-40">
          <SearchActivity className="w-full" />
          <MyButton
            variant="default"
            borderRadius="squared"
            className="p-[1.6rem] mt-2"
            onClick={() => router.push(PATHS["cadastro-atividade"])}
            leftIcon={<MyIcon name="plus" className="" />}
          >
            Cadastrar nova atividade
          </MyButton>
        </div>

        <div className="mt-12">
          <MyTypography variant="heading2" weight="semibold">
            Veja suas atividades
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="-mb-4">
            Acompanhe suas atividades cadastradas
          </MyTypography>
          <ActivitiesFilter withText={false} />
        </div>

        <div className="my-8 md:my-16">
          <MyTypography
            variant="heading3"
            weight="semibold"
            className="mb-1 md:text-lg"
          >
            Favoritos dos nossos clientes
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="md:opacity-50"
          >
            Suas atividades mais bem avaliadas!
          </MyTypography>
          <CarouselCustom activities={activities} type="parceiro" />

          <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

          <MyTypography
            variant="heading2"
            weight="semibold"
            className="mb-4 md:text-lg"
          >
            Mais vendidas!
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="md:opacity-50"
          >
            Suas atividades mais vendidas!
          </MyTypography>
          <CarouselCustom activities={activities} type="parceiro" />
        </div>
      </section>
    </main>
  );
}
