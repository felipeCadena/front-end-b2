"use client";

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
import { cn } from "@/utils/cn";
import PATHS from "@/utils/paths";
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

const activities = [
  {
    id: 1,
    name: "Atividades Aquáticas",
    icon: "mar",
    color: "#00C6FB",
    progress: 92,
  },
  {
    id: 2,
    name: "Atividades na Terra",
    icon: "terra",
    color: "#FFA500",
    progress: 68,
  },
  {
    id: 3,
    name: "Atividades no Ar",
    icon: "ar",
    color: "#FF66B2",
    progress: 75,
  },
];

const pieData = [
  { name: "Atividades Aquáticas", value: 80, color: "#00C6FB" },
  { name: "Atividades no Ar", value: 10, color: "#FF66B2" },
  { name: "Atividades na Terra", value: 10, color: "#FFA500" },
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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4; // Ajuste fino da posição
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

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="max-sm:mx-4 my-6">
      <div className="max-sm:space-y-6 md:grid md:grid-cols-3 md:gap-6 md:items-center md:my-12">
        <MyCard className="md:h-full">
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold">Atividades</h2>
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 md:cursor-pointer"
                onClick={() =>
                  router.push(PATHS.relatorioAtividade(activity.id))
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
                      className="mt-1"
                    >
                      Lorem ipsum dolor sit am
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

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110} // Aumentando o tamanho do gráfico
                  innerRadius={80} // Deixando mais fino
                  minAngle={20} // Define o ângulo mínimo para exibição
                  startAngle={-45} // Define que o maior segmento começa de cima
                  endAngle={320} // Garante a distribuição no sentido anti-horário
                  fill="#8884d8"
                  labelLine={false}
                  isAnimationActive={false}
                  label={renderCustomizedLabel}
                  stroke="none" // Remove contorno para melhor visualização
                >
                  {pieData.map((entry, index) => (
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
                R$3.250,00
              </MyTypography>
            </div>

            <div className="flex flex-col gap-2 w-1/2 mx-auto items-start">
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

            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineData}
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
                  <Tooltip />
                  <ReferenceLine x="Mai" stroke="orange" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="value"
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
            </div>
          </CardContent>
        </MyCard>
      </div>

      <div className="max-sm:hidden">
        <Lancamentos />
      </div>
    </main>
  );
}
