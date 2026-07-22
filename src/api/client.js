import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE,
});

export function hasRemoteApi() {
  return Boolean(API_BASE);
}
