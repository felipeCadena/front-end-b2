import { api } from "@/libs/api";

export const schedules = {
  getSchedules: async (params?: {
    isAvailable?: boolean;
    isCanceled?: boolean;
    startDate?: string;
    endDate?: string;
    limit?: number;
    skip?: number;
  }) => {
    try {
      const response = await api.get("/schedules", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      throw error;
    }
  },

  getScheduleById: async (id: string) => {
    try {
      const response = await api.get(`/schedules/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedule with id ${id}:`, error);
      throw error;
    }
  },

  getScheduleMedias: async (id: string) => {
    try {
      const response = await api.get(`/schedules/${id}/medias`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medias for schedule with id ${id}:`, error);
      throw error;
    }
  },

  // Medias
  postScheduleMedias: async (
    id: string,
    adventureId: string,
    files: Array<{
      filename: string;
      mimetype: string;
      title: string;
      description: string;
      isDefault: boolean;
    }>
  ) => {
    try {
      const response = await api.post(
        `/schedules/cancel/${id}/adventure/${adventureId}`,
        { files }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error posting medias for schedule with id ${id} and adventureId ${adventureId}:`,
        error
      );
      throw error;
    }
  },

  updateScheduleMedia: async (
    id: string,
    mediaID: string,
    updateBinary: boolean,
    body: {
      name: string;
      mimetype: string;
      title: string;
      description: string;
      isDefault: boolean;
    }
  ) => {
    try {
      const response = await api.put(`/schedule/${id}/media/${mediaID}`, body, {
        params: { updateBinary },
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error updating media with id ${mediaID} for schedule with id ${id}:`,
        error
      );
      throw error;
    }
  },

  deleteScheduleMedia: async (id: string, mediaID: string) => {
    try {
      const response = await api.delete(`/schedule/${id}/media/${mediaID}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting media with id ${mediaID} for schedule with id ${id}:`,
        error
      );
      throw error;
    }
  },

  listScheduleMedias: async (id: string) => {
    try {
      const response = await api.get(`/schedule/${id}/medias`);
      return response.data;
    } catch (error) {
      console.error(`Error listing medias for schedule with id ${id}:`, error);
      throw error;
    }
  },
};
