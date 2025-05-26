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
import PartnerRecentActivities from "@/components/organisms/partner-recent-activities";
import { adminService } from "@/services/api/admin";
import useChat from "@/store/useChat";
import {
  formatCNPJ,
  formatCPF,
  formatPhoneNumberDDI,
} from "@/utils/formatters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function Parceiro() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { setChat } = useChat();

  const { data: session } = useSession();

  const [loading, setLoading] = React.useState(false);
  const [parterData, setPartnerData] = React.useState<any>({
    logo: { url: "/user.png" },
    // companyName: "",
    // businessEmail: "",
    bankAccount: "",
    bankAccountDigit: "",
    businessPhone: "",
    bankAgency: "",
    bankName: "",
    cnpj: "",
    cpf: "",
    payday: "5",
    averageRating: 0,
    qntRatings: 0,
    pixKey: "",
    pixAddressKeyType: "",
  });

  const { data: fetchPartner } = useQuery({
    queryKey: ["fetchPartner"],
    queryFn: () => adminService.getPartnerById(id as string),
  });

  const { data: partnerSched = [] } = useQuery({
    queryKey: ["fetch_partner_schedule"],
    queryFn: () =>
      adminService.listPartnerSchedules(id as string, {
        startDate: new Date().toDateString(),
        limit: 2,
        orderBy: "datetime asc",
      }),
  });

  React.useEffect(() => {
    if (fetchPartner) {
      setPartnerData({
        payday: String(fetchPartner?.payday),
        bankAccount: fetchPartner?.bankAccount ?? "",
        bankAgency: fetchPartner?.bankAgency ?? "",
        bankName: fetchPartner?.bankName ?? "",
        businessPhone: fetchPartner?.businessPhone ?? "",
        cnpj: fetchPartner?.cnpj ?? "",
        cpf: fetchPartner?.cpf ?? "",
        fantasyName: fetchPartner?.fantasyName ?? "",
        businessEmail: fetchPartner?.businessEmail ?? "",
        pixKey: fetchPartner?.pixKey ?? "",
        pixAddressKeyType: fetchPartner?.pixAddressKeyType ?? "",
      });
    }
  }, [fetchPartner]);

  const handleUpdatePartner = async () => {
    setLoading(true);

    const data = {
      ...parterData,
      payday: Number(parterData.payday),
      companyName: fetchPartner?.fantasyName,
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

  const handleChat = async (userId: string) => {
    setLoading(true);
    try {
      const chat = await adminService.createChat({ userToId: userId });
      toast.success("Chat criado com sucesso!");
      setChat(chat);
      router.push(`/chat?id=${chat?.id}`);
    } catch (err) {
      console.error("Erro ao criar chat:", err);
      if (err instanceof AxiosError) {
        const message = err.response?.data?.error;
        toast.error(`${message}`);
      } else {
        toast.error("Erro ao criar chat");
      }
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
              {/* <div className="absolute top-0 right-1 w-8 h-8 bg-primary-400 rounded-full border-4 border-white" /> */}
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
                onClick={() => handleChat(fetchPartner?.userId)}
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
              <StarRating
                rating={Math.floor(fetchPartner?.averageRating) ?? 0}
              />
              <span className="font-bold">
                {fetchPartner?.averageRating?.toFixed(2)}
              </span>
              ({fetchPartner?.qntRatings} Avaliações)
            </div>
          </div>

          <div className="space-y-6 md:p-6 md:max-w-4xl md:mx-auto md:pt-10">
            <div>
              <MyTypography variant="subtitle1" weight="bold" className="">
                Atividades Recentes
              </MyTypography>

              {partnerSched && partnerSched?.length > 0 ? (
                <PartnerRecentActivities
                  hidden
                  recentActivities={partnerSched}
                  admin
                />
              ) : (
                <div className="h-[10vh] text-center mt-8">
                  <MyTypography
                    variant="label"
                    weight="regular"
                    className="mb-4"
                  >
                    Você ainda não tem atividades realizadas
                  </MyTypography>
                </div>
              )}
            </div>

            <div className="w-full my-6 flex flex-col gap-1">
              <MyTypography variant="subtitle1" weight="bold" className="mb-4">
                Dados cadastrais
              </MyTypography>

              <div className="grid gap-4">
                <div className="flex max-sm:flex-col gap-4 items-center">
                  <MyTextInput
                    type="email"
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    className="mt-2"
                    value={fetchPartner?.user?.email ?? ""}
                    disabled
                  />
                  <MyTextInput
                    label="Nome Completo"
                    placeholder="Nome Completo"
                    value={fetchPartner?.user?.name ?? ""}
                    className="mt-2"
                    disabled
                  />
                  <MyTextInput
                    label="Telefone"
                    placeholder="Telefone"
                    value={formatPhoneNumberDDI(
                      fetchPartner?.businessPhone ?? ""
                    )}
                    className="mt-2"
                    disabled
                  />
                </div>
                <div className="md:flex md:items-center md:gap-4">
                  <MyTextInput
                    type="empresa"
                    label="Nome Fantasia"
                    placeholder="Nome Fantasia"
                    noHintText
                    className="mt-2"
                    value={parterData?.fantasyName ?? ""}
                    onChange={(e) =>
                      setPartnerData({
                        ...parterData,
                        fantasyName: e.target.value,
                      })
                    }
                  />
                  <MyTextInput
                    label="CNPJ ou CPF"
                    placeholder="CNPJ ou CPF"
                    noHintText
                    value={
                      parterData?.cnpj
                        ? formatCNPJ(parterData?.cnpj)
                        : formatCPF(parterData?.cpf)
                    }
                    className="mt-2"
                    onChange={(e) =>
                      parterData?.cnpj
                        ? setPartnerData({
                            ...parterData,
                            cnpj: formatCNPJ(e.target.value),
                          })
                        : setPartnerData({
                            ...parterData,
                            cpf: formatCPF(e.target.value),
                          })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <MyTypography
                variant="subtitle3"
                weight="semibold"
                className="mb-3"
              >
                Dados para pagamento
              </MyTypography>
              {!parterData?.pixKey ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="flex max-sm:flex-col gap-2 md:gap-4">
                    <MySelect
                      value={parterData?.pixAddressKeyType ?? ""}
                      onValueChange={(value) =>
                        setPartnerData({
                          ...parterData,
                          pixAddressKeyType: value,
                        })
                      }
                      label="Tipo de chave"
                    >
                      <SelectTrigger className="py-6 mt-1 md:mb-4">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value="EVP">Código aleatório</SelectItem>
                        <SelectItem value="CNPJ">CNPJ</SelectItem>
                        <SelectItem value="CPF">CPF</SelectItem>
                        <SelectItem value="EMAIL">E-mail</SelectItem>
                        <SelectItem value="PHONE">Telefone</SelectItem>
                      </SelectContent>
                    </MySelect>

                    <MyTextInput
                      label="Chave PIX"
                      placeholder="001"
                      className="mt-2"
                      value={parterData?.pixKey ?? ""}
                      onChange={(e) =>
                        setPartnerData({
                          ...parterData,
                          pixKey: e.target.value,
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
                </>
              )}
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
