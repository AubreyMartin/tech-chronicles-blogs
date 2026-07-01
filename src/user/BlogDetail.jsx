import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchBlog } from "../api/blogs";

function BlogDetail() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setLoading(true);

    // Fetch blog details
    fetchBlog(id)
      .then((data) => {
        setBlog(data);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch comments for this blog
    axios
      .get(`http://localhost:3000/comments?blogId=${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/comments", {
        blogId: Number(id),
        name,
        comment,
      })
      .then((response) => {
        // Add the new comment to the list immediately
        setComments([...comments, response.data]);

        // Clear the form
        setName("");
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>

      <p>
        <strong>Author:</strong> {blog.author}
      </p>

      <p>
        <strong>Category:</strong> {blog.category}
      </p>

      <p>{blog.content}</p>

      <hr />

      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.name}</strong>: {comment.comment}
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Add Comment</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Comment</label>
          <br />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default BlogDetail;
