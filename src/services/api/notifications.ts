import { api } from '@/libs/api';

export interface Notification {
  color: string;
  createdAt: string;
  fromUserId: any;
  id: string;
  isAdminNotify: boolean;
  isRead: boolean;
  link: string;
  text: string;
  title: string;
  toUserId: string;
  updatedAt: string;
}

export const notificationsService = {
  async listNotifications(params: {
    limit: number;
    skip?: number;
    isRead?: boolean;
  }): Promise<Notification[]> {
    try {
      const response = await api.get('/notifications', {
        params,
      });
      return response.data as Notification[];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async getNotificationById(id: string) {
    try {
      const response = await api.get(`/notifications/${id}`);
      return response.data as Notification;
    } catch (error) {
      console.error('Error fetching notification by ID', error);
      throw error;
    }
  },
};
