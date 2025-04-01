import { api } from "@/libs/api";

export const notificationsService = {
  async listNotifications(params: {
    limit: number;
    skip: number;
    isRead: boolean;
  }) {
    try {
      const response = await api.get("/notifications", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },
};
