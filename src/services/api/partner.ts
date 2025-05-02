import { api } from "@/libs/api";
import {
  AddToCartAdventure,
  Adventure,
  GetAdventuresParams,
  GetAdventuresResponse,
  Schedules,
} from "./adventures";
import { clearObject } from "@/utils/clear-object";
import { DateOption } from "@/store/useAdventureStore";

export interface CreatePartner {
  companyName: string;
  fantasyName: string;
  businessEmail: string;
  businessPhone: string;
  cnpj: string;
  userId?: string;
  user?: {
    name: string;
    email: string;
    password: string;
    cpf?: string | null;
    phone: string;
  };
  bankAccount: string | null;
  bankAgency: string | null;
  bankName: string | null;
  pixKey: string | null;
  about: string | null;
  payday: number | null;
  address: string | null;
}

export interface Partner {
  id: number;
  companyName: string;
  fantasyName: string;
  businessEmail: string;
  businessPhone: string;
  cnpj: string;
  userId: string;
  adminApproved: boolean;
  bankAccount: string | null;
  bankAgency: string | null;
  bankName: string | null;
  pixKey: string | null;
  about: string | null;
  payday: number | null;
  isActive: boolean;
  logoMediaId: string;
  languages: string | null;
  averageRating: number;
  qntRatings: number;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  sumTotalRatings: number;
  createdAt: string;
  updatedAt: string;
  logo?: {
    id: string;
    url: string;
    name: string;
    title: string;
    description: string;
    mimetype: string;
    adventureId: string | null;
    scheduleId: string | null;
    index: number | null;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UploadImage {
  filename?: string;
  mimetype: string;
  title?: string;
  description?: string;
  isDefault?: boolean;
}

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

export interface MySchedule {
  data: Schedules[];
  totalCount: number;
  limit: number;
  skipped: number;
  startDate: string;
  endDate: string;
}

export interface MyScheduleParams {
  adventureId?: number;
  adventureStatus?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export const partnerService = {
  getPartnerLogged: async (): Promise<Partner | null> => {
    try {
      const response = await api.get<Partner>("/partners");
      return response.data;
    } catch (error) {
      console.error("Error fetching partner:", error);
      return null;
    }
  },

  createPartner: async (partner: CreatePartner): Promise<Partner | null> => {
    try {
      const response = await api.post<Partner>("/partners", partner);
      return response.data;
    } catch (error) {
      console.error("Error creating partner:", error);
      return null;
    }
  },

  updatePartner: async (
    id: number,
    partner: Partial<Partner>
  ): Promise<Partner | null> => {
    try {
      const response = await api.patch<Partner>(`/partners/${id}`, partner);
      return response.data;
    } catch (error) {
      console.error("Error updating partner:", error);
      return null;
    }
  },
  addPartnerLogo: async (body: {
    name?: string;
    mimetype: string;
    title?: string;
    description?: string;
    isDefault?: boolean;
    file: Blob | Buffer;
  }): Promise<any> => {
    try {
      const response = await api.post<Media>(`/partners/media`, body);

      await fetch(response.data.uploadUrl, {
        method: "PUT",
        body: body.file,
        headers: {
          "Content-Type": body.mimetype,
        },
      }).then((res) => {
        if (!res.ok) {
          console.log("Failed to upload media", res);
        }
        return res;
      });

      return response.data.url;
    } catch (error) {
      console.error("Erro ao adicionar mídia:", error);
      throw error;
    }
  },
  addMedia: async (partnerId: number, media: FormData): Promise<boolean> => {
    try {
      await api.post(`/partners/${partnerId}/media`, media, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (error) {
      console.error("Error adding media to partner:", error);
      return false;
    }
  },

  deleteMedia: async (partnerId: number, mediaId: string): Promise<boolean> => {
    try {
      await api.delete(`/partners/${partnerId}/media/${mediaId}`);
      return true;
    } catch (error) {
      console.error("Error deleting media from partner:", error);
      return false;
    }
  },

  // Schedules
  createSchedule: async (
    adventureId: number,
    schedule: DateOption
  ): Promise<any> => {
    try {
      await api.post(`/schedules/adventure/${adventureId}`, schedule);
      return true;
    } catch (error) {
      console.error("Error creating schedule:", error);
      return false;
    }
  },

  createMoreSchedule: async (
    adventureId: number,
    schedule: DateOption[]
  ): Promise<any> => {
    try {
      await api.post(`/schedules/adventure/${adventureId}`, schedule);
      return true;
    } catch (error) {
      console.error("Error creating schedule:", error);
      return false;
    }
  },

  getMySchedules: async (
    params?: GetAdventuresParams
  ): Promise<MySchedule | null> => {
    try {
      const { data } = await api.get<MySchedule>(`/schedules/partner`, {
        params,
      });
      return data;
    } catch (error) {
      console.error("Error fetching adventures:", error);
      return null;
    }
  },

  async getOrderSchedulesById(
    id: string,
    params?: {
      startDate?: string;
      adventureStatus?: string;
    }
  ) {
    try {
      const response = await api.get(`/ordersAdventures/orderSchedule/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error listing partner schedules:", error);
      throw error;
    }
  },

  async listPartnerSchedules(params?: MyScheduleParams) {
    try {
      const response = await api.get(
        `/ordersAdventures/orderSchedule/partner`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error listing partner schedules:", error);
      throw error;
    }
  },

  cancelSchedule: async (
    orderScheduleId: string,
    adventureId: string,
    justification: string
  ): Promise<any> => {
    try {
      await api.post(
        `/schedules/cancel/${orderScheduleId}/adventure/${adventureId}`,
        { justificationCancel: justification }
      );
      return true;
    } catch (error) {
      console.error("Error canceling schedule:", error);
      return false;
    }
  },

  // Payment
  getIncome: async (
    partnerId: number,
    startsAt: string,
    endsAt: string
  ): Promise<number | null> => {
    try {
      const response = await api.get<{ income: number }>(
        `/admin/partner/income`,
        {
          params: {
            partnerId,
            startsAt,
            endsAt,
          },
        }
      );
      return response.data.income;
    } catch (error) {
      console.error("Error fetching partner income:", error);
      return null;
    }
  },

  // Adventures
  getMyAdventures: async (
    params?: GetAdventuresParams
  ): Promise<Adventure[] | null> => {
    try {
      const { data } = await api.get<Adventure[]>(`/adventures/my-adventures`, {
        params,
      });
      return data;
    } catch (error) {
      console.error("Error fetching adventures:", error);
      return null;
    }
  },
};
