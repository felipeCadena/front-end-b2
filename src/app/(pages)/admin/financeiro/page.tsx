"use client";

import React from "react";
import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import MyTypography from "@/components/atoms/my-typography";
import { CardContent, MyCard } from "@/components/molecules/my-card";
import PartnerPaymentCard from "@/components/molecules/partner-payment";
import Lancamentos from "@/components/templates/lancamentos";
import { adminService } from "@/services/api/admin";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  XAxis,
  Tooltip,
  Line,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type PartnerPayment = {
  partnerFantasyName: string;
  partnerLogo: string;
  total_value_pending: number;
  token_for_pay: string;
  total_value_paid?: number;
  ordersSchedules?: string;
};

type MonthlyReport = {
  countTotal: number;
  sumTotalOrdersValue: number;
  sumTotalAdventuresValue: number;
  sumTotalPartnersValue: number;
  sumTotalB2Value: number;
  sumTotalTaxes: number;
  sumTotalGatewayTaxes: number;
  marTotal: number;
  marPercent: number;
  arTotal: number;
  arPercent: number;
  terraTotal: number;
  terraPercent: number;
};

type MonthlyReports = {
  [month: string]: MonthlyReport;
};

const monthLabels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

// Mapeamento de meses abreviados para completos
const monthFullNames: Record<string, string> = {
  Jan: "Janeiro",
  Fev: "Fevereiro",
  Mar: "Março",
  Abr: "Abril",
  Mai: "Maio",
  Jun: "Junho",
  Jul: "Julho",
  Ago: "Agosto",
  Set: "Setembro",
  Out: "Outubro",
  Nov: "Novembro",
  Dez: "Dezembro",
};

// Tipando a função getFullMonthName
function getFullMonthName(monthAbbreviation: string): string {
  return monthFullNames[monthAbbreviation] || monthAbbreviation;
}

