import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Recurrence {
  recurrenceWeekly?: string; // "1,3,5" (dias da semana: 1-7)
  recurrenceMonthly?: string; // "15,30" (dias do mês: 1-31)
  recurrenceHour: string; // "08:00,13:00,16:00"
}

export interface SelectionBlock {
  id: number;
  recurrenceWeekly: string[];
  recurrenceHour: string[];
  dates: Date[];
}

export type TypeAdventure = "terra" | "ar" | "mar" | "";

interface AdventureState {
  // Dados básicos
  title: string;
  description: string;
  typeAdventure: TypeAdventure;

  // Endereço
  addressStreet: string;
  addressPostalCode: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  coordinates: string;
  pointRefAddress: string;

  // Detalhes
  itemsIncluded: string[];
  duration: string;
  priceAdult: number;
  priceChildren: number;
  transportIncluded: boolean;
  picturesIncluded: boolean;
  personsLimit: number;
  partnerId?: string;
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  difficult: number;

  // Agendamento
  hoursBeforeSchedule: number;
  hoursBeforeCancellation: number;
  isRepeatable: boolean;
  recurrences: Recurrence[];

  selectionBlocks: SelectionBlock[];

  // Imagens temporárias (antes de enviar)
  tempImages: File[];

  // Métodos
  setAdventureData: (data: Partial<AdventureState>) => void;
  addTempImage: (file: File) => void;
  removeTempImage: (index: number) => void;
  clearAdventure: () => void;

  // Métodos para gerenciar os blocos
  setSelectionBlocks: (blocks: SelectionBlock[]) => void;
  addSelectionBlock: () => void;
  removeSelectionBlock: (id: number) => void;
  updateSelectionBlock: (
    id: number,
    field: keyof Omit<SelectionBlock, "id">,
    value: any
  ) => void;
}

const initialState = {
  title: "",
  description: "",
  typeAdventure: "" as const,
  addressStreet: "",
  addressPostalCode: "",
  addressNumber: "",
  addressComplement: "",
  addressNeighborhood: "",
  addressCity: "",
  addressState: "",
  addressCountry: "BR",
  coordinates: "",
  pointRefAddress: "",
  itemsIncluded: [],
  duration: "",
  priceAdult: 0,
  priceChildren: 0,
  transportIncluded: false,
  picturesIncluded: false,
  personsLimit: 0,
  isInGroup: false,
  isChildrenAllowed: false,
  difficult: 1,
  hoursBeforeSchedule: 1,
  hoursBeforeCancellation: 1,
  isRepeatable: false,
  recurrences: [],
  tempImages: [],

  selectionBlocks: [
    {
      id: Date.now(),
      recurrenceWeekly: [],
      recurrenceHour: [],
      dates: [],
    },
  ],
};

export const useAdventureStore = create<AdventureState>()(
  persist(
    (set) => ({
      ...initialState,

      setSelectionBlocks: (blocks) => set({ selectionBlocks: blocks }),

      addSelectionBlock: () =>
        set((state) => ({
          selectionBlocks: [
            ...state.selectionBlocks,
            {
              id: Date.now(),
              recurrenceWeekly: [],
              recurrenceHour: [],
              dates: [],
            },
          ],
        })),

      removeSelectionBlock: (id) =>
        set((state) => ({
          selectionBlocks: state.selectionBlocks.filter(
            (block) => block.id !== id
          ),
        })),

      updateSelectionBlock: (id, field, value) =>
        set((state) => ({
          selectionBlocks: state.selectionBlocks.map((block) =>
            block.id === id ? { ...block, [field]: value } : block
          ),
        })),

      setAdventureData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      addTempImage: (file) =>
        set((state) => ({
          ...state,
          tempImages: [...state.tempImages, file],
        })),

      removeTempImage: (index) =>
        set((state) => ({
          ...state,
          tempImages: state.tempImages.filter((_, i) => i !== index),
        })),

      clearAdventure: () => set(initialState),
    }),

    {
      name: "adventure-storage",
    }
  )
);
