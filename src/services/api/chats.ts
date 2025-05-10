import { api } from "@/libs/api";

interface ChatMessage {
  datetime: string;
  chatId: string;
  text: string;
  mediaId: string | null;
  sendedFromUserId: string;
  toUserId: string;
  isRead: boolean;
}

interface ChatType {
  id: string;
  openIn: string | null;
  closeIn: string | null;
  type: "admin" | string; // substitua por outros tipos possíveis se houver
  orderAdventureId: string | null;
  userToId: string;
  userToName: string;
  userToPhoto: string;
  session_token: string;
  lastMessage?: ChatMessage | null;
  userToLastOnline?: string;
  orderScheduleAdventure?: any | null; // substitua "any" pela tipagem correta se souber
}

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

  sendMessage: async (
    id: string,
    body: { text: string },
    session_token: string
  ) => {
    try {
      api.defaults.headers.common["session_token"] = session_token;
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
    file: Blob | Buffer,
    session_token: string,
    body: { text: string; media: { mimetype: string; filename: string } }
  ) => {
    try {
      api.defaults.headers.common["session_token"] = session_token;

      const response = await api.post(`/chats/${id}/send-media`, body);

      await fetch(response.data.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": body.media.mimetype,
        },
      }).then((res) => {
        if (!res.ok) {
          console.log("Failed to upload media", res);
        }
        return res;
      });

      return response.data;
    } catch (error) {
      console.error("Error sending media:", error);
      throw error;
    }
  },

  listMessages: async (
    id: string,
    session_token: string,
    params?: { orderBy?: string; datetime?: string }
  ) => {
    try {
      api.defaults.headers.common["session_token"] = session_token;
      const response = await api.get(`/chats/${id}/messages`, { params });
      return response.data;
    } catch (error) {
      console.error("Error listing messages:", error);
      throw error;
    }
  },
};
