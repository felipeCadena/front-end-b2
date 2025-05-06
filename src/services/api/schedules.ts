import { api } from '@/libs/api';

export type Media = {
  id: string;
  url: string;
  name: string;
  title: string | null;
  description: string | null;
  mimetype: string;
  adventureId: number;
  scheduleId: string;
  index: number | null;
  isDefault: boolean;
  createdAt: string; // ou Date, dependendo de como você lida com datas
  updatedAt: string; // ou Date
  uploadUrl: string;
};

export const schedules = {
  getSchedules: async (params?: {
    isAvailable?: boolean;
    isCanceled?: boolean;
    startDate?: string;
    endDate?: string;
    limit?: number;
    skip?: number;
  }) => {
    try {
      const response = await api.get('/schedules', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  },

  getScheduleById: async (id: string) => {
    try {
      const response = await api.get(`/schedules/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedule with id ${id}:`, error);
      throw error;
    }
  },

  getScheduleMedias: async (id: string): Promise<Media[]> => {
    try {
      const response = await api.get(`/schedules/${id}/medias`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching medias for schedule with id ${id}:`, error);
      throw error;
    }
  },

  // Medias
  postScheduleMedias: async (
    scheduleId: string,
    files: Array<{
      filename: string;
      mimetype: string;
      title: string;
      description: string;
      isDefault: boolean;
      file: Blob | Buffer;
    }>
  ) => {
    try {
      const { data } = await api.post<Media[]>(
        `/schedules/${scheduleId}/media`,
        {
          files,
        }
      );

      console.log(data);

      await Promise.all(
        data.map(async (uploadData, index) => {
          const file = files[index];
          const res = await fetch(uploadData.uploadUrl, {
            method: 'PUT',
            body: file.file,
            headers: {
              'Content-Type': file.mimetype,
            },
          });

          if (!res.ok) {
            console.error('Failed to upload media', res);
            throw new Error(`Failed to upload file ${file.filename}`);
          }
        })
      );

      return data;
    } catch (error) {
      console.error(
        `Error posting medias for schedule with id ${scheduleId}:`,
        error
      );
      throw error;
    }
  },

  updateScheduleMedia: async (
    id: string,
    mediaID: string,
    updateBinary: boolean,
    body: {
      name?: string;
      mimetype: string;
      title?: string;
      description?: string;
      isDefault?: boolean;
      file: Blob | Buffer;
    }
  ) => {
    try {
      const response = await api.patch(
        `/schedules/${id}/media/${mediaID}?updateBinary=true`,
        {
          mimetype: body.mimetype,
        }
      );
      await fetch(response.data.uploadUrl, {
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

      return response.data;
    } catch (error) {
      console.error(
        `Error updating media with id ${mediaID} for schedule with id ${id}:`,
        error
      );
      throw error;
    }
  },

  deleteScheduleMedia: async (id: string, mediaID: string) => {
    try {
      const response = await api.delete(`/schedules/${id}/media/${mediaID}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting media with id ${mediaID} for schedule with id ${id}:`,
        error
      );
      throw error;
    }
  },

  listScheduleMedias: async (id: string) => {
    try {
      const response = await api.get<Media[]>(`/schedules/${id}/medias`);
      return response.data;
    } catch (error) {
      console.error(`Error listing medias for schedule with id ${id}:`, error);
      throw error;
    }
  },
};
