import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthors } from "../api/authors";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authors = await fetchAuthors();

      const author = authors.find(
        (author) => author.email === email && author.password === password,
      );

      if (author) {
        localStorage.setItem("loggedInAuthor", JSON.stringify(author));

        alert("Login Successful!");

        navigate("/author/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <h1>Author Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
