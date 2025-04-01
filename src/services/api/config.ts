import { api } from "@/libs/api";

export const configService = {
  async listConfig() {
    try {
      const response = await api.get("/system");
      return response.data;
    } catch (error) {
      console.error("Error fetching config list:", error);
      throw error;
    }
  },

  async getConfigById(id: string) {
    try {
      const response = await api.get(`/system/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching config with id ${id}:`, error);
      throw error;
    }
  },
};
