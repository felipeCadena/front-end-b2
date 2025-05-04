"use client";
import React from "react";
import ModalAlert from "@/components/molecules/modal-alert";
import MyButton from "@/components/atoms/my-button";
import SearchActivity from "@/components/organisms/search-activity";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import MyTypography from "@/components/atoms/my-typography";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import { newActivities } from "@/common/constants/mock";
import MyIcon from "@/components/atoms/my-icon";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { useQuery } from "@tanstack/react-query";
import { partnerService } from "@/services/api/partner";
import { Adventure, adventures } from "@/services/api/adventures";

export default function SuasAtividades() {
  const router = useRouter();
  const { handleClose, isModalOpen } = useAlert();
  const [selected, setSelected] = React.useState<"ar" | "terra" | "mar" | "">(
    ""
  );
  const [partnerAdventures, setPartnerAdventures] =
    React.useState<Adventure[]>();

  useQuery({
    queryKey: ["myAdventures", selected],
    queryFn: async () => {
      const activities = await partnerService.getMyAdventures({
        typeAdventure: selected ? selected : undefined,
        orderBy: "averageRating desc",
      });

      if (activities) {
        setPartnerAdventures(activities);
      }
      return activities;
    },
  });

  const { data: allAdventures } = useQuery({
    queryKey: ["adventuresPartners"],
    queryFn: () =>
      partnerService.getMyAdventures({ orderBy: "qntTotalSales desc" }),
  });

  return (
    <main className="max-w-screen-custom">
      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        onAction={handleClose}
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua nova atividade já foi cadastrada e já pode ser visualizada pelos nossos clientes."
        button="Voltar ao início"
      />
      <section className="px-4">
        <div className="md:hidden ">
          <SearchActivity setFormData={setPartnerAdventures} />
        </div>

        <div className="hidden md:flex items-center w-full gap-40">
          <SearchActivity
            setFormData={setPartnerAdventures}
            className="w-full"
          />
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
          <MyTypography
            variant="body-big"
            weight="regular"
            className="mb-4 md:mb-4"
          >
            Acompanhe suas atividades cadastradas
          </MyTypography>
          <ActivitiesFilter
            withText={false}
            setSelected={setSelected}
            selected={selected}
          />
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
            className="md:opacity-50 md:text-base"
          >
            Suas atividades mais bem avaliadas!
          </MyTypography>

          {partnerAdventures?.length == 0 ? (
            <div className="w-full h-[225px] flex flex-col justify-center items-center">
              <MyTypography variant="heading3">
                Nenhuma atividade encontrada. Faça uma nova busca!
              </MyTypography>
            </div>
          ) : (
            <CarouselCustom activities={partnerAdventures} type="parceiro" />
          )}

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
            className="md:opacity-50 md:text-base"
          >
            Suas atividades mais vendidas!
          </MyTypography>
          <CarouselCustom activities={allAdventures} type="parceiro" />
        </div>
      </section>
    </main>
  );
}
