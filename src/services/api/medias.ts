import { api } from "@/libs/api";

export type MediaType = {
  name: string;
  mimetype: string;
  title: string;
  description: string;
  url: string;
  isDefault: boolean;
};

export const MediaService = {
  async create(media: MediaType) {
    try {
      const response = await api.post("/medias", media);
      return response.data;
    } catch (error) {
      console.error("Error creating media:", error);
      throw error;
    }
  },

  async delete(mediaId: string) {
    try {
      const response = await api.delete(`/medias/${mediaId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting media:", error);
      throw error;
    }
  },

  async search(query: string) {
    try {
      const response = await api.get(`/medias`, { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error("Error searching media:", error);
      throw error;
    }
  },

  async getById(mediaId: string) {
    try {
      const response = await api.get(`/medias/${mediaId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching media by ID:", error);
      throw error;
    }
  },

  async update(mediaId: string, media: MediaType) {
    try {
      const response = await api.patch(`/medias/${mediaId}`, media);
      return response.data;
    } catch (error) {
      console.error("Error updating media:", error);
      throw error;
    }
  },
};
