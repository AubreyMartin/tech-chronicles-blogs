import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  const loggedInAuthor = JSON.parse(localStorage.getItem("loggedInAuthor"));

  const authorName = loggedInAuthor?.name;

  console.log("Logged In Author:", loggedInAuthor);
  console.log("Author Name:", authorName);

  useEffect(() => {
    if (!authorName) return;

    axios
      .get(`http://localhost:3000/blogs?author=${authorName}`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [authorName]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/blogs/${id}`)
      .then((response) => {
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
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
              <Link to={`/author/edit/${blog.id}`}>
                <button>Edit</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBlogs;
