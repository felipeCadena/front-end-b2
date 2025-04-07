import { api } from '@/libs/api';

export interface Notification {
  id: number;
  title: string;
  timestamp: string;
  duracao: number;
  group: number;
  reason: string;
  read: boolean;
  status: string;
  description: string;
  parceiro: {
    avatar: string;
    nome: string;
  };
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
};
