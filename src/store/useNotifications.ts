import {
  Notification,
  notificationsService,
} from '@/services/api/notifications';

import { create } from 'zustand';

// Encontrando problema ao utilizar o hook. Ao utilizar o hook, a store é criada fazendo um request para a API, mas se o usuário não possuir conta, gera um erro unauthorized.
// Por conta disso, o hook está criado, mas não utilizado.

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
  initializeNotifications();

  return {
    notifications: [],
    unreadNotifications: [],
    setNotifications: (notifications: Notification[]) => set({ notifications }),
  };
});

export default useNotifications;
