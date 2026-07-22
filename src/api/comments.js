import axios from "axios";
import { apiClient, hasRemoteApi } from "./client";

async function getStaticComments(blogId) {
  const response = await axios.get("/db.json");
  return response.data.comments.filter(
    (comment) => String(comment.blogId) === String(blogId),
  );
}

export async function fetchComments(blogId) {
  if (hasRemoteApi()) {
    const response = await apiClient.get(`/comments?blogId=${blogId}`);
    return response.data;
  }

  return getStaticComments(blogId);
}

export async function createComment(comment) {
  const response = await apiClient.post("/comments", comment);
  return response.data;
}

export async function fetchAllComments() {
  const response = await apiClient.get("/comments");
  return response.data;
}
