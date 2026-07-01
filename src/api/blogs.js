import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

async function getStaticBlogs() {
  const response = await axios.get("/db.json");
  return response.data.blogs;
}

export async function fetchBlogs() {
  if (API_BASE) {
    const response = await axios.get(`${API_BASE}/blogs`);
    return response.data;
  }

  return getStaticBlogs();
}

export async function fetchBlog(id) {
  if (API_BASE) {
    const response = await axios.get(`${API_BASE}/blogs/${id}`);
    return response.data;
  }

  const blogs = await getStaticBlogs();
  return blogs.find((blog) => String(blog.id) === String(id)) ?? null;
}
