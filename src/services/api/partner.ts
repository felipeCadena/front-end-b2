import { api } from "@/libs/api";

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
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  about: string | null;
  address: string | null;
  payday: string | null;
  isActive: boolean;
  logoMediaId: string;
  averageRating: number;
  qntRatings: number;
  sumTotalRatings: number;
  languages: string | null;
  createdAt: string;
  updatedAt: string;
  logo: {
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

export const partnerService = {
  get: async (): Promise<Partner | null> => {
    try {
      const response = await api.get<Partner>("/partners");
      return response.data;
    } catch (error) {
      console.error("Error fetching partner:", error);
      return null;
    }
  },

  create: async (partner: Partial<Partner>): Promise<Partner | null> => {
    try {
      const response = await api.post<Partner>("/partners", partner);
      return response.data;
    } catch (error) {
      console.error("Error creating partner:", error);
      return null;
    }
  },

  update: async (
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
    schedule: { datetime: string; isAvailable: boolean }
  ): Promise<boolean> => {
    try {
      await api.post(`/schedules/adventure/${adventureId}`, schedule);
      return true;
    } catch (error) {
      console.error("Error creating schedule:", error);
      return false;
    }
  },

  cancelSchedule: async (id: number, adventureId: number): Promise<boolean> => {
    try {
      await api.post(`/schedules/cancel/${id}/adventure/${adventureId}`);
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
};
