import { create } from "zustand";
import { persist } from "zustand/middleware";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export interface Recurrence {
  recurrenceWeekly?: string;
  recurrenceHour: string;
}

export interface DateOption {
  datetime: string;
  isAvailable: boolean;
}

export interface SelectionBlock {
  id: number;
  recurrenceWeekly: string[];
  recurrenceHour: string[];
  dates: Date[];
}

export type TypeAdventure = "terra" | "ar" | "mar" | "";

export interface AdventureState {
  title: string;
  description: string;
  typeAdventure: TypeAdventure;

  address: string;
  addressStreet: string;
  addressPostalCode: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  coordinates: { lat: number; lng: number } | null;
  pointRefAddress: string;

  itemsIncluded: string[];
  duration: string;
  priceAdult: string;
  priceChildren: string;
  transportIncluded: boolean;
  picturesIncluded: boolean;
  waterIncluded: boolean;
  foodIncluded: boolean;
  fuelIncluded: boolean;
  personsLimit: number;
  partnerId?: string;
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  difficult: number;

  transportAddress?: string;

  hoursBeforeSchedule: number;
  hoursBeforeCancellation: number;
  isRepeatable: boolean;
  recurrences: Recurrence[];

  availableDates: DateOption[] | null;

  selectionBlocks: SelectionBlock[];

  tempImages: (string | File)[];

  setAdventureData: (data: Partial<AdventureState>) => void;
  addTempImage: (file: File) => void;
  removeTempImage: (index: number) => void;
  clearAdventure: () => void;

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
  coordinates: { lat: 0, lng: 0 },
  pointRefAddress: "",
  itemsIncluded: [],
  duration: "",
  priceAdult: "",
  priceChildren: "",
  transportIncluded: false,
  picturesIncluded: false,
  waterIncluded: false,
  foodIncluded: false,
  fuelIncluded: false,
  personsLimit: 0,
  isInGroup: true,
  isChildrenAllowed: false,
  difficult: 1,
  hoursBeforeSchedule: 1,
  hoursBeforeCancellation: 1,
  isRepeatable: false,
  recurrences: [],
  availableDates: [],
  tempImages: [],
  address: "",
  transportAddress: "",

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

      addTempImage: (file: File) => {
        fileToBase64(file).then((base64) => {
          set((state) => ({
            tempImages: [...state.tempImages, base64],
          }));
        });
      },

      removeTempImage: (index) =>
        set((state) => ({
          ...state,
          tempImages: state.tempImages.filter((_, i) => i !== index),
        })),

      clearAdventure: () => set(initialState),
    }),
    {
      name: "adventure-storage",
      partialize: (state) => {
        const { tempImages, ...rest } = state;
        return rest;
      },
    }
  )
);
