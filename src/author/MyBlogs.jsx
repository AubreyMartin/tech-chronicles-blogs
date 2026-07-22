import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogsByAuthor, deleteBlog } from "../api/blogs";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  const loggedInAuthor = JSON.parse(localStorage.getItem("loggedInAuthor"));

  const authorName = loggedInAuthor?.name;

  useEffect(() => {
    if (!authorName) return;

    fetchBlogsByAuthor(authorName)
      .then(setBlogs)
      .catch((error) => {
        console.error(error);
      });
  }, [authorName]);

  const handleDelete = (id) => {
    deleteBlog(id)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>My Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>
              <p>Category: {blog.category}</p>
              <Link to={`/author/edit/${blog.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBlogs;
