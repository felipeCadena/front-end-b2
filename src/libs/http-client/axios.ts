import axios, { type AxiosInstance } from "axios";
import { NEXT_PUBLIC_API_BACKEND_URL } from "@/common/constants/baseUrls";

const config = {
  baseURL: NEXT_PUBLIC_API_BACKEND_URL,
  headers: {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,multipart/form-data",
    "Access-Control-Allow-Methods": "GET,PATCH,POST,DELETE,OPTIONS",
  },
};

export default (path: string, headers?: any): AxiosInstance =>
  axios.create({
    ...config,
    baseURL: `${config.baseURL}/${path}`,
    headers: {
      common: headers,
    },
  });
