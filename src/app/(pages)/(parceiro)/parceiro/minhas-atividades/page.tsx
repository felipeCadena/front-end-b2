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

export default function SuasAtividades() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { params, clear } = useSearchQueryService();

  useEffect(() => {
    if (params.openModal === "true") {
      setIsModalOpen(true);
    }
  }, [params]);

  const handleClose = () => {
    setIsModalOpen(false);
    clear()
  }

  return (
    <main>
      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua nova atividade já foi cadastrada e já pode ser visualizada pelos nossos clientes."
        button="Voltar ao início"
      />
      <section className="px-4">
        <SearchActivity />

        <div className="mt-6">
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
            Nossas atividades mais bem avaliadas!
          </MyTypography>
          <CarouselCustom activities={activities} />

          <div className="border-2 border-gray-200 w-1/2 mx-auto rounded-md mb-6 md:hidden" />

          <MyTypography
            variant="heading2"
            weight="semibold"
            className="mb-4 md:text-lg"
          >
            Lorem Ipsum Dolor
          </MyTypography>
          <MyTypography
            variant="subtitle3"
            weight="regular"
            className="md:opacity-50"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos dolore eum aliquid facere quis.
          </MyTypography>
          <CarouselCustom activities={activities} />
        </div>
      </section>
    </main>
  );
}
