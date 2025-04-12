import { Notification } from '@/services/api/notifications';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

interface NotificationStore {
  notifications: Notification[];
  setStoreNotifications: (notifications: Notification[]) => void;
}

const initialState = {
  notifications: [],
};

const useNotifications = create<NotificationStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStoreNotifications: (notifications) => {
        set(() => ({
          notifications,
        }));
      },
    }),
    { name: 'notifications-storage' }
  )
);

export default useNotifications;
