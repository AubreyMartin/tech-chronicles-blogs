import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/blogs/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Manage Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>

              <p>
                <strong>Author:</strong> {blog.author}
              </p>

              <p>
                <strong>Category:</strong> {blog.category}
              </p>

              <h4>Comments</h4>

              {comments.filter((comment) => comment.blogId == blog.id)
                .length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                <ul>
                  {comments
                    .filter((comment) => comment.blogId == blog.id)
                    .map((comment) => (
                      <li key={comment.id}>
                        <strong>{comment.name}:</strong> {comment.comment}
                      </li>
                    ))}
                </ul>
              )}

              <Link to={`/author/edit/${blog.id}`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => handleDelete(blog.id)}>Delete</button>

              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageBlogs;
