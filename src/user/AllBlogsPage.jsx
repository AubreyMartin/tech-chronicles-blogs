import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/blogs").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllBlogsPage;
