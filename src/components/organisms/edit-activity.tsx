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

export type EditSection =
  | "basic" // título, descrição, tipo
  | "schedule" // horários
  | "location" // localização
  | "pricing" // preços
  | "images"; // imagens

interface ActivityEditMenuProps {
  onEdit: (section: EditSection) => void;
}

const menuItems = [
  {
    label: "Informações Gerais",
    icon: <Edit fill="#8DC63F" />,
    section: "basic" as EditSection,
    description: "Título, descrição e tipo",
  },
  {
    label: "Horários",
    icon: <Calendar />,
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
    label: "Preços",
    icon: <Dollar fill="#8DC63F" />,
    section: "pricing" as EditSection,
    description: "Valores",
  },
  {
    label: "Imagens",
    icon: <Camera color="#8DC63F" />,
    section: "images" as EditSection,
    description: "Imagens",
  },
];

export function ActivityEditMenu({ onEdit }: ActivityEditMenuProps) {
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
          className="min-w-[300px] md:min-w-[220px] flex flex-col bg-white rounded-md shadow-lg p-0 z-50 border"
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
                {item.label}
              </MyTypography>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </MyDropdownMenu>
  );
}
