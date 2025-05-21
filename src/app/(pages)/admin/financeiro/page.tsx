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
import { getYearsArray } from "@/utils/formatters";

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
          {data.ar > 0 && (
            <p>
              <strong>Ar: </strong>
              R$ {data.ar ?? 0}
            </p>
          )}
          {data.terra > 0 && (
            <p>
              <strong>Terra: </strong>
              R$ {data.terra ?? 0}
            </p>
          )}
          {data.mar > 0 && (
            <p>
              <strong>Mar: </strong>
              R$ {data.mar}
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

const renderTooltipGeneral = (props: any) => {
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
          {data.ar > 0 && (
            <p>
              <strong>Ar: </strong>
              R$ {data.ar ?? 0}
            </p>
          )}
          {data.terra > 0 && (
            <p>
              <strong>Terra: </strong>
              R$ {data.terra ?? 0}
            </p>
          )}
          {data.mar > 0 && (
            <p>
              <strong>Mar: </strong>
              R$ {data.mar}
            </p>
          )}
          {data.totalb2 > 0 && (
            <p>
              <strong>Total B2: </strong>
              R$ {data.totalb2 ?? 0}
            </p>
          )}
          {data.total > 0 && (
            <p>
              <strong>Total geral: </strong>
              R$ {Number(data.total).toFixed(0) ?? 0}
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

const mock = {
  "2025-04": {
    countTotal: 8,
    sumTotalOrdersValue: 9766.329999999998,
    sumTotalAdventuresValue: 9552.95,
    sumTotalPartnersValue: 4100,
    sumTotalB2Value: 1230,
    sumTotalTaxes: 225.68,
    sumTotalGatewayTaxes: 213.38000000000002,
    marTotal: 210,
    marPercent: 17.07,
    arTotal: 540,
    arPercent: 43.9,
    terraTotal: 480,
    terraPercent: 39.02,
  },
  "2025-05": {
    countTotal: 8,
    sumTotalOrdersValue: 5000,
    sumTotalAdventuresValue: 9552.95,
    sumTotalPartnersValue: 4100,
    sumTotalB2Value: 1230,
    sumTotalTaxes: 225.68,
    sumTotalGatewayTaxes: 213.38000000000002,
    marTotal: 210,
    marPercent: 17.07,
    arTotal: 540,
    arPercent: 43.9,
    terraTotal: 480,
    terraPercent: 39.02,
  },
  "2025-06": {
    countTotal: 8,
    sumTotalOrdersValue: 12520,
    sumTotalAdventuresValue: 9552.95,
    sumTotalPartnersValue: 4100,
    sumTotalB2Value: 1230,
    sumTotalTaxes: 225.68,
    sumTotalGatewayTaxes: 213.38000000000002,
    marTotal: 210,
    marPercent: 17.07,
    arTotal: 540,
    arPercent: 43.9,
    terraTotal: 480,
    terraPercent: 39.02,
  },
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
  const y = cy + (radius + 1) * Math.sin(-midAngle * RADIAN);

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
  const [year, setYear] = React.useState("2025");

  const [yearGeneral, setYearGeneral] = React.useState("2025");

  const [filters, setFilters] = React.useState({
    report: "",
    year: "2025",
    month: currentMonthKey,
    typeDate: "", // month or year
  });
  const [typeGroup, setTypeGroup] = React.useState("month");

  const [loading, setLoading] = React.useState(false);

  const now = new Date();

  const startsAt = format(startOfMonth(now), "yyyy-MM-dd'T'00:00:00");
  const endsAt = format(endOfMonth(now), "yyyy-MM-dd'T'00:00:00");

  const { startOfCurrentYear, endOfCurrentYear } = React.useMemo(() => {
    const selectedDate = new Date(Number(year), 0); // Janeiro do ano selecionado
    return {
      startOfCurrentYear: format(
        startOfYear(selectedDate),
        "yyyy-MM-dd'T'00:00:00"
      ),
      endOfCurrentYear: format(
        endOfYear(selectedDate),
        "yyyy-MM-dd'T'23:59:59"
      ),
    };
  }, [year]);

  const { startOfCurrentYearGeneral, endOfCurrentYearGeneral } =
    React.useMemo(() => {
      const selectedDate = new Date(Number(yearGeneral), 0); // Janeiro do ano selecionado
      return {
        startOfCurrentYearGeneral: format(
          startOfYear(selectedDate),
          "yyyy-MM-dd'T'00:00:00"
        ),
        endOfCurrentYearGeneral: format(
          endOfYear(selectedDate),
          "yyyy-MM-dd'T'23:59:59"
        ),
      };
    }, [yearGeneral]);

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
    queryKey: ["adminIncome", typeGroup],
    queryFn: () =>
      adminService.getB2Income({
        startsAt,
        endsAt,
        typeGroup,
      }),
  });

  const { data: adminIncomeYear } = useQuery({
    queryKey: ["adminIncomeYear", year],
    queryFn: () =>
      adminService.getB2Income({
        startsAt: startOfCurrentYear,
        endsAt: endOfCurrentYear,
      }),
  });

  const { data: adminIncomeYearGeneral } = useQuery({
    queryKey: ["adminIncomeYearGeneral", yearGeneral],
    queryFn: () =>
      adminService.getB2Income({
        startsAt: startOfCurrentYearGeneral,
        endsAt: endOfCurrentYearGeneral,
      }),
  });

  function getLatestWeekKey(data: Record<string, any>): string | null {
    const keys = Object.keys(data);

    if (keys.length === 0) return null;

    const sorted = keys.sort((a, b) => {
      const getWeekNum = (key: string) => {
        const match = key.match(/week-(\d+)-/);
        return match ? parseInt(match[1], 10) : 0;
      };
      return getWeekNum(b) - getWeekNum(a); // ordem decrescente
    });

    return sorted[0];
  }

  const type =
    typeGroup === "month"
      ? `${filters.year}-${filters.month}`
      : adminIncome && getLatestWeekKey(adminIncome);

  const incomeData = adminIncome?.[type ?? ""];

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

  const getMiddleMonthLabel = (data: any) => {
    const now = new Date();
    const currentMonthLabel = now.toLocaleString("pt-BR", { month: "short" });
    const formatted =
      currentMonthLabel.charAt(0).toUpperCase() + currentMonthLabel.slice(1);

    const found = data.find((item: any) => `${item.name}.` === formatted);
    return found?.name ?? null;
  };

  function generateMonthlyChartData(dataFromApi: Record<string, any>) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const months = [];

    // const isMobile = window && window.innerWidth < 768 ? 6 : 12;

    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 1);
      const key = `${date.getFullYear()}-${(month + 1).toString().padStart(2, "0")}`;
      const label = date.toLocaleString("pt-BR", { month: "short" });

      const monthData = Object.entries(dataFromApi).find(([k]) =>
        k.endsWith(key)
      )?.[1];

      months.push({
        name: label.charAt(0).toUpperCase() + label.slice(1).replace(".", ""),
        mar: monthData?.marTotal || 0,
        ar: monthData?.arTotal || 0,
        terra: monthData?.terraTotal || 0,
        Total: monthData?.sumTotalB2Value || 0,
      });
    }

    return months;
  }

  function generateCharDataGeneral(dataFromApi: Record<string, any>) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const months = [];

    // const isMobile = window && window.innerWidth < 768 ? 6 : 12;

    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 1);
      const key = `${date.getFullYear()}-${(month + 1).toString().padStart(2, "0")}`;
      const label = date.toLocaleString("pt-BR", { month: "short" });

      const monthData = Object.entries(dataFromApi).find(([k]) =>
        k.endsWith(key)
      )?.[1];

      months.push({
        name: label.charAt(0).toUpperCase() + label.slice(1).replace(".", ""),
        mar: monthData?.marTotal || 0,
        ar: monthData?.arTotal || 0,
        terra: monthData?.terraTotal || 0,
        total: monthData?.sumTotalOrdersValue || 0,
        totalb2: monthData?.sumTotalB2Value || 0,
      });
    }

    return months;
  }

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

      <div className="max-sm:space-y-6 md:grid md:grid-cols-2 md:gap-6 md:items-center md:my-12">
        <MyCard className="pb-8 md:h-full">
          <CardContent className="p-4 space-y-4 relative mx-auto">
            <div className="w-full flex items-center justify-between">
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-nowrap"
              >
                Receita Total
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
                <div
                  className={cn(
                    "text-center absolute top-[35%] left-[30%] md:left-[39%] opacity-6"
                  )}
                >
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

        <MyCard className="md:h-full">
          <CardContent className="space-y-4 p-3">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Extrato parcial das atividade
            </MyTypography>
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
                    className="text-sm font-semibold absolute left-5"
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
      </div>
      <MyCard className="md:h-full max-sm:mt-4">
        <CardContent className="w-full h-full flex flex-col gap-10 items-center p-3 overflow-y-hidden overflow-x-auto">
          <div className="w-full flex items-center justify-between">
            <MyTypography
              variant="subtitle3"
              weight="bold"
              className="text-nowrap"
            >
              Fluxo B2
            </MyTypography>
            <div className="ml-auto">
              <MySelect
                value={year}
                onValueChange={(value) => {
                  setYear(value);
                }}
              >
                <SelectTrigger className="rounded-2xl w-[100px] text-[#848A9C] text-xs">
                  <SelectValue placeholder="Ano vigente" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {getYearsArray().map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                  <SelectItem key="2026" value="2026">
                    2026
                  </SelectItem>
                </SelectContent>
              </MySelect>
            </div>
          </div>

          <div className="h-[250px] w-full mt-4">
            <div className="min-w-[600px] sm:min-w-full h-full">
              {adminIncomeYear && Object.keys(adminIncomeYear).length > 0 ? (
                (() => {
                  const chartData = generateMonthlyChartData(adminIncomeYear);

                  const reference = getMiddleMonthLabel(chartData);

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
                            stroke="#000"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                          />
                        )}
                        <Line
                          type="monotone"
                          dataKey="mar"
                          stroke="#00C6FB"
                          strokeWidth={2}
                          name="Mar"
                        />
                        <Line
                          type="monotone"
                          dataKey="ar"
                          stroke="#FF66B2"
                          strokeWidth={2}
                          name="Ar"
                        />
                        <Line
                          type="monotone"
                          dataKey="terra"
                          stroke="#FFA500"
                          strokeWidth={2}
                          name="Terra"
                        />
                        <CartesianGrid
                          color="#000"
                          strokeDasharray="2"
                          vertical={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  );
                })()
              ) : (
                <div className="flex items-center md:justify-center mt-6">
                  <MyTypography variant="body-big" weight="bold">
                    Você ainda não possui passeios realizados
                  </MyTypography>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </MyCard>

      <MyCard className="md:h-full">
        <CardContent className="w-full h-full flex flex-col gap-16 items-center p-3 overflow-y-hidden overflow-x-auto">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-nowrap"
              >
                Fluxo geral e B2{" "}
              </MyTypography>
              {/* Legenda */}
              <div className="flex gap-6 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-[#00C6FB]" />
                  <MyTypography variant="body" lightness={400}>
                    Valor geral
                  </MyTypography>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-[#FFA500]" />
                  <MyTypography variant="body" lightness={400}>
                    Tarifa B2
                  </MyTypography>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <MySelect
                value={yearGeneral}
                onValueChange={(value) => {
                  setYearGeneral(value);
                }}
              >
                <SelectTrigger className="rounded-2xl w-[100px] text-[#848A9C] text-xs">
                  <SelectValue placeholder="Ano vigente" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {getYearsArray().map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                  <SelectItem key="2026" value="2026">
                    2026
                  </SelectItem>
                </SelectContent>
              </MySelect>
            </div>
          </div>

          <div className="h-[250px] w-full mt-4">
            <div className="min-w-[600px] sm:min-w-full h-full">
              {adminIncomeYearGeneral &&
              Object.keys(adminIncomeYearGeneral).length > 0 ? (
                (() => {
                  const chartData = generateCharDataGeneral(
                    adminIncomeYearGeneral
                  );

                  return (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{
                          top: 20,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                        barGap={-36}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          fontSize={12}
                        />
                        <YAxis fontSize={12} axisLine={false} />
                        <Tooltip content={renderTooltipGeneral} />
                        <Bar
                          dataKey="total"
                          fill="#00C6FB"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={8}
                        />
                        <Bar
                          dataKey="totalb2"
                          fill="#FFA500"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={8}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  );
                })()
              ) : (
                <div className="flex items-center md:justify-center mt-6">
                  <MyTypography variant="body-big" weight="bold">
                    Você ainda não possui passeios realizados
                  </MyTypography>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </MyCard>
    </main>
  );
}
