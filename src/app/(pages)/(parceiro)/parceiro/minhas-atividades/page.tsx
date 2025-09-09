"use client";
import React, { useEffect, useState } from "react";
import ModalAlert from "@/components/molecules/modal-alert";
import MyButton from "@/components/atoms/my-button";
import SearchActivity from "@/components/organisms/search-activity";
import ActivitiesFilter from "@/components/organisms/activities-filter";
import MyTypography from "@/components/atoms/my-typography";
import CarouselCustom from "@/components/templates/second-section/carousel-custom";
import MyIcon from "@/components/atoms/my-icon";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { useQuery } from "@tanstack/react-query";
import { partnerService } from "@/services/api/partner";
import { Adventure } from "@/services/api/adventures";
import { users } from "@/services/api/users";
import AddressModal from "@/components/molecules/address-modal";
import { toast } from "react-toastify";
import { getAddress } from "@/utils/getAddress";

export default function SuasAtividades() {
  const router = useRouter();
  const [modalAddress, setModalAddress] = useState(false);
  const { handleClose, isModalOpen } = useAlert();
  const [selected, setSelected] = React.useState<"ar" | "terra" | "mar" | "">(
    ""
  );
  const [partnerAdventures, setPartnerAdventures] =
    React.useState<Adventure[]>();

  const [partnerAddress, setPartnerAddress] = useState({
    address: "",
    addressPostalCode: "",
    addressNumber: "",
    addressNeighborhood: "",
    addressComplement: "",
    addressCity: "",
    addressState: "",
  });

  const { data: partner } = useQuery({
    queryKey: ["partner"],
    queryFn: () => partnerService.getPartnerLogged(),
  });

  useEffect(() => {
    if (partner?.addressPostalCode?.length === 0) {
      setModalAddress(true);
    }
  }, [partner]);

  function closeModalAddress() {
    setModalAddress(false);
  }

  const onBlurCep = async () => {
    if (!partnerAddress.addressPostalCode) return;
    const cep = partnerAddress.addressPostalCode.replace(/\D/g, "");
    if (cep?.length !== 8) return;

    const response = await getAddress(cep);

    if (response) {
      setPartnerAddress({
        addressPostalCode: partnerAddress.addressPostalCode,
        address: response.logradouro || "",
        addressNumber: response.numero || "",
        addressNeighborhood: response.bairro || "",
        addressComplement: partnerAddress.addressComplement || "",
        addressCity: response.localidade || "",
        addressState: response.uf || "",
      });
    } else {
      setPartnerAddress({
        addressPostalCode: partnerAddress.addressPostalCode,
        address: partnerAddress.address,
        addressNumber: partnerAddress.addressNumber,
        addressNeighborhood: partnerAddress.addressNeighborhood,
        addressComplement: partnerAddress.addressComplement,
        addressCity: partnerAddress.addressCity,
        addressState: partnerAddress.addressState,
      });
      toast.error("CEP não encontrado");
    }
  };

  const handleUpdatePartner = async () => {
    if (partnerAddress) {
      await partnerService.updatePartnerLogged(partnerAddress);
      toast.success("Endereço atualizado com sucesso!");
    } else {
      toast.error("Erro ao atualizar endereço, tente novamente.");
    }
    setModalAddress(false);
  };

  useQuery({
    queryKey: ["myAdventures", selected],
    queryFn: async () => {
      const activities = await partnerService.getMyAdventures({
        typeAdventure: selected ? selected : undefined,
        orderBy: "averageRating desc",
        limit: 100,
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
      partnerService.getMyAdventures({
        orderBy: "qntTotalSales desc",
        limit: 100,
      }),
  });

  return (
    <main className="max-w-screen-custom">
      {partner?.fantasyName && (
        <AddressModal
          open={modalAddress}
          onClose={closeModalAddress}
          onAction={handleUpdatePartner}
          onBlurCep={onBlurCep}
          partnerAddress={partnerAddress}
          setPartnerAddress={setPartnerAddress}
          iconName="warning"
          title={`Olá, ${partner?.fantasyName}`}
          descrition="Atualizamos nossa plataforma e, para continuar navegando, é necessário incluir seu endereço no cadastro. Adicione agora e siga aproveitando todos os benefícios da B2 Adventure."
          button="Voltar ao início"
        />
      )}

      <ModalAlert
        open={isModalOpen}
        onClose={handleClose}
        onAction={handleClose}
        iconName="success"
        title="Atividade cadastrada"
        descrition="Parabéns! Sua atividade foi cadastrada com sucesso e já pode ser visualizada pelos nossos clientes!"
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
