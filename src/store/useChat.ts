import { create } from "zustand";

type Chat = {
  userToName: string;
  id: string;
  session_token: string;
  userToPhoto: string;
  userToId: string;
};

interface ChatStore {
  chat: Chat;
  setChat: (chat: Chat) => void;
}

const useChat = create<ChatStore>((set, get) => ({
  chat: {
    userToName: "",
    id: "",
    session_token: "",
    userToPhoto: "",
    userToId: "",
  },
  setChat: (chat: Chat) => set({ chat }),
}));

export default useChat;
