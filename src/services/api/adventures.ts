import { api } from '@/libs/api';
import axios from '@/libs/http-client/axios';
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
  id: string;
  adventureId: number;
  name: string;
  mimetype: string;
  title: string;
  isDefault: boolean;
  url: string;
}

export interface FavoriteAdventure {
  id: string;
  adventure: Adventure;
}

export interface AdventurePartner {
  id: number;
  fantasyName: string;
  logo: string;
}

export interface AdventureSchedule {
  id: string;
  adventureId: number;
  type: string;
  value: number;
  groupId: string;
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
  typeAdventure: 'ar' | 'terra' | 'mar' | '';
  averageRating: number;
  qntRatings: number;
  sumTotalRatings: number;
  personsLimit: number;
  partnerId?: number;
  partner: AdventurePartner;
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  difficult: number;
  hoursBeforeSchedule: number;
  hoursBeforeCancellation: number;
  onSite: boolean;
  adminApproved: boolean;
  suspend: boolean;
  hour: number;
  recurrence: AdventureSchedule[];
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
  priceAdult: string;
  priceChildren: string;
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
  createAdventureWithToken: async (
    body: CreateAdventureBody,
    token: string
  ): Promise<Adventure> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/adventures`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      if (!data.ok) {
        console.error('Erro ao criar atividade');
      }

      return data;
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      throw error;
    }
  },
  getAdventures: async (params?: GetAdventuresParams): Promise<Adventure[]> => {
    try {
      const { data } = await api.get<Adventure[]>(`/adventures`);

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
      const { data } = await api.patch<Adventure>(`/adventures/${id}`, body);
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
  ): Promise<Adventure[]> => {
    try {
      const { data } = await api.get<GetAdventuresResponse>(
        '/adventures/filter',
        {
          params,
        }
      );
      return data.data;
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
  removeFavorite: async (id: string, favoriteId: string): Promise<void> => {
    try {
      await api.post<void>(`/adventures/${id}/favorite/${favoriteId}/remove`);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      throw error;
    }
  },
  listFavorites: async (): Promise<FavoriteAdventure[]> => {
    try {
      const { data } = await api.get<FavoriteAdventure[]>(
        '/adventures/favorites'
      );
      return data;
    } catch (error) {
      console.error('Erro ao listar favoritos:', error);
      throw error;
    }
  },
  // Medias
  addMedia: async (
    id: string,
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
  addMediaWithToken: async (
    id: string,
    files: Array<{
      filename: string;
      mimetype: string;
      title?: string;
      description?: string;
      isDefault?: boolean;
    }>,
    token: string
  ): Promise<Media[]> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/adventures/${id}/media`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            files,
          }),
        }
      );
      const data = await response.json();
      if (!data.ok) {
        console.error('Erro ao adicionar mídia');
      }

      return data;
    } catch (error) {
      console.error('Erro ao adicionar mídia:', error);
      throw error;
    }
  },
  updateMedia: async (
    id: string,
    mediaID: string,
    body: {
      name?: string;
      mimetype: string;
      title?: string;
      description?: string;
      isDefault?: boolean;
      file: Blob | Buffer;
    }
    // updateBinary: boolean = false
  ): Promise<any> => {
    try {
      const response = await api.patch<any>(
        `/adventures/${id}/media/${mediaID}?updateBinary=true`,
        {
          mimetype: body.mimetype,
        }
      );

      await fetch(response.data.uploadUrl, {
        method: 'PUT',
        body: body.file,
        headers: {
          'Content-Type': body.mimetype,
        },
      }).then((res) => {
        if (!res.ok) {
          console.log('Failed to upload media', res);
        }
        return res;
      });
      console.log(response);
      return response.data.url;
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
