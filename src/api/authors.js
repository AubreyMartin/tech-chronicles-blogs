import { apiClient } from "./client";

export async function fetchAuthors() {
  const response = await apiClient.get("/authors");
  return response.data;
}

export async function createAuthor(author) {
  const response = await apiClient.post("/authors", author);
  return response.data;
}

export async function deleteAuthor(id) {
  await apiClient.delete(`/authors/${id}`);
}
