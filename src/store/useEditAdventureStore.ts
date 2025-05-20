import { create } from "zustand";
import { Adventure, AdventureSchedule } from "@/services/api/adventures";

export type TypeAdventure = "terra" | "mar" | "ar" | "";

// Adicione esta interface
interface AdventureImage {
  id: string;
  url: string;
  name: string;
  mimetype: string;
  isDefault: boolean;
}

export interface SelectionBlock {
  id: string;
  recurrenceWeekly: string[];
  recurrenceHour: string[];
  dates: Date[];
}

export interface Recurrence {
  id?: string;
  recurrenceWeekly?: string;
  recurrenceMonthly?: string;
  recurrenceHour: string;
}

interface EditAdventureState {
  // Dados básicos
  id?: number;
  title: string;
  description: string;
  typeAdventure: TypeAdventure;
  difficult?: number;
  duration?: string;

  // Endereço
  addressEdit?: string;
  addressStreet?: string;
  addressPostalCode?: string;
  addressNumber?: string;
  addressComplement?: string;
  addressNeighborhood?: string;
  addressCity?: string;
  addressState?: string;
  addressCountry?: string;
  coordinates?: { lat: number; lng: number };
  pointRefAddress?: string;

  // Preços
  personsLimit: number;
  priceAdult: string;
  priceChildren: string;

  // Configurações
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  hoursBeforeSchedule?: number;
  hoursBeforeCancellation?: number;

  // Itens inclusos
  transportIncluded?: boolean;
  picturesIncluded?: boolean;
  itemsIncluded?: string[];
  waterIncluded?: boolean;
  foodIncluded?: boolean;
  fuelIncluded?: boolean;

  // Recorrência
  isRepeatable?: boolean;
  recurrences: Recurrence[];
  selectionBlocks: SelectionBlock[];

  // Imagens
  images: AdventureImage[];
  tempImages: Array<{
    file?: File;
    url: string;
    id?: string; // ID da imagem existente, se houver
    isDefault?: boolean;
  }>;

  // Ações
  setEditData: (data: Partial<EditAdventureState>) => void;
  initializeFromAdventure: (adventure: Adventure) => void;
  resetEditData: () => void;

  // Ações para blocos de seleção
  addSelectionBlock: () => void;
  removeSelectionBlock: (id: string) => void;
  updateSelectionBlock: (
    id: string,
    field: keyof SelectionBlock,
    value: any
  ) => void;

  // Ações para imagens
  addTempImage: (file: File) => void;
  removeTempImage: (index: number) => void;
  updateImageDefault: (index: number) => void;
}

const initialState = {
  title: "",
  description: "",
  typeAdventure: "" as TypeAdventure,
  recurrences: [],
  selectionBlocks: [],
  images: [],
  tempImages: [],
  priceAdult: "",
  priceChildren: "",
  isInGroup: false,
  isChildrenAllowed: false,
  personsLimit: 0,
};

