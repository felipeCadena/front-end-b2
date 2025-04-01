import { api } from "@/libs/api";

export const chatService = {
  getMyChats: async (params?: Record<string, any>) => {
    try {
      const response = await api.get("/chats/my-chats", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  },

  sendMessage: async (id: string, body: { text: string }) => {
    try {
      const response = await api.post(`/chats/${id}/send-message`, body);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  deleteChat: async (id: string) => {
    try {
      const response = await api.delete(`/chats/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  },

  sendMedia: async (
    id: string,
    body: { text: string; media: { mimetype: string; filename: string } }
  ) => {
    try {
      const response = await api.post(`/chats/${id}/send-media`, body);
      return response.data;
    } catch (error) {
      console.error("Error sending media:", error);
      throw error;
    }
  },

  listMessages: async (id: string) => {
    try {
      const response = await api.get(`/chats/${id}/messages`);
      return response.data;
    } catch (error) {
      console.error("Error listing messages:", error);
      throw error;
    }
  },
};
