"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  MyDropdownMenu,
} from "../atoms/my-drop-menu";
import MyIcon, { IconsMapTypes } from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import MyButton from "../atoms/my-button";
import Edit from "../atoms/my-icon/elements/edit";
import Calendar from "../atoms/my-icon/elements/calendar";
import LocationRounded from "../atoms/my-icon/elements/location-rounded";
import Dollar from "../atoms/my-icon/elements/dollar";
import Camera from "../atoms/my-icon/elements/camera";
import Time from "../atoms/my-icon/elements/time";
import Eye from "../atoms/my-icon/elements/eye";
import { useQuery } from "@tanstack/react-query";
import { partnerService } from "@/services/api/partner";
import { useParams } from "next/navigation";
import Cancel from "../atoms/my-icon/elements/cancel";
import Warning from "../atoms/my-icon/elements/warning";

export type EditSection =
  | "basic" // título, descrição, tipo
  | "schedule" // horários
  | "location" // localização
  | "pricing" // preços
  | "images" // imagens
  | "availability" // disponibilidade
  | "hide" // ocultar atividade
  | "cancel"; // cancelar atividade

interface ActivityEditMenuProps {
  onEdit: (section: EditSection) => void;
  hasClient?: boolean;
  isOcult?: boolean;
}

const menuItems = [
  {
    label: "Informações Gerais",
    icon: <Edit fill="#8DC63F" />,
    section: "basic" as EditSection,
    description: "Título, descrição e tipo",
  },
  {
    label: "Imagens",
    icon: <Camera color="#8DC63F" />,
    section: "images" as EditSection,
    description: "Imagens",
  },
  {
    label: "Valores",
    icon: <Dollar fill="#8DC63F" />,
    section: "pricing" as EditSection,
    description: "Valores",
  },
  {
    label: "Horários - Repetição",
    icon: <Time />,
    section: "schedule" as EditSection,
    description: "Dias e horários disponíveis",
  },
  {
    label: "Localização",
    icon: <LocationRounded />,
    section: "location" as EditSection,
    description: "Endereço e ponto de referência",
  },
  {
    label: "Datas específicas",
    icon: <Calendar />,
    section: "availability" as EditSection,
    description: "Disponibilidade",
  },
  {
    label: "Desativar atividade",
    icon: <Eye />,
    section: "hide" as EditSection,
    description: "Desativar atividade",
  },
  {
    label: "Excluir atividade",
    icon: <Warning fill="#8DC63F" width="24" height="24" />,
    section: "cancel" as EditSection,
    description: "Excluir atividade",
  },
];

export function ActivityEditMenu({ onEdit, isOcult }: ActivityEditMenuProps) {
  return (
    <MyDropdownMenu>
      <DropdownMenuTrigger asChild>
        <MyButton
          variant="default"
          size="lg"
          className="max-sm:w-full"
          borderRadius="squared"
          leftIcon={<Edit fill="#fff" />}
        >
          Editar Atividade
        </MyButton>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="min-w-[300px] md:min-w-[220px] flex flex-col bg-white rounded-md shadow-lg p-0 z-40 border"
          sideOffset={5}
          align="center"
        >
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.section}
              className="flex items-center gap-2 px-2 py-4 cursor-pointer hover:bg-gray-200"
              onSelect={() => onEdit(item.section)}
            >
              {item.icon}
              <MyTypography variant="body-big" weight="medium">
                {item.label == "Desativar atividade" && isOcult
                  ? "Ativar Atividade"
                  : item.label}
              </MyTypography>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </MyDropdownMenu>
  );
}
