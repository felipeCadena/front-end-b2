"use client";

import React from "react";

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
import Lancamentos from "@/components/templates/lancamentos";
import { partnerService } from "@/services/api/partner";
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
import { useQuery } from "@tanstack/react-query";
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
} from "recharts";
import {
  startOfMonth,
  endOfMonth,
  format,
  startOfYear,
  endOfYear,
  parse,
} from "date-fns";

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
  const now = new Date();
  const currentMonthKey = format(new Date(), "MM");
  const [filters, setFilters] = React.useState({
    report: "",
    year: "2025",
    month: currentMonthKey,
    typeDate: "", // month or year
  });

  const selectedMonthDate = React.useMemo(() => {
    return parse(
      `${filters.year}-${filters.month}-01`,
      "yyyy-MM-dd",
      new Date()
    );
  }, [filters?.year, filters?.month]);

  const selectedYearDate = React.useMemo(() => {
    return parse(`${filters.year}-01-01`, "yyyy-MM-dd", new Date());
  }, [filters.year]);

  const startDate = React.useMemo(() => {
    return format(startOfMonth(selectedMonthDate), "yyyy-MM-dd'T'00:00:00");
  }, [filters.typeDate, selectedMonthDate]);

  const endDate = React.useMemo(() => {
    return format(endOfMonth(selectedMonthDate), "yyyy-MM-dd'T'23:59:59");
  }, [filters.typeDate, selectedMonthDate]);

  const startOfCurrentYear = format(startOfYear(now), "yyyy-MM-dd'T'00:00:00");

  const endOfCurrentYear = format(endOfYear(now), "yyyy-MM-dd'T'23:59:59");

  const [typeGroup, setTypeGroup] = React.useState("month");

  const [typeGroupYear, setTypeGroupYear] = React.useState("month");
  // 'recebido' | 'a_receber' | 'cancelado'
  const { data: partnerOrders } = useQuery({
    queryKey: ["partnerOrders", filters],
    queryFn: () =>
      partnerService.getOrders({
        startsAt: startDate,
        endsAt: endDate,
        orderStatus: filters.report,
      }),
  });

  const { data: partnerIncome } = useQuery({
    queryKey: ["partnerIncome", typeGroup],
    queryFn: () =>
      partnerService.getIncome({
        startsAt: startDate,
        endsAt: endDate,
        typeGroup,
      }),
  });

  const { data: partnerIncomeYear } = useQuery({
    queryKey: ["partnerIncomeYear", typeGroupYear],
    queryFn: () =>
      partnerService.getIncome({
        startsAt: startOfCurrentYear,
        endsAt: endOfCurrentYear,
        typeGroup: typeGroupYear,
      }),
  });

  const type = typeGroup === "month" ? "2025-05" : "week-1-2025-05";

  const incomeData = partnerIncome?.[type];

  // const incomeYearData = partnerIncomeYear?.[type];

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

  const handleFilter = (value: string) => {
    setTypeGroup(value);
  };

  const handleFilterYear = (value: string) => {
    setTypeGroupYear(value);
  };

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
    <main className="max-sm:mx-4 my-6">
      <div className="max-sm:space-y-6 md:grid md:grid-cols-3 md:gap-6 md:items-center md:my-12">
        <MyCard className="md:h-full">
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Atividades</h2>
              <p className="text-sm text-gray-400 mt-2">
                Clique em um dos cards abaixo para ver relatórios de cada tipo
                de atividade
              </p>
            </div>
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 md:cursor-pointer pt-1"
                onClick={() =>
                  router.push(PATHS.relatorioAtividade(activity?.icon))
                }
              >
                <div className="flex items-center gap-4 relative">
                  <MyTypography
                    variant="caption"
                    className="text-sm font-semibold absolute top-[39%] left-[8%]"
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
                    {incomeData?.sumTotal.toLocaleString("pt-BR", {
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
          <CardContent className="w-full h-full flex flex-col gap-24 items-center p-3">
            <div className="w-full flex items-center justify-between">
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-nowrap"
              >
                Passeios do mês
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
              {partnerIncomeYear &&
              Object.keys(partnerIncomeYear).length > 0 ? (
                (() => {
                  const chartData = formatChartData(
                    partnerIncomeYear,
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

      <div className="max-sm:hidden">
        <Lancamentos
          data={partnerOrders}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </main>
  );
}
