import { useEffect, useState } from "react";
import { fetchAuthors, deleteAuthor } from "../api/authors";

function ManageAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors()
      .then(setAuthors)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteAuthor(id)
      .then(() => {
        setAuthors(authors.filter((author) => author.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Manage Authors</h1>

      {authors.length === 0 ? (
        <p>No authors found.</p>
      ) : (
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              <h3>{author.name}</h3>

              <p>
                <strong>Email:</strong> {author.email}
              </p>

              <button onClick={() => handleDelete(author.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageAuthors;
