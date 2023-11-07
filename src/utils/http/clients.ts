import { HttpClient } from "@lib/http-client";

export const privateClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  withCredentials: true,
  requiresAuth: true,
});

export const publicClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  withCredentials: true,
});
