import { api } from "@/libs/api";
import { Adventure, GetAdventuresParams } from "./adventures";

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
}

export const adminService = {
  //Partners
  async searchPartners(params?: { includePhoto?: string; orderBy?: string }) {
    try {
      const response = await api.get("/partners/search", { params });
      return response.data;
    } catch (error) {
      console.error("Error searching partners:", error);
      throw error;
    }
  },

  async updatePartner(id: string, data: Partner) {
    try {
      const response = await api.patch(`/partners/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating partner:", error);
      throw error;
    }
  },

  async deletePartner(id: string) {
    try {
      const response = await api.delete(`/partners/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting partner:", error);
      throw error;
    }
  },

  async getPartnerById(id: string) {
    try {
      const response = await api.get(`/partners/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching partner by ID:", error);
      throw error;
    }
  },
  async listPartnerSchedules(id: string, params: { startDate: string }) {
    try {
      const response = await api.get(
        `/ordersAdventures/orderSchedule/partner/${id}`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error listing partner schedules:", error);
      throw error;
    }
  },
  // Users
  getUserById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },
  createUser: async (userData: Record<string, any>) => {
    try {
      const response = await api.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  updateUser: async (id: string, userData: Record<string, any>) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },
  deleteUser: async (id: string) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },
  // Adventures
  approveOrRejectAdventure: async (
    id: number,
    payload: { adminApproved: boolean; onSite: boolean }
  ): Promise<Adventure> => {
    try {
      const { data } = await api.patch<Adventure>(`/adventures/${id}`, payload);
      return data;
    } catch (error) {
      console.error("Erro ao aprovar ou rejeitar atividade:", error);
      throw error;
    }
  },
  searchAdventures: async (
    params: GetAdventuresParams
  ): Promise<Adventure[]> => {
    try {
      const { data } = await api.get<Adventure[]>("/adventures/search", {
        params,
      });
      return data;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      throw error;
    }
  },

  // Notifications
  async listNotifications(params: { isRead: boolean }) {
    try {
      const response = await api.get("/notifications/admin", { params });
      return response.data;
    } catch (error) {
      console.error("Error listing notifications:", error);
      throw error;
    }
  },

  // Chat
  async createChat(data: { userToId: string }) {
    try {
      const response = await api.post("/chats/new", data);
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  },

  // Config
  async createConfig(data: {
    type: "imgSystem" | "justificativa" | "textSystem" | "timeAdventures";
    name?: string;
    text?: string;
    localInsert: string;
    media?: {
      mimetype: string;
      filename: string;
    };
  }) {
    try {
      const response = await api.post("/system", data);
      return response.data;
    } catch (error) {
      console.error("Error creating config:", error);
      throw error;
    }
  },

  async updateConfig(
    id: string,
    data: {
      type: "imgSystem" | "justificativa" | "textSystem" | "timeAdventures";
      name?: string;
      text?: string;
      localInsert: string;
    }
  ) {
    try {
      const response = await api.patch(`/system/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating config:", error);
      throw error;
    }
  },

  async updateMediaConfig(
    id: string,
    media: {
      mimetype: string;
      filename: string;
    }
  ) {
    try {
      const response = await api.put(`/system/${id}/media`, media);
      return response.data;
    } catch (error) {
      console.error("Error updating media config:", error);
      throw error;
    }
  },

  async deleteConfig(id: string) {
    try {
      const response = await api.delete(`/system/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting config:", error);
      throw error;
    }
  },

  // Payments
  async listPendingPaidPartners(params?: {
    startsAt?: string;
    endsAt?: string;
    partnerIsPaid?: boolean;
  }) {
    try {
      const response = await api.get("/admin/partners/orders", { params });
      return response.data;
    } catch (error) {
      console.error("Error listing pending paid partners:", error);
      throw error;
    }
  },

  async updatePaidPartnersStatus(ids: string[]) {
    try {
      const response = await api.post("/admin/partners/paid-status", { ids });
      return response.data;
    } catch (error) {
      console.error("Error updating paid partners status:", error);
      throw error;
    }
  },

  async getPartnerIncome(
    partnerId: string,
    params: { startsAt: string; endsAt: string }
  ) {
    try {
      const response = await api.get(`/admin/partner/income/${partnerId}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching partner income:", error);
      throw error;
    }
  },

  async getB2Income(params: { startsAt: string; endsAt: string }) {
    try {
      const response = await api.get("/admin/b2/income", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching B2 income:", error);
      throw error;
    }
  },
};
