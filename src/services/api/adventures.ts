import axios from "axios";

export interface Adventure {
  id: number;
  title: string;
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
  description: string;
  itemsIncluded: string[];
  duration: string;
  priceAdult: string;
  priceChildren: string;
  transportIncluded: boolean;
  picturesIncluded: boolean;
  typeAdventure: string;
  averageRating: number;
  qntRatings: number;
  sumTotalRatings: number;
  personsLimit: number;
  partnerId: number;
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  difficult: number;
  daysBeforeSchedule: number;
  daysBeforeCancellation: number;
  onSite: boolean;
  adminApproved: boolean;
  suspend: boolean;
  hour: number;
  isRepeatable: boolean;
  totalFavorites: number;
  createdAt: string;
  updatedAt: string;
  images: any[];
}

export interface GetAdventuresParams {
  limit?: number;
  skip?: number;
  typeAdventure?: string;
  [key: string]: any; // For dynamic search parameters
}

export interface Adventure {
  id: number;
  title: string;
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
  description: string;
  itemsIncluded: string[];
  duration: string;
  priceAdult: string;
  priceChildren: string;
  transportIncluded: boolean;
  picturesIncluded: boolean;
  typeAdventure: string;
  averageRating: number;
  qntRatings: number;
  sumTotalRatings: number;
  personsLimit: number;
  partnerId: number;
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  difficult: number;
  daysBeforeSchedule: number;
  daysBeforeCancellation: number;
  onSite: boolean;
  adminApproved: boolean;
  suspend: boolean;
  hour: number;
  isRepeatable: boolean;
  totalFavorites: number;
  createdAt: string;
  updatedAt: string;
  images: any[];
}

export interface CreateAdventureBody {
  title: string;
  addressStreet: string;
  addressPostalCode: string;
  addressNumber: string;
  addressComplement?: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  coordinates: string;
  pointRefAddress: string;
  description: string;
  itemsIncluded: string[];
  duration: string;
  priceAdult: number;
  priceChildren: number;
  transportIncluded: boolean;
  picturesIncluded: boolean;
  typeAdventure: "terra" | "ar" | "mar";
  personsLimit: number;
  partnerId?: string;
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  difficult: 1 | 2 | 3 | 4 | 5;
  daysBeforeSchedule: number;
  daysBeforeCancellation: number;
  isRepeatable: boolean;
  recurrences?: {
    recurrenceWeekly?: string; // e.g., "1,3,5"
    recurrenceMonthly?: string; // e.g., "15,30"
    recurrenceHour: string; // e.g., "08:00,13:00,16:00"
  }[];
}

export const createAdventure = async (
  body: CreateAdventureBody
): Promise<Adventure> => {
  try {
    const { data } = await axios.post<Adventure>("/adventures", body);
    return data;
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
    throw error;
  }
};

export const getAdventures = async (
  params: GetAdventuresParams
): Promise<Adventure[]> => {
  try {
    const { data } = await axios.get<Adventure[]>("/adventures", { params });
    return data;
  } catch (error) {
    console.error("Erro ao recuperar atividades:", error);
    throw error;
  }
};

export const getAdventureById = async (id: number): Promise<Adventure> => {
  try {
    const { data } = await axios.get<Adventure>(`/adventures/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao recuperar atividade:", error);
    throw error;
  }
};

export const updateAdventureById = async (
  id: number,
  body: Partial<CreateAdventureBody>
): Promise<Adventure> => {
  try {
    const { data } = await axios.put<Adventure>(`/adventures/${id}`, body);
    return data;
  } catch (error) {
    console.error("Erro ao atualizar atividade:", error);
    throw error;
  }
};

export const deleteAdventureById = async (id: number): Promise<void> => {
  try {
    await axios.delete<void>(`/adventures/${id}`);
  } catch (error) {
    console.error("Erro ao recuperar atividade:", error);
    throw error;
  }
};

export const filterAdventures = async (
  params: GetAdventuresParams
): Promise<Adventure[]> => {
  try {
    const { data } = await axios.get<Adventure[]>("/adventures/filter", {
      params,
    });
    return data;
  } catch (error) {
    console.error("Error filtering adventures:", error);
    throw error;
  }
};
