import { Notification } from "@/services/api/notifications";
import { create } from "zustand";

interface NotificationStore {
  notifications: Notification[];
  setStoreNotifications: (notifications: Notification[]) => void;
}

const initialState = {
  notifications: [],
};

const useNotifications = create<NotificationStore>()((set) => ({
  ...initialState,
  setStoreNotifications: (notifications) => {
    set(() => ({
      notifications,
    }));
  },
}));

export default useNotifications;
