"use client";

import { recentActivities } from "@/common/constants/mock";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTextInput from "@/components/atoms/my-text-input";
import MyTypography from "@/components/atoms/my-typography";
import StarRating from "@/components/molecules/my-stars";
import ActivitiesHidden from "@/components/organisms/activities-hidden";
import { adminService } from "@/services/api/admin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function Parceiro() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const [loading, setLoading] = React.useState(false);
  const [parterData, setPartnerData] = React.useState<any>({
    logo: { url: "/user.png" },
    // companyName: "",
    // businessEmail: "",
    bankAccount: "",
    bankAgency: "",
    bankName: "",
    cnpj: "",
    payday: "5",
    averageRating: 0,
    qntRatings: 0,
  });

  const { data: fetchPartner } = useQuery({
    queryKey: ["fetchPartner"],
    queryFn: () => adminService.getPartnerById(id as string),
  });

  console.log(session);

  React.useEffect(() => {
    if (fetchPartner) {
      setPartnerData({
        payday: String(fetchPartner?.payday),
        bankAccount: fetchPartner?.bankAccount ?? "",
        bankAgency: fetchPartner?.bankAgency ?? "",
        bankName: fetchPartner?.bankName ?? "",
        cnpj: fetchPartner?.cnpj ?? "",
        companyName: fetchPartner?.companyName ?? "",
        businessEmail: fetchPartner?.businessEmail ?? "",
      });
    }
  }, [fetchPartner]);

  const handleUpdatePartner = async () => {
    setLoading(true);

    const data = {
      ...parterData,
      payday: Number(parterData.payday),
    };
    try {
      await adminService.updatePartner(id as string, data);
      queryClient.invalidateQueries({ queryKey: ["fetchPartner"] });
      toast.success("Parceiro atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar parceiro:", error);
      toast.error("Erro ao atualizar parceiro");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePartner = async () => {
    setLoading(true);
    try {
      await adminService.deletePartner(id as string);
      queryClient.invalidateQueries({ queryKey: ["fetchPartner"] });
      toast.success("Parceiro excluído com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao excluir parceiro:", error);
      toast.error("Erro ao excluir parceiro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-6 px-4 mb-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer -ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Parceiro Cadastrado
        </MyTypography>
      </div>

      <div className="space-y-6 md:bg-gray-100 md:border md:rounded-2xl relative">
        <div className="relative">
          <Image
            alt="foto de capa"
            src="/images/atividades/ar/ar-4.jpeg"
            width={375}
            height={150}
            className="w-full h-[300px] object-cover object-bottom rounded-t-2xl max-sm:hidden"
          />

          <div className="absolute max-sm:hidden -bottom-14 left-16">
            <Image
              alt="avatar"
              src={fetchPartner?.logo?.url ?? "/user.png"}
              width={28}
              height={28}
              className="w-28 h-28 rounded-full object-fit relative border-4 border-white"
            />
            {/* <div className="absolute -top-1 -right-1 w-10 h-10 bg-primary-400 rounded-full border-4 border-white" /> */}
          </div>
        </div>

        <div className="space-y-6 md:px-6 md:py-12 md:max-w-4xl md:mx-auto md:">
          <div className="flex flex-col max-sm:items-center gap-2 max-sm:text-center">
            <div className="md:hidden relative">
              <Image
                alt="avatar"
                src={fetchPartner?.logo?.url ?? "/user.png"}
                width={28}
                height={28}
                className="w-28 h-28 rounded-full object-fit border-4 border-white"
              />
              <div className="absolute top-0 right-1 w-8 h-8 bg-primary-400 rounded-full border-4 border-white" />
            </div>

            <div className="relative">
              <MyTypography variant="label" weight="semibold">
                {fetchPartner?.companyName}
              </MyTypography>
              <MyIcon
                name="chat-web"
                className="cursor-pointer md:hidden absolute top-0 -right-10"
              />

              <MyButton
                variant="partner"
                size="lg"
                borderRadius="squared"
                className="max-sm:hidden absolute top-0 right-0"
                leftIcon={<MyIcon name="chat-web" className="" />}
              >
                Falar com parceiro
              </MyButton>

              <MyTypography
                variant="label"
                weight="regular"
                lightness={400}
                className="mt-2"
              >
                {fetchPartner?._count?.adventures ?? "0"} Atividades
              </MyTypography>
            </div>

            <div className="flex gap-2 items-center">
              <StarRating rating={fetchPartner?.averageRating ?? 0} />
              <span className="font-bold">{fetchPartner?.averageRating}</span>(
              {fetchPartner?.qntRatings} Avaliações)
            </div>
          </div>

          <div className="space-y-6 md:p-6 md:max-w-4xl md:mx-auto md:pt-24">
            <div>
              <MyTypography variant="subtitle1" weight="bold" className="">
                Atividades Recentes
              </MyTypography>

              <ActivitiesHidden notifications={recentActivities} admin />
            </div>

            <div className="w-full my-6 flex flex-col gap-1">
              <MyTypography variant="subtitle1" weight="bold" className="mb-4">
                Dados cadastrais
              </MyTypography>

              <div className="md:grid md:grid-cols-2 md:gap-4">
                <MyTextInput
                  type="email"
                  label="E-mail"
                  placeholder="b2adventure@gmail.com"
                  className="mt-2"
                  value={parterData?.businessEmail ?? ""}
                  disabled
                />
                <MyTextInput
                  label="Nome Completo"
                  placeholder="Nome Completo"
                  value={parterData?.companyName ?? ""}
                  className="mt-2"
                  onChange={(e) =>
                    setPartnerData({
                      ...parterData,
                      companyName: e.target.value,
                    })
                  }
                />

                <MyTextInput
                  type="empresa"
                  label="Nome da empresa/pessoa"
                  placeholder="Nome completo"
                  className="mt-2"
                  value={parterData?.companyName ?? ""}
                  onChange={(e) =>
                    setPartnerData({
                      ...parterData,
                      companyName: e.target.value,
                    })
                  }
                />
                <MyTextInput
                  label="CNPJ ou CPF"
                  placeholder="CNPJ ou CPF"
                  value={parterData?.cnpj ?? ""}
                  className="mt-2"
                  onChange={(e) =>
                    setPartnerData({ ...parterData, cnpj: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <MyTypography
                variant="subtitle3"
                weight="semibold"
                className="mb-3"
              >
                Dados Bancários
              </MyTypography>
              <MyTextInput
                label="Número da conta"
                placeholder="0987-6"
                className="mt-2"
                value={parterData?.bankAccount ?? ""}
                onChange={(e) =>
                  setPartnerData({
                    ...parterData,
                    bankAccount: e.target.value,
                  })
                }
              />

              <div className="flex gap-4">
                <MyTextInput
                  label="Agência"
                  placeholder="Digite sua agência"
                  className="mt-2"
                  value={parterData?.bankAgency ?? ""}
                  onChange={(e) =>
                    setPartnerData({
                      ...parterData,
                      bankAgency: e.target.value,
                    })
                  }
                />

                <MyTextInput
                  label="Banco"
                  placeholder="001"
                  className="mt-2"
                  value={parterData?.bankName ?? ""}
                  onChange={(e) =>
                    setPartnerData({
                      ...parterData,
                      bankName: e.target.value,
                    })
                  }
                />
              </div>

              <MySelect
                value={String(parterData?.payday) ?? ""}
                onValueChange={(value) =>
                  setPartnerData({ ...parterData, payday: value })
                }
                label="Data de Pagamento"
              >
                <SelectTrigger className="py-6 mt-1 mb-4">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="5">Todo dia 05</SelectItem>
                  <SelectItem value="10">Todo dia 10</SelectItem>
                  <SelectItem value="15">Todo dia 15</SelectItem>
                </SelectContent>
              </MySelect>
            </div>

            <div className="flex max-sm:flex-col justify-center gap-4">
              <MyButton
                variant="default"
                borderRadius="squared"
                size="lg"
                className="w-full"
                onClick={handleUpdatePartner}
                isLoading={loading}
              >
                Atualizar
              </MyButton>
              {/* {partner?.isNew && (
                <MyButton
                  variant="partner"
                  className="w-full"
                  borderRadius="squared"
                  size="lg"
                >
                  Aprovar
                </MyButton>
              )} */}
              {session && session?.user?.role == "superadmin" && (
                <MyButton
                  variant="red"
                  borderRadius="squared"
                  size="lg"
                  className="w-full"
                  leftIcon={<MyIcon name="trash" className="" />}
                  onClick={handleDeletePartner}
                  isLoading={loading}
                >
                  Excluir
                </MyButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
