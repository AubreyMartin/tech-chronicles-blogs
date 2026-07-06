import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/${id}`)
      .then((response) => {
        const blog = response.data;

        setTitle(blog.title);
        setAuthor(blog.author);
        setCategory(blog.category);
        setContent(blog.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = {
      id: Number(id),
      title,
      author,
      category,
      content,
    };

    try {
      await axios.put(`http://localhost:3000/blogs/${id}`, updatedBlog);

      alert("Blog updated successfully!");

      navigate("/author/my-blogs");
    } catch (error) {
      console.error(error);
      alert("Error updating blog");
    }
  };

  return (
    <div>
      <h1>Edit Blog</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Author</label>
          <br />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Category</label>
          <br />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Content</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
          />
        </div>

        <br />

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
