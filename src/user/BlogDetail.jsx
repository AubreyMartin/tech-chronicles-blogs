import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchBlog } from "../api/blogs";
import { fetchComments, createComment } from "../api/comments";

function BlogDetail() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setLoading(true);

    fetchBlog(id)
      .then((data) => {
        setBlog(data);
      })
      .finally(() => {
        setLoading(false);
      });

    fetchComments(id)
      .then(setComments)
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createComment({
      blogId: Number(id),
      name,
      comment,
    })
      .then((newComment) => {
        setComments([...comments, newComment]);
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
