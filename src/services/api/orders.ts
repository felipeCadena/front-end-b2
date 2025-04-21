import { api } from '@/libs/api';

export const ordersAdventuresService = {
  getAll: async () => {
    try {
      const response = await api.get('/ordersAdventures');
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/ordersAdventures/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (data: any, userIP: string) => {
    try {
      api.defaults.headers.common['x-user-ip'] = userIP;
      const response = await api.post('/ordersAdventures', data);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  cancel: async (id: string) => {
    try {
      const response = await api.post(`/ordersAdventures/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling order with ID ${id}:`, error);
      throw error;
    }
  },
  partnerConfirmSchedule: async (
    id: string,
    orderScheduleAdventureId: string
  ) => {
    try {
      const response = await api.post(
        `/ordersAdventures/${id}/orderSchedule/${orderScheduleAdventureId}/confirm`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error confirming schedule for order ID ${id} and schedule ID ${orderScheduleAdventureId}:`,
        error
      );
      throw error;
    }
  },

  getPartnerSchedules: async (startDate: string) => {
    try {
      const response = await api.get(
        `/ordersAdventures/orderSchedule/partner`,
        {
          params: { startDate },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching partner schedules with startDate ${startDate}:`,
        error
      );
      throw error;
    }
  },

  getCustomerSchedules: async (startDate: string) => {
    try {
      const response = await api.get(`/ordersAdventures/orderSchedule`, {
        params: { startDate },
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching customer schedules with startDate ${startDate}:`,
        error
      );
      throw error;
    }
  },

  rateAdventure: async (
    id: string,
    orderScheduleAdventureId: string,
    ratingData: { rating: number; comment: string }
  ) => {
    try {
      const response = await api.post(
        `/ordersAdventures/${id}/orderSchedule/${orderScheduleAdventureId}/rating`,
        ratingData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error rating adventure for order ID ${id} and schedule ID ${orderScheduleAdventureId}:`,
        error
      );
      throw error;
    }
  },

  cancelSchedule: async (id: string, orderScheduleAdventureId: string) => {
    try {
      const response = await api.post(
        `/ordersAdventures/${id}/orderSchedule/${orderScheduleAdventureId}/cancel`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error canceling schedule for order ID ${id} and schedule ID ${orderScheduleAdventureId}:`,
        error
      );
      throw error;
    }
  },
};
