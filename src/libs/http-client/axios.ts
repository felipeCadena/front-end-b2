import axios, { AxiosInstance } from "axios";
import { NEXT_PUBLIC_API_BACKEND_URL } from "@/common/constants/baseUrls";

export default function getAxiosInstance(
  path: string,
  token?: string
): AxiosInstance {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: `${NEXT_PUBLIC_API_BACKEND_URL}/${path}`,
    headers,
  });
}