const renderTooltip = (props: any) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    // Pega os dados de cada item
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip text-center p-2 bg-white border border-gray-300 rounded">
        <p>
          <strong>{getFullMonthName(label)}</strong>
        </p>
        <div className="text-left">
          {data.Total > 0 && (
            <p>
              <strong>Total: </strong>
              R$ {data.Total ?? 0}
            </p>
          )}
          {data.arTotal > 0 && (
            <p>
              <strong>Ar: </strong>
              R$ {data.arTotal ?? 0}
            </p>
          )}
          {data.terraTotal > 0 && (
            <p>
              <strong>Terra: </strong>
              R$ {data.terraTotal ?? 0}
            </p>
          )}
          {data.marTotal > 0 && (
            <p>
              <strong>Mar: </strong>
              R$ {data.marTotal}
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = (innerRadius + outerRadius) / 2; // Ajuste fino da posição
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + (radius + 3) * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle" // Centraliza horizontalmente
      dominantBaseline="middle" // Centraliza verticalmente
      fontSize={12} // Ajusta o tamanho da fonte
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface IncomeItem {
  countTotal: number;
  sumTotal: number;
  marTotal: number;
  marPercent: number;
  arTotal: number;
  arPercent: number;
  terraTotal: number;
  terraPercent: number;
}

type IncomeTypeYear = {
  [key: string]: IncomeItem;
};

export default function Dashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentMonthKey = format(new Date(), "MM");

  const [filters, setFilters] = React.useState({
    report: "",
    year: "2025",
    month: currentMonthKey,
    typeDate: "", // month or year
  });
  const [typeGroup, setTypeGroup] = React.useState("month");
  const [typeGroupYear, setTypeGroupYear] = React.useState("month");

  const [loading, setLoading] = React.useState(false);

  const now = new Date();

  const startsAt = format(startOfMonth(now), "yyyy-MM-dd'T'00:00:00");
  const endsAt = format(endOfMonth(now), "yyyy-MM-dd'T'00:00:00");

  const startOfCurrentYear = format(startOfYear(now), "yyyy-MM-dd'T'00:00:00");

  const endOfCurrentYear = format(endOfYear(now), "yyyy-MM-dd'T'23:59:59");

  const { data: pending, isLoading } = useQuery({
    queryKey: ["pendingPayments"],
    queryFn: () =>
      adminService.listPendingPaidPartners({
        startsAt,
        endsAt,
        limit: 12,
      }),
  });

  const { data: adminIncome } = useQuery({
    queryKey: ["adminIncome"],
    queryFn: () =>
      adminService.getB2Income({
        startsAt,
        endsAt,
      }),
  });

  const handleFilterYear = (value: string) => {
    setTypeGroupYear(value);
  };

  const { data: adminIncomeYear } = useQuery({
    queryKey: ["adminIncomeYear", typeGroupYear],
    queryFn: () =>
      adminService.getB2Income({
        startsAt: startOfCurrentYear,
        endsAt: endOfCurrentYear,
        typeGroup: typeGroupYear,
      }),
  });

  const type =
    typeGroup === "month"
      ? `${filters.year}-${filters.month}`
      : `week-1-${filters.year}-${filters.month}`;

  const incomeData = adminIncome?.[type];

  const handleFilter = (value: string) => {
    setTypeGroup(value);
  };

  async function payPartner(token: string) {
    if (!token) {
      toast.error("Token inválido ou inexistente.");
      return;
    }

    setLoading(true);
    try {
      await adminService.payPartner(token);
      queryClient.invalidateQueries({ queryKey: ["pendingPayments"] });
      toast.success("Pagamento realizado com sucesso!");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message || "Erro ao realizar pagamento.";
        toast.error(
          `${typeof message === "string" && message !== null ? `Erro: ${message}` : "Erro desconhecido ao realizar pagamento."}`
        );
      } else {
        toast.error("Erro desconhecido ao realizar pagamento.");
      }
    } finally {
      setLoading(false);
    }
  }

  function hasTotalValuePaid(partner: Record<string, any>): boolean {
    return "total_value_paid" in partner;
  }

  const pendingPartners: PartnerPayment[] = pending?.partners
    ? Object.values(pending.partners)
    : [];

  const activities = [
    {
      id: 1,
      name: "Atividades Aquáticas",
      icon: "mar",
      color: "#00C6FB",
      progress: incomeData?.marPercent ?? 0,
    },
    {
      id: 2,
      name: "Atividades na Terra",
      icon: "terra",
      color: "#FFA500",
      progress: incomeData?.terraPercent ?? 0,
    },
    {
      id: 3,
      name: "Atividades no Ar",
      icon: "ar",
      color: "#FF66B2",
      progress: incomeData?.arPercent ?? 0,
    },
  ];

  const pieData = [
    {
      name: "Atividades Aquáticas",
      value: incomeData?.marTotal ?? 0,
      color: "#00C6FB",
    },
    {
      name: "Atividades no Ar",
      value: incomeData?.arTotal ?? 0,
      color: "#FF66B2",
    },
    {
      name: "Atividades na Terra",
      value: incomeData?.terraTotal ?? 0,
      color: "#FFA500",
    },
  ];

  const filteredPieData = pieData.filter(
    (item) => item?.value && item?.value > 0
  );

  const barData = [
    { name: "Jan", atual: 2400, anterior: 1800 },
    { name: "Fev", atual: 1398, anterior: 1000 },
    { name: "Mar", atual: 1800, anterior: 2200 },
    { name: "Abr", atual: 1500, anterior: 2400 },
    { name: "Mai", atual: 2200, anterior: 1800 },
    { name: "Jun", atual: 2800, anterior: 2000 },
    { name: "Jul", atual: 1600, anterior: 2400 },
  ];

  const lineData = [
    { name: "Jan", before: 50, value: 80 },
    { name: "Fev", before: 70, value: 100 },
    { name: "Mar", before: 90, value: 150 },
    { name: "Abr", before: 150, value: 300 },
    { name: "Mai", before: 300, value: 600 },
    { name: "Jun", before: 350, value: 400 },
    { name: "Jul", before: 400, value: 500 },
  ];

  function formatChartData(data: IncomeTypeYear | undefined, type: string) {
    if (!data) return [];

    if (type === "week") {
      const weekEntries = Object.entries(data)
        .filter(([key]) => key.startsWith("week-"))
        .sort(([a], [b]) => a.localeCompare(b)); // ordena pela chave (semana)

      const chartData = weekEntries.map(([key, value], index) => ({
        name: `Semana ${index + 1}`, // Use o weekLabels ou um fallback
        Total: value?.sumTotal ?? 0, // Valor total da semana
        arTotal: value?.arTotal ?? 0, // Valor AR
        terraTotal: value?.terraTotal ?? 0, // Valor Terra
        marTotal: value?.marTotal ?? 0, // Valor Mar
        countTotal: value?.countTotal ?? 0, // Contagem total
      }));

      return [{ name: "", Total: 0 }, ...chartData];
    }

    // Padrão: mensal
    return Array.from({ length: 6 }, (_, index) => {
      const month = String(index + 1).padStart(2, "0");
      const key = `2025-${month}`;
      const value = data[key];

      return {
        name: monthLabels[index],
        Total: value?.sumTotal ?? 0,
        arTotal: value?.arTotal ?? 0,
        terraTotal: value?.terraTotal ?? 0,
        marTotal: value?.marTotal ?? 0,
        countTotal: value?.countTotal ?? 0,
      };
    });
  }

  const getMiddleMonthLabel = (data: { name: string; Total: number }[]) => {
    const monthsWithValue = data.filter((d) => d.Total > 0);
    if (!monthsWithValue.length) return null;

    const middleIndex = Math.floor(monthsWithValue.length / 2);
    return monthsWithValue[middleIndex]?.name ?? null;
  };

  const getMiddleLabel = (data: { name: string; Total: number }[]) => {
    const withValue = data.filter((d) => d.Total > 0);
    if (!withValue.length) return null;

    const middleIndex = Math.floor(withValue.length / 2);
    return withValue[middleIndex]?.name ?? null;
  };

  return (
    <main className="max-sm:mx-4 my-6 space-y-8">
      <div className="flex items-center gap-3 bg-white">
        <MyIcon
          name="voltar-black"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle2" weight="bold">
          Fluxo de Caixa e Financeiro
        </MyTypography>
      </div>

      <div>
        <div className="flex justify-between gap-12 items-center mb-4">
          <MyTypography
            variant="subtitle3"
            weight="bold"
            className="text-nowrap"
          >
            Pagamentos de Parceiros
          </MyTypography>
        </div>

        <div className="space-y-3">
          {pending?.total_orders == 0 && !isLoading ? (
            <div className="flex items-center justify-center h-[250px]">
              <MyTypography variant="subtitle4" weight="bold">
                Não há pagamentos pendentes.
              </MyTypography>
            </div>
          ) : (
            pendingPartners &&
            pendingPartners.map((payment: any) => (
              <PartnerPaymentCard
                key={payment?.ordersSchedules}
                name={payment?.partnerFantasyName}
                amount={payment?.total_value_pending}
                avatar={payment?.partnerLogo}
                status={hasTotalValuePaid(payment) ? "paid" : "pending"}
                loading={loading}
                onPay={() => payPartner(payment?.token_for_pay)}
              />
            ))
          )}
        </div>
        <MyButton
          variant="default"
          className="w-full mt-6"
          size="lg"
          borderRadius="squared"
          onClick={() => router.push(PATHS["pagamento-parceiros"])}
        >
          Pagamentos do mês
        </MyButton>
      </div>

      <div className="max-sm:space-y-6 md:grid md:grid-cols-3 md:gap-6 md:items-center md:my-12">
        <MyCard className="pb-8 md:h-full">
          <CardContent className="p-4 space-y-4 relative mx-auto">
            <div className="w-full flex items-center justify-between">
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-nowrap"
              >
                Seus Rendimentos
              </MyTypography>

              <div className="ml-auto">
                <MySelect
                  value={typeGroup}
                  onValueChange={(value) => handleFilter(value)}
                >
                  <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                    <SelectValue placeholder="Mensal" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="month">Mensal</SelectItem>
                    <SelectItem value="week">Semanal</SelectItem>
                  </SelectContent>
                </MySelect>
              </div>
            </div>

            {filteredPieData && filteredPieData?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={filteredPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110} // Aumentando o tamanho do gráfico
                      innerRadius={75} // Deixando mais fino
                      minAngle={20} // Define o ângulo mínimo para exibição
                      startAngle={-45} // Define que o maior segmento começa de cima
                      endAngle={320} // Garante a distribuição no sentido anti-horário
                      fill="#8884d8"
                      labelLine={false}
                      isAnimationActive={false}
                      label={renderCustomizedLabel}
                      stroke="none" // Remove contorno para melhor visualização
                    >
                      {filteredPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center absolute top-[35%] left-[35%] md:left-[33%] opacity-6">
                  <MyTypography variant="body-big" lightness={400} className="">
                    Total
                  </MyTypography>
                  <MyTypography
                    variant="subtitle2"
                    weight="bold"
                    className="text-[1.125rem] md:text-[1.3rem]"
                  >
                    {incomeData?.sumTotalOrdersValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </MyTypography>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[250px]">
                <MyTypography variant="body-big" weight="bold">
                  Você ainda não possui rendimentos
                </MyTypography>
              </div>
            )}

            <div className="flex flex-col gap-2 w-2/3 mx-auto items-start">
              {pieData.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center gap-2"
                >
                  <div
                    className={cn(`h-3 w-3 rounded-full border-2 shrink-0`)}
                    style={{
                      borderColor: entry.color,
                    }}
                  />
                  <MyTypography
                    variant="body"
                    lightness={400}
                    className="flex-1"
                  >
                    {entry.name}
                  </MyTypography>
                </div>
              ))}
            </div>
          </CardContent>
        </MyCard>

        <MyCard className="md:h-full max-sm:hidden">
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold">Atividades</h2>
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 md:cursor-pointer"
                onClick={() =>
                  router.push(`/admin/financeiro/relatorio/${activity.id}`)
                }
              >
                <div className="flex items-center gap-4 relative">
                  <MyTypography
                    variant="caption"
                    className="text-sm font-semibold absolute top-[39%] left-[7%]"
                  >
                    {Math.round(activity.progress)}%
                  </MyTypography>
                  <ResponsiveContainer width={70} height={70}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: activity.name, value: activity.progress },
                          {
                            name: "Restante",
                            value: 100 - (activity.progress ?? 0),
                          },
                        ]}
                        dataKey="value"
                        innerRadius={28}
                        outerRadius={35}
                        startAngle={90}
                        endAngle={450}
                        isAnimationActive={false}
                      >
                        <Cell fill={activity.color} />
                        <Cell fill="#E5E7EB" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1">
                    <MyTypography
                      variant="body-big"
                      weight="semibold"
                      className="flex items-center space-x-2"
                    >
                      <MyIcon
                        name={activity.icon as IconsMapTypes}
                        className="text-gray-700"
                      />
                      <span>{activity.name}</span>
                    </MyTypography>
                    <MyTypography
                      variant="body-big"
                      lightness={500}
                      className="mt-1 ml-1"
                    >
                      % das atividades realizadas{" "}
                      <span className="text-xs text-neutral-400">
                        Saiba Mais
                      </span>
                    </MyTypography>
                  </div>
                </div>
                {index !== activities.length - 1 && (
                  <div className="w-full h-1 border-t border-dashed" />
                )}
              </div>
            ))}
          </CardContent>
        </MyCard>

        <MyCard className="md:h-full">
          <CardContent className="w-full h-full flex flex-col gap-12 items-center p-3">
            <div className="w-full flex items-center justify-between">
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-nowrap"
              >
                Entradas
              </MyTypography>
              <div className="ml-auto">
                <MySelect
                  value={typeGroupYear}
                  onValueChange={(value) => handleFilterYear(value)}
                >
                  <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                    <SelectValue placeholder="Mensal" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="month">Mensal</SelectItem>
                    <SelectItem value="week">Semanal</SelectItem>
                  </SelectContent>
                </MySelect>
              </div>
            </div>

            <div className="h-[250px] w-full mt-4">
              {adminIncomeYear && Object.keys(adminIncomeYear).length > 0 ? (
                (() => {
                  const chartData = formatChartData(
                    adminIncomeYear,
                    typeGroupYear
                  );
                  const reference =
                    typeGroupYear == "month"
                      ? getMiddleMonthLabel(chartData)
                      : getMiddleLabel(chartData);

                  return (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{
                          top: 10,
                          right: 10,
                          left: -20,
                          bottom: 5,
                        }}
                      >
                        <XAxis
                          fontSize={12}
                          axisLine={false}
                          dataKey="name"
                          interval="preserveStartEnd"
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis fontSize={12} axisLine={false} />
                        <Tooltip content={renderTooltip} />
                        {reference && (
                          <ReferenceLine
                            x={reference}
                            stroke="orange"
                            strokeWidth={2}
                          />
                        )}
                        <Line
                          type="monotone"
                          dataKey="Total"
                          stroke="#00C6FB"
                          strokeWidth={2}
                          dot={{ r: 0 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="before"
                          strokeWidth={2}
                          stroke="rgb(201, 201, 201)"
                          dot={{ r: 0 }}
                        />
                        <CartesianGrid strokeDasharray="2" vertical={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  );
                })()
              ) : (
                <div className="flex items-center justify-center mt-6">
                  <MyTypography variant="body-big" weight="bold">
                    Você ainda não possui passeios realizados
                  </MyTypography>
                </div>
              )}
            </div>
          </CardContent>
        </MyCard>
      </div>

      <MyCard className="md:h-full">
        <CardContent className="p-4 space-y-4 relative mx-auto">
          <div className="w-full flex items-center justify-between">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Saídas
            </MyTypography>
            <div className="ml-auto">
              <MySelect
              //   value={}
              //   onValueChange={}
              >
                <SelectTrigger className="rounded-2xl text-[#848A9C] text-xs">
                  <SelectValue placeholder="Mensal" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="Mensal">Mensal</SelectItem>
                  <SelectItem value="Semanal">Semanal</SelectItem>
                </SelectContent>
              </MySelect>
            </div>
          </div>

          {/* Legenda */}
          <div className="flex gap-6 w-full">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-[#00C6FB]" />
              <MyTypography variant="body" lightness={400}>
                Esse Mês
              </MyTypography>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-[#FFA500]" />
              <MyTypography variant="body" lightness={400}>
                Mês Passado
              </MyTypography>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
                barGap={-16}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis
                  hide // Esconde completamente o eixo Y
                />
                <Tooltip />
                <Bar
                  dataKey="atual"
                  fill="#00C6FB"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={6}
                />
                <Bar
                  dataKey="anterior"
                  fill="#FFA500"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={6}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </MyCard>

      <MyCard className="md:h-full md:hidden">
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">Atividades</h2>
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:cursor-pointer"
              onClick={() =>
                router.push(`/admin/financeiro/relatorio/${activity.id}`)
              }
            >
              <div className="flex items-center gap-4 relative">
                <MyTypography
                  variant="caption"
                  className="text-sm font-semibold absolute top-[39%] left-[7%]"
                >
                  {activity.progress}%
                </MyTypography>
                <ResponsiveContainer width={70} height={70}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: activity.name, value: activity.progress },
                        { name: "Restante", value: 100 - activity.progress },
                      ]}
                      dataKey="value"
                      innerRadius={28}
                      outerRadius={35}
                      startAngle={90}
                      endAngle={450}
                      isAnimationActive={false}
                    >
                      <Cell fill={activity.color} />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1">
                  <MyTypography
                    variant="body-big"
                    weight="semibold"
                    className="flex items-center space-x-2"
                  >
                    <MyIcon
                      name={activity.icon as IconsMapTypes}
                      className="text-gray-700"
                    />
                    <span>{activity.name}</span>
                  </MyTypography>
                  <MyTypography
                    variant="body-big"
                    lightness={500}
                    className="mt-1 ml-1"
                  >
                    % das atividades realizadas.{" "}
                    <span className="text-xs text-neutral-400">Saiba Mais</span>
                  </MyTypography>
                </div>
              </div>
              {index !== activities.length - 1 && (
                <div className="w-full h-1 border-t border-dashed" />
              )}
            </div>
          ))}
        </CardContent>
      </MyCard>
    </main>
  );
}