export const useEditAdventureStore = create<EditAdventureState>((set) => ({
  ...initialState,

  setEditData: (data) => set((state) => ({ ...state, ...data })),

  initializeFromAdventure: (adventure) => {
    const formattedBlocks = formatRecurrenceData(adventure.recurrence);

    set({
      id: adventure.id,
      title: adventure.title,
      description: adventure.description,
      typeAdventure: adventure.typeAdventure as TypeAdventure,
      difficult: adventure.difficult,
      duration: adventure.duration,

      // Endereço
      addressStreet: adventure.addressStreet,
      addressPostalCode: adventure.addressPostalCode,
      addressNumber: adventure.addressNumber,
      addressComplement: adventure.addressComplement,
      addressNeighborhood: adventure.addressNeighborhood,
      addressCity: adventure.addressCity,
      addressState: adventure.addressState,
      addressCountry: adventure.addressCountry,
      pointRefAddress: adventure.pointRefAddress,

      coordinates: adventure.coordinates
        ? {
            lat: parseFloat(adventure.coordinates.split(":")[0]),
            lng: parseFloat(adventure.coordinates.split(":")[1]),
          }
        : undefined,
      addressEdit: `${adventure.addressStreet}, ${adventure.addressNumber} - ${adventure.addressNeighborhood}, ${adventure.addressCity} - ${adventure.addressState}`,

      // Preços e configurações
      priceAdult: adventure.priceAdult,
      priceChildren: adventure.priceChildren,
      isInGroup: adventure.isInGroup,
      isChildrenAllowed: adventure.isChildrenAllowed,
      personsLimit: adventure.personsLimit,
      hoursBeforeSchedule: adventure.hoursBeforeSchedule,
      hoursBeforeCancellation: adventure.hoursBeforeCancellation,

      // Itens inclusos
      transportIncluded: adventure.transportIncluded,
      picturesIncluded: adventure.picturesIncluded,
      itemsIncluded:
        typeof adventure?.itemsIncluded === "string"
          ? JSON.parse(adventure?.itemsIncluded)
          : [],

      waterIncluded: adventure.itemsIncluded?.includes("Água") || false,
      foodIncluded: adventure.itemsIncluded?.includes("Almoço") || false,
      fuelIncluded: adventure.itemsIncluded?.includes("Combustível") || false,

      // Recorrência
      isRepeatable: adventure.isRepeatable,
      selectionBlocks: formattedBlocks,

      // Imagens
      images: adventure.images.map((img) => ({
        ...img,
        id: img.id.toString(),
      })),
      tempImages: (adventure.images || []).map((img) => ({
        url: img.url,
        id: img.id.toString(), // Convert id to string
        isDefault: img.isDefault,
      })),
    });
  },

  resetEditData: () => set(initialState),

  addSelectionBlock: () =>
    set((state) => ({
      selectionBlocks: [
        ...state.selectionBlocks,
        {
          id: crypto.randomUUID(),
          recurrenceWeekly: [],
          recurrenceHour: [],
          dates: [],
        },
      ],
    })),

  removeSelectionBlock: (id) =>
    set((state) => ({
      selectionBlocks: state.selectionBlocks.filter((block) => block.id !== id),
    })),

  updateSelectionBlock: (id, field, value) =>
    set((state) => ({
      selectionBlocks: state.selectionBlocks.map((block) =>
        block.id === id ? { ...block, [field]: value } : block
      ),
    })),

  addTempImage: (file: File) =>
    set((state) => ({
      tempImages: [
        ...state.tempImages,
        {
          file,
          url: URL.createObjectURL(file),
          isDefault: state.tempImages.length === 0, // primeira imagem como default
        },
      ],
    })),

  removeTempImage: (index: number) =>
    set((state) => ({
      tempImages: state.tempImages.filter((_, i) => i !== index),
    })),

  updateImageDefault: (index: number) =>
    set((state) => ({
      tempImages: state.tempImages.map((img, i) => ({
        ...img,
        isDefault: i === index,
      })),
    })),
}));

// Função para formatar os dados da API
function formatRecurrenceData(
  recurrence: AdventureSchedule[]
): SelectionBlock[] {
  const groupedRecurrences = recurrence.reduce(
    (acc, curr) => {
      if (!acc[curr.groupId]) {
        acc[curr.groupId] = {
          hours: [],
          weekly: [],
          monthly: [],
        };
      }

      if (curr.type === "HOUR") {
        const hours = Math.floor(curr.value / 100);
        const minutes = curr.value % 100;
        const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        acc[curr.groupId].hours.push(timeString);
      } else if (curr.type === "WEEKLY") {
        const weekDay = curr.value === 7 ? 0 : curr.value;
        acc[curr.groupId].weekly.push(weekDay.toString());
      } else if (curr.type === "MONTHLY") {
        const today = new Date();
        const date = new Date(
          today.getFullYear(),
          today.getMonth(),
          curr.value
        );
        acc[curr.groupId].monthly.push(date);
      }

      return acc;
    },
    {} as Record<string, { hours: string[]; weekly: string[]; monthly: Date[] }>
  );

  return Object.entries(groupedRecurrences).map(([groupId, data]) => ({
    id: groupId,
    recurrenceWeekly: data.weekly,
    recurrenceHour: data.hours,
    dates: data.monthly,
  }));
}
