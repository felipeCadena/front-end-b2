"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import { CardContent, MyCard } from "@/components/molecules/my-card";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activities = [
  { name: "Atividade no Mar", icon: "mar", color: "#00C6FB", progress: 92 },
  { name: "Atividade na Terra", icon: "terra", color: "#FFA500", progress: 68 },
  { name: "Atividade no Ar", icon: "ar", color: "#FF66B2", progress: 75 },
];

const pieData = [
  { name: "Atividade no Mar", value: 80, color: "#00C6FB" },
  { name: "Atividade na Terra", value: 10, color: "#FFA500" },
  { name: "Atividade no Ar", value: 10, color: "#FF66B2" },
];

const lineData = [
  { name: "Jan", value: 80 },
  { name: "Fev", value: 90 },
  { name: "Mar", value: 100 },
  { name: "Abr", value: 150 },
  { name: "Mai", value: 180 },
  { name: "Jun", value: 140 },
  { name: "Jul", value: 110 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

export default function Dashboard() {
  return (
    <div className="space-y-6 mx-4">
      <MyCard>
        <CardContent className="space-y-4 p-3">
          <h2 className="text-lg font-semibold">Atividades</h2>
          {activities.map((activity, index) => (
            <div key={index} className="flex flex-col gap-4">
            <div className="flex items-center gap-4 relative">
              <MyTypography variant="caption" className="text-sm font-semibold absolute top-[39%] left-[7%]">
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
                <MyTypography variant="body-big" weight="semibold" className="flex items-center space-x-2">
                  <MyIcon name={activity.icon as IconsMapTypes} className="text-gray-700" />
                  <span>{activity.name}</span>
                </MyTypography>
                <MyTypography variant="body-big" lightness={500} className="mt-1">
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

      {/* <MyCard>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Seus Rendimento</h2>
            <MyButton variant="outline">Mensal</MyButton>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart >
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}

              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-xl font-bold">R$3.250,00</p>
        </CardContent>
      </MyCard> */}

      {/* <MyCard>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Passeios do mês</h2>
            <MyButton variant="outline">Mensal</MyButton>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00C6FB"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </MyCard> */}
    </div>
  );
}
