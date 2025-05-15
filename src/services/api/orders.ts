import { api } from "@/libs/api";
import { toast } from "react-toastify";

interface Schedule {
  adventureId: number;
  createdAt: string;
  dateMediasPosted: any;
  datetime: string;
  id: string;
  isAvailable: boolean;
  isCanceled: boolean;
  justificationCancel: string | null;
  qntConfirmedPersons: number;
  qntLimitPersons: number;
  updatedAt: string;
  medias: [
    {
      url: string;
    },
  ];
  _count: {
    medias: number;
  };
}

interface AdventureOrderSummary {
  hoursBeforeSchedule: number;
  hoursBeforeCancellation: number;
  description: string;
  averageRating: number;
  id: number;
  images: [
    {
      url: string;
    },
  ];
  partner: {
    businessEmail: string;
    fantasyName: string;
    logo: {
      url: string;
    };
  };
  title: string;
  typeAdventure: string;
  duration?: string;
}

interface OrderAdventure {
  id: number;
  orderId: string;
  paymentStatus: string;
  totalCost: string;
}

export interface CustomerSchedule {
  adventure: AdventureOrderSummary;
  adventureFinalPrice: string;
  adventureId: number;
  adventureStatus: string;
  b2AdventureValue: string;
  b2Percentage: number;
  createdAt: string;
  id: string;
  orderAdventure: OrderAdventure;
  orderAdventureId: number;
  partnerConfirmed: boolean;
  partnerIsPaid: boolean;
  partnerValue: string;
  personsIsAccounted: boolean;
  qntAdults: number;
  qntBabies: number;
  qntChildren: number;
  schedule: Schedule;
  scheduleId: string;
  taxesPercentage: number;
  totalTaxes: string;
  updatedAt: string;
}

interface ActivityOrder {
  bankSlipUrl: string | null;
  createdAt: string;
  customer: { name: string };
  customerUserId: string;
  discount: string | null;
  dueDate: string;
  id: number;
  installmentCount: number;
  invoiceUrl: string;
  lastDigitsCreditCard: string;
  orderId: string;
  ordersScheduleAdventure: [];
  paymentMethod: string;
  paymentStatus: string;
  pixCode: string | null;
  protocolId: string;
  totalCost: string;
  updatedAt: string;
}

interface ParamsActivityOrder {
  adventureId?: string;
  adventureStatus?: string;
  orderId?: string;
  paymentStatus?: string;
  startDate?: string;
  limit?: number;
  skip?: number;
}

export const ordersAdventuresService = {
  getAll: async (): Promise<ActivityOrder[]> => {
    try {
      const response = await api.get("/ordersAdventures?limit=50");
      return response.data;
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw error;
    }
  },

  createBudget: async (data: any, userIP: string) => {
    try {
      api.defaults.headers.common["x-user-ip"] = userIP;
      const response = await api.post("/ordersAdventures/budget", data);
      return response.data;
    } catch (error) {
      console.error("Error get budget:", error);
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
      api.defaults.headers.common["x-user-ip"] = userIP;
      const response = await api.post("/ordersAdventures", data);
      return response;
    } catch (error) {
      console.error("Error creating order:", error);
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
    scheduleId: string,
    orderScheduleAdventureId: string
  ) => {
    try {
      const response = await api.post(
        `/ordersAdventures/${scheduleId}/orderSchedule/${orderScheduleAdventureId}/confirm`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error confirming schedule for order ID ${scheduleId} and schedule ID ${orderScheduleAdventureId}:`,
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

  getCustomerSchedules: async (
    params?: ParamsActivityOrder
  ): Promise<CustomerSchedule[]> => {
    try {
      const response = await api.get(`/ordersAdventures/orderSchedule`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching customer schedules with startDate ${params?.startDate}:`,
        error
      );
      throw error;
    }
  },

  getCustomerSchedulesById: async (
    id: string
  ): Promise<CustomerSchedule | undefined> => {
    try {
      const response = await api.get(`/ordersAdventures/orderSchedule/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedules by ID: ${id}`, error);
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
      return response;
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
      toast.error("Erro ao cancelar a atividade. Tente novamente mais tarde.");
      throw error;
    }
  },
};
