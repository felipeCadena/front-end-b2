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
import { getYearsArray } from "@/utils/formatters";
import Image from "next/image";

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
  const [typeGroup, setTypeGroup] = React.useState("month");

  const [year, setYear] = React.useState("2025");

  const selectedMonthDate = React.useMemo(() => {
    return parse(
      `${filters.year}-${filters.month}-01`,
      "yyyy-MM-dd",
      new Date()
    );
  }, [filters?.month]);

  const selectedYearDate = React.useMemo(() => {
    return parse(`${filters.year}-01-01`, "yyyy-MM-dd", new Date());
  }, [filters.year]);

  const startDate = React.useMemo(() => {
    return format(startOfMonth(selectedMonthDate), "yyyy-MM-dd'T'00:00:00");
  }, [filters.typeDate, selectedMonthDate]);

  const endDate = React.useMemo(() => {
    return format(endOfMonth(selectedMonthDate), "yyyy-MM-dd'T'23:59:59");
  }, [filters.typeDate, selectedMonthDate]);

  const end = format(endOfYear(now), "yyyy-MM-dd'T'23:59:59");

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

  // 'recebido' | 'a_receber' | 'cancelado'
  const { data: partnerOrders, isLoading: orderLoading } = useQuery({
    queryKey: ["partnerOrders", filters],
    queryFn: () =>
      partnerService.getOrders({
        startsAt: startDate,
        endsAt: endDate,
        orderStatus: filters.report,
      }),
  });

  const { data: partnerIncome, isLoading } = useQuery({
    queryKey: ["partnerIncome", typeGroup],
    queryFn: () =>
      partnerService.getIncome({
        startsAt: startDate,
        endsAt: endDate,
        typeGroup,
      }),
  });

  const { data: partnerIncomeYear } = useQuery({
    queryKey: ["partnerIncomeYear", year],
    queryFn: () =>
      partnerService.getIncome({
        startsAt: startOfCurrentYear,
        endsAt: endOfCurrentYear,
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
      : partnerIncome && getLatestWeekKey(partnerIncome);

  const incomeData = partnerIncome?.[type ?? ""];

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

  type WeeklyData = {
    [weekKey: string]: {
      countTotal: number;
      sumTotal: number;
      marTotal: number;
      marPercent: number;
      arTotal: number;
      arPercent: number;
      terraTotal: number;
      terraPercent: number;
    };
  };

  type ChartItem = {
    label: string; // Ex: "sem 1"
    mar: number;
    ar: number;
    terra: number;
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
        Total: monthData?.sumTotal || 0,
      });
    }

    return months;
  }

  const getMiddleMonthLabel = (data: any) => {
    const now = new Date();
    const currentMonthLabel = now.toLocaleString("pt-BR", { month: "short" });
    const formatted =
      currentMonthLabel.charAt(0).toUpperCase() + currentMonthLabel.slice(1);

    console.log(formatted);
    console.log(data);

    const found = data.find((item: any) => `${item.name}.` === formatted);
    return found?.name ?? null;
  };

  // const getMiddleLabel = (data: { name: string; Total: number }[]) => {
  //   const withValue = data.filter((d) => d.Total > 0);
  //   if (!withValue.length) return null;

  //   const middleIndex = Math.floor(withValue.length / 2);
  //   return withValue[middleIndex]?.name ?? null;
  // };

  return (
    <main className="max-sm:mx-4 my-6">
      <div className="max-sm:space-y-6 md:grid md:grid-cols-2 md:gap-6 md:items-center md:my-12">
        <MyCard className="md:h-full">
          <CardContent className="space-y-4 p-4">
            <div>
              <MyTypography
                variant="subtitle3"
                weight="bold"
                className="text-nowrap"
              >
                Extrato parcial das atividades
              </MyTypography>

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

        <MyCard className="pb-8 md:h-full">
          <CardContent className="p-4 space-y-4 relative">
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

            {isLoading && (
              <div className="flex items-center justify-center h-[250px]">
                <Image
                  src="/logo.png"
                  alt="B2 Adventure Logo"
                  width={250}
                  height={250}
                  className="object-contain animate-pulse"
                />
              </div>
            )}

            {filteredPieData && filteredPieData?.length > 0 && !isLoading ? (
              <div className="relative">
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
                    "text-center absolute top-[40%] left-[30%] md:left-[38%] opacity-6"
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
                    {incomeData?.sumTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </MyTypography>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[250px]">
                <MyTypography variant="body-big" weight="bold">
                  Você ainda não possui rendimentos
                </MyTypography>
              </div>
            )}

            <div className="flex flex-col gap-2 items-start w-1/2 mx-auto">
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
      </div>
      <MyCard className="md:h-full max-sm:mt-4">
        <CardContent className="w-full h-full flex flex-col gap-24 items-center p-3 overflow-y-hidden overflow-x-auto">
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
                value={year}
                onValueChange={(value) => {
                  setYear(value);
                }}
              >
                <SelectTrigger className="rounded-2xl w-[100px] text-[#848A9C] text-xs">
                  <SelectValue placeholder="Setembro" />
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
              {partnerIncomeYear &&
              Object.keys(partnerIncomeYear).length > 0 ? (
                (() => {
                  const chartData = generateMonthlyChartData(partnerIncomeYear);

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
                        {/* <Line
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
                        /> */}
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
                <div className="flex md:items-center md:justify-center mt-6">
                  <MyTypography variant="body-big" weight="bold">
                    Você ainda não possui passeios realizados
                  </MyTypography>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </MyCard>

      <div className="max-sm:hidden">
        <Lancamentos
          data={partnerOrders}
          filters={filters}
          setFilters={setFilters}
          isLoading={orderLoading}
        />
      </div>
    </main>
  );
}
