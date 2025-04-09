import {
  Notification,
  notificationsService,
} from "@/services/api/notifications";
import { create } from "zustand";

interface NotificationStore {
  notifications: Notification[];
  unreadNotifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

const useNotifications = create<NotificationStore>((set) => {
  const initializeNotifications = async () => {
    const allNotifications = await notificationsService.listNotifications({
      limit: 30,
    });

    const unreadNotifications = await notificationsService.listNotifications({
      limit: 30,
      isRead: false,
    });
    set({ notifications: allNotifications, unreadNotifications });
  };

  // Initialize notifications when the store is created
  // initializeNotifications();

  return {
    notifications: [],
    unreadNotifications: [],
    setNotifications: (notifications: Notification[]) => set({ notifications }),
  };
});

export default useNotifications;
