import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdmins } from "../api/admins";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const admins = await fetchAdmins();

      const admin = admins.find(
        (admin) => admin.email === email && admin.password === password,
      );

      if (admin) {
        localStorage.setItem("loggedInAdmin", JSON.stringify(admin));

        alert("Admin Login Successful!");

        navigate("/admin/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>

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
