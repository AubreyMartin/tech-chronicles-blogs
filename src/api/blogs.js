import axios from "axios";
import { apiClient, hasRemoteApi } from "./client";

async function getStaticBlogs() {
  const response = await axios.get("/db.json");
  return response.data.blogs;
}

export async function fetchBlogs() {
  if (hasRemoteApi()) {
    const response = await apiClient.get("/blogs");
    return response.data;
  }

  return getStaticBlogs();
}

export async function fetchBlog(id) {
  if (hasRemoteApi()) {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  }

  const blogs = await getStaticBlogs();
  return blogs.find((blog) => String(blog.id) === String(id)) ?? null;
}

export async function fetchBlogsByAuthor(authorName) {
  const response = await apiClient.get(`/blogs?author=${authorName}`);
  return response.data;
}

export async function createBlog(blog) {
  const response = await apiClient.post("/blogs", blog);
  return response.data;
}

export async function updateBlog(id, blog) {
  const response = await apiClient.put(`/blogs/${id}`, blog);
  return response.data;
}

export async function deleteBlog(id) {
  await apiClient.delete(`/blogs/${id}`);
}
