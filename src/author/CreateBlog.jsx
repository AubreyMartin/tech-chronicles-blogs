import { useState } from "react";
import { createBlog } from "../api/blogs";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      category,
      content,
    };

    try {
      await createBlog(newBlog);

      alert("Blog created successfully!");

      setTitle("");
      setAuthor("");
      setCategory("");
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Error creating blog");
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>

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

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
