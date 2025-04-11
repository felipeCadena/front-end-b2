import { api } from '@/libs/api';

export const sendMessage = {
  talkToUs: async (data: any) => {
    try {
      const response = await api.post('/system/fale-conosco', data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },
};
