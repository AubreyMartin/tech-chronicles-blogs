import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!blog) {
    return <h2>Loading...</h2>;
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
    </div>
  );
}

export default BlogDetail;
