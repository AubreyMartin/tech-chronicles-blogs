import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const categories = [...new Set(blogs.map((blog) => blog.category))];

  const authors = [...new Set(blogs.map((blog) => blog.author))];

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch = category === "" || blog.category === category;

    const authorMatch = author === "" || blog.author === author;

    return categoryMatch && authorMatch;
  });

  useEffect(() => {
    axios.get("http://localhost:3000/blogs").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>

        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option value="">All Authors</option>

        {authors.map((auth) => (
          <option key={auth} value={auth}>
            {auth}
          </option>
        ))}
      </select>
      <ul>
        {filteredBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllBlogsPage;
