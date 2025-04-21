import { api } from '@/libs/api';
import axios from 'axios';

export type LoggedUser = {
  cpf: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  photo: {
    mimetype: string;
    url: string;
  };
  role: string;
};

export const users = {
  getUserLogged: async (): Promise<LoggedUser> => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  updatePassword: async (body: { password: string }) => {
    try {
      const response = await api.patch('/users', body);
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },
  registerCustomer: async (body: {
    email: string;
    name: string;
    password: string;
    cpf: string;
    phone: string;
  }) => {
    try {
      const response = await api.post('/users/customer', body);
      return response.data;
    } catch (error) {
      console.error('Error registering customer:', error);
      throw error;
    }
  },
  uploadMedia: async (body: { mimetype: string; file: Buffer | Blob }) => {
    try {
      const response = await api.post(
        '/users/media',
        { mimetype: body.mimetype },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { url } = await fetch(response.data.uploadUrl, {
        method: 'PUT',
        body: body.file,
        headers: {
          'Content-Type': body.mimetype,
        },
      }).then((res) => {
        if (!res.ok) {
          console.log('Failed to upload media', res);
        }
        return res;
      });
      console.log(url);
      return url;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  },
  deleteMedia: async (mediaId: string) => {
    try {
      const response = await api.delete(`/users/media/${mediaId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  },
  getIP: async () => {
    try {
      const { data } = await axios.get('https://api.ipify.org?format=json');

      return data.ip;
    } catch (error) {
      console.error('Failed to fetch IP address', error);
      throw error;
    }
  },
};
