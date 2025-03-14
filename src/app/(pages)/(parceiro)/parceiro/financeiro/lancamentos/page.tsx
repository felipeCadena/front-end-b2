"use client";

import MyTypography from "@/components/atoms/my-typography";
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/my-select";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  MyTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/my-table";

interface Lancamento {
  id: number;
  imagem: string;
  passeio: string;
  data: string;
  duracao: string;
  quantidade: string;
  valor: number;
  status?: "concluido" | "cancelado" | "pendente";
}

const lancamentos: Lancamento[] = [
  {
    id: 1,
    imagem: "/images/atividades/mar/mar-4.jpeg",
    passeio: "Escalada Cristo - RJ",
    data: "24/09 - 08:00 manhã",
    duracao: "4 Horas",
    quantidade: "2 adultos x 181,93",
    valor: 363.86,
  },
  {
    id: 2,
    imagem: "/images/atividades/mar/mar-4.jpeg",
    passeio: "Escalada Cristo - RJ",
    data: "24/09 - 08:00 manhã",
    duracao: "4 Horas",
    quantidade: "2 adultos x 181,93",
    valor: 363.86,
  },
  {
    id: 3,
    imagem: "/images/atividades/mar/mar-4.jpeg",
    passeio: "Escalada Cristo - RJ",
    data: "24/09 - 08:00 manhã",
    duracao: "4 Horas",
    quantidade: "2 adultos x 181,93",
    valor: 363.86,
  },
  {
    id: 4,
    imagem: "/images/atividades/mar/mar-4.jpeg",
    passeio: "Escalada Cristo - RJ",
    data: "24/09 - 08:00 manhã",
    duracao: "4 Horas",
    quantidade: "2 adultos x 181,93",
    valor: 363.86,
    status: "pendente",
  },
  {
    id: 5,
    imagem: "/images/atividades/mar/mar-4.jpeg",
    passeio: "Escalada Cristo - RJ",
    data: "24/09 - 08:00 manhã",
    duracao: "4 Horas",
    quantidade: "2 adultos x 181,93",
    valor: 363.86,
    status: "pendente",
  },
  {
    id: 6,
    imagem: "/images/atividades/mar/mar-4.jpeg",
    passeio: "Escalada Cristo - RJ",
    data: "24/09 - 08:00 manhã",
    duracao: "4 Horas",
    quantidade: "2 adultos x 181,93",
    valor: 363.86,
    status: "cancelado",
  },
];

export default function Lancamentos() {
  return (
    <section className="mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <MyTypography
          variant="heading3"
          weight="bold"
          className="underline decoration-primary-600"
        >
          Seus lançamentos
        </MyTypography>

        <div className="flex gap-4">
          <MySelect defaultValue="receber">
            <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
              <SelectValue placeholder="A receber" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="receber">A receber</SelectItem>
              <SelectItem value="pagar">A pagar</SelectItem>
            </SelectContent>
          </MySelect>

          <MySelect defaultValue="data">
            <SelectTrigger className="rounded-2xl w-[180px] text-[#848A9C] text-xs">
              <SelectValue placeholder="Data da atividade" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="data">Data da atividade</SelectItem>
              <SelectItem value="nome">Nome da atividade</SelectItem>
            </SelectContent>
          </MySelect>

          <MySelect defaultValue="setembro">
            <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
              <SelectValue placeholder="Setembro" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="setembro">Setembro</SelectItem>
              <SelectItem value="outubro">Outubro</SelectItem>
            </SelectContent>
          </MySelect>
        </div>
      </div>

      <MyTable className="border-collapse mt-4">
        <TableHeader>
          <TableRow className="text-sm font-semibold">
            <TableHead>Passeio</TableHead>
            <TableHead>Data da Atividade</TableHead>
            <TableHead>Duração da Atividade</TableHead>
            <TableHead>Quant. de pessoas</TableHead>
            <TableHead>Total:</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lancamentos.map((lancamento) => (
            <TableRow
              key={lancamento.id}
              className={cn(
                "relative bg-gray-100",
                lancamento.status === "pendente" && "bg-primary-800",
                lancamento.status === "cancelado" && "bg-[#FFE3E3]"
              )}
            >
              <TableCell>
                <div className="flex items-center gap-6">
                  <Image
                    src={lancamento.imagem}
                    alt={lancamento.passeio}
                    width={80}
                    height={80}
                    className="w-[70px] h-[70px] rounded-md object-cover"
                  />
                  <MyTypography
                    variant="body"
                    weight="bold"
                    className={cn(
                      lancamento.status === "cancelado" && "line-through"
                    )}
                  >
                    {lancamento.passeio}
                  </MyTypography>
                </div>
              </TableCell>
              <TableCell>{lancamento.data}</TableCell>
              <TableCell>{lancamento.duracao}</TableCell>
              <TableCell>{lancamento.quantidade}</TableCell>
              <TableCell>
                {lancamento.status === "cancelado"
                  ? "Cancelado"
                  : `R$${lancamento.valor.toFixed(2)}`}
              </TableCell>
              <TableCell className="">
                <div
                  className={cn(
                    "absolute right-0 top-0 h-full w-2 rounded-r-md opacity-50 bg-gray-300",
                    lancamento.status === "pendente" && "bg-primary-600",
                    lancamento.status === "cancelado" && "bg-[#FF5757]"
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MyTable>

      {/* Footer com valor total */}
      <div className="flex justify-between items-center bg-[#a0e2ff46] py-4 px-2 rounded-lg mt-4 relative">
        <MyTypography variant="body" weight="bold" className="px-4">
          Valor a receber
        </MyTypography>
        <span className="text-[#00A3FF] text-xs">
          ----------------------------------------------------------------------------------------------------------------
        </span>
        <MyTypography
          variant="body"
          weight="bold"
          className="text-[#00A3FF] px-12"
        >
          R$ 350,00
        </MyTypography>
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-2 rounded-r-md opacity-50 bg-[#00A3FF]"
          )}
        />
      </div>
    </section>
  );
}
