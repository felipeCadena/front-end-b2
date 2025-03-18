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
import { lancamentos } from "@/common/constants/mock";
import { getData, getHora } from "@/utils/formatters";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";

export default function Lancamentos({
  withoutFilters = false,
  title = "Seus lançamentos",
}: {
  withoutFilters?: boolean;
  title?: string;
}) {
  const router = useRouter();

  return (
    <section className="mx-auto py-2 md:py-8 px-4">
      {/* Header */}
      <div
        className={cn(
          "flex items-center my-4",
          withoutFilters ? "gap-4" : "justify-between"
        )}
      >
        {withoutFilters && (
          <MyIcon
            name="voltar-black"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        )}
        <MyTypography
          variant="heading3"
          weight="bold"
          className={cn(
            "text-[1rem] md:text-[1.3rem]",
            !withoutFilters && "underline decoration-primary-600"
          )}
        >
          {title}
        </MyTypography>

        {!withoutFilters && (
          <div className="flex gap-4 max-sm:hidden">
            <MySelect defaultValue="receber">
              <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
                <SelectValue placeholder="A receber" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="receber">A receber</SelectItem>
                <SelectItem value="pagar">Recebido</SelectItem>
                <SelectItem value="pagar">Cancelada</SelectItem>
              </SelectContent>
            </MySelect>

            {/* <MySelect defaultValue="data">
            <SelectTrigger className="rounded-2xl w-[180px] text-[#848A9C] text-xs">
              <SelectValue placeholder="Data da atividade" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="data">Data da atividade</SelectItem>
              <SelectItem value="nome">Nome da atividade</SelectItem>
            </SelectContent>
          </MySelect> */}

            <MySelect defaultValue="2025">
              <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
                <SelectValue placeholder="Setembro" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="2028">2028</SelectItem>
              </SelectContent>
            </MySelect>

            <MySelect defaultValue="setembro">
              <SelectTrigger className="rounded-2xl w-[150px] text-[#848A9C] text-xs">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="janeiro">Janeiro</SelectItem>
                <SelectItem value="fevereiro">Fevereiro</SelectItem>
                <SelectItem value="março">Março</SelectItem>
                <SelectItem value="abril">Abril</SelectItem>
                <SelectItem value="maio">Maio</SelectItem>
                <SelectItem value="junho">Junho</SelectItem>
                <SelectItem value="julho">Julho</SelectItem>
                <SelectItem value="agosto">Agosto</SelectItem>
                <SelectItem value="setembro">Setembro</SelectItem>
                <SelectItem value="outubro">Outubro</SelectItem>
                <SelectItem value="novembro">Novembro</SelectItem>
                <SelectItem value="dezembro">Dezembro</SelectItem>
              </SelectContent>
            </MySelect>
          </div>
        )}
      </div>

      <MyTable className="md:border-collapse mt-4 overflow-hidden">
        <TableHeader>
          <TableRow className="text-xs md:text-sm font-semibold">
            <TableHead className="text-center">Passeio</TableHead>
            <TableHead>Data da Atividade</TableHead>
            <TableHead className="max-sm:hidden text-center">
              Duração da Atividade
            </TableHead>
            <TableHead className="max-sm:hidden text-center">
              Quant. de pessoas
            </TableHead>
            <TableHead className="text-center">Total:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lancamentos.map((lancamento) => (
            <TableRow
              key={lancamento.id}
              className={cn(
                "relative bg-gray-100 text-xs md:text-sm text-center",
                lancamento.status === "pendente" && "bg-primary-800",
                lancamento.status === "cancelado" && "bg-[#FFE3E3]"
              )}
            >
              <TableCell className="max-sm:px-2 max-sm:py-3 rounded-l-md">
                <div className="flex items-center gap-6">
                  <Image
                    src={lancamento.imagem}
                    alt={lancamento.passeio}
                    width={80}
                    height={80}
                    className="w-[70px] h-[70px] rounded-md object-cover max-sm:hidden"
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
              <TableCell className="text-center">
                {getData(lancamento.data)}{" "}
                <span className="max-sm:hidden">{` - ${getHora(lancamento.data)}`}</span>
              </TableCell>
              <TableCell className="max-sm:hidden md:px-8">
                {lancamento.duracao}
              </TableCell>
              <TableCell className="max-sm:hidden md:px-4">
                {lancamento.quantidade}
              </TableCell>
              <TableCell>
                {lancamento.status === "cancelado"
                  ? "Cancelado"
                  : `R$${lancamento.valor.toFixed(2)}`}
              </TableCell>
              <TableCell className="max-sm:pl-2">
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
        <MyTypography variant="body" weight="bold" className="md:px-2">
          Valor a receber
        </MyTypography>
        <span className="text-[#00A3FF] text-xs max-sm:hidden">
          ----------------------------------------------------------------------------------------------------------------
        </span>
        <MyTypography
          variant="body"
          weight="bold"
          className="text-[#00A3FF] px-4"
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
