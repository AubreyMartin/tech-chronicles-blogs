import { apiClient } from "./client";

export async function fetchAdmins() {
  const response = await apiClient.get("/admins");
  return response.data;
}
