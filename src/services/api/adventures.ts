import { api } from '@/libs/api';
// Removed duplicate Adventure interface declaration

type Media = {
  id: string;
  url: string;
  name: string;
  title: string | null;
  description: string | null;
  mimetype: string;
  adventureId: number;
  scheduleId: number | null;
  index: number | null;
  isDefault: boolean;
  createdAt: string; // ou Date, dependendo de como você lida com datas
  updatedAt: string; // ou Date
  uploadUrl: string;
};

export interface GetAdventuresResponse {
  limit: number;
  skipped: number;
  totalCount: number;
  data: Adventure[];
}

export interface GetAdventuresParams {
  limit?: number;
  skip?: number;
  typeAdventure?: string;
  orderBy?: string;
  [key: string]: any; // For dynamic search parameters
}

export interface AdventureImage {
  id: number;
  adventureId: number;
  name: string;
  mimetype: string;
  title: string;
  isDefault: boolean;
  url: string;
}

export interface AdventurePartner {
  id: number;
  fantasyName: string;
  logo: string;
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
  partnerId?: number;
  partner: AdventurePartner;
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
  images: AdventureImage[];
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
  itemsIncluded: string;
  duration: string;
  priceAdult: number;
  priceChildren: number;
  transportIncluded: boolean;
  picturesIncluded: boolean;
  typeAdventure: 'terra' | 'ar' | 'mar';
  personsLimit: number;
  partnerId?: string;
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  difficult: number;
  hoursBeforeSchedule: number;
  hoursBeforeCancellation: number;
  isRepeatable: boolean;
  recurrences?: {
    recurrenceWeekly?: string; // e.g., "1,3,5"
    recurrenceMonthly?: string; // e.g., "15,30"
    recurrenceHour: string; // e.g., "08:00,13:00,16:00"
  }[];
}

export const adventures = {
  createAdventure: async (body: CreateAdventureBody): Promise<Adventure> => {
    try {
      const { data } = await api.post<Adventure>('/adventures', body);
      return data;
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      throw error;
    }
  },
  getAdventures: async (params?: GetAdventuresParams): Promise<Adventure[]> => {
    try {
      const { data } = await api.get('/adventures', {
        params,
      });
      return data;
    } catch (error) {
      console.error('Erro ao recuperar atividades:', error);
      throw error;
    }
  },
  getAdventureById: async (id: number): Promise<Adventure> => {
    try {
      const { data } = await api.get<Adventure>(`/adventures/${id}`);
      return data;
    } catch (error) {
      console.error('Erro ao recuperar atividade:', error);
      throw error;
    }
  },
  updateAdventureById: async (
    id: number,
    body: Partial<CreateAdventureBody>
  ): Promise<Adventure> => {
    try {
      const { data } = await api.put<Adventure>(`/adventures/${id}`, body);
      return data;
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      throw error;
    }
  },
  deleteAdventureById: async (id: number): Promise<void> => {
    try {
      await api.delete<void>(`/adventures/${id}`);
    } catch (error) {
      console.error('Erro ao recuperar atividade:', error);
      throw error;
    }
  },
  filterAdventures: async (
    params: GetAdventuresParams
  ): Promise<GetAdventuresResponse> => {
    try {
      const response = await api.get<GetAdventuresResponse>(
        '/adventures/filter',
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error filtering adventures:', error);
      throw error;
    }
  },
  // Favorites
  addFavorite: async (id: number): Promise<void> => {
    try {
      await api.post<void>(`/adventures/${id}/favorite`);
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      throw error;
    }
  },
  removeFavorite: async (id: number, favoriteId: number): Promise<void> => {
    try {
      await api.post<void>(`/adventures/${id}/favorite/${favoriteId}/remove`);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      throw error;
    }
  },
  listFavorites: async (): Promise<Adventure[]> => {
    try {
      const { data } = await api.get<Adventure[]>('/adventures/favorites');
      return data;
    } catch (error) {
      console.error('Erro ao listar favoritos:', error);
      throw error;
    }
  },
  // Medias
  addMedia: async (
    id: number,
    files: Array<{
      filename: string;
      mimetype: string;
      title?: string;
      description?: string;
      isDefault?: boolean;
    }>
  ): Promise<Media[]> => {
    try {
      const response = await api.post<Media[]>(`/adventures/${id}/media`, {
        files,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar mídia:', error);
      throw error;
    }
  },
  updateMedia: async (
    id: number,
    mediaID: number,
    body: {
      name: string;
      mimetype: string;
      title: string;
      description: string;
      isDefault: boolean;
    },
    updateBinary: boolean = false
  ): Promise<void> => {
    try {
      await api.put<void>(`/adventures/${id}/media/${mediaID}`, body, {
        params: { updateBinary },
      });
    } catch (error) {
      console.error('Erro ao atualizar mídia:', error);
      throw error;
    }
  },
  deleteMedia: async (id: number, mediaID: number): Promise<void> => {
    try {
      await api.delete<void>(`/adventures/${id}/media/${mediaID}`);
    } catch (error) {
      console.error('Erro ao deletar mídia:', error);
      throw error;
    }
  },
  listMedias: async (id: number): Promise<any[]> => {
    try {
      const { data } = await api.get<any[]>(`/adventures/${id}/medias`);
      return data;
    } catch (error) {
      console.error('Erro ao listar mídias:', error);
      throw error;
    }
  },
};
