import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Author Dashboard</h1>
      <hr />
      <ul>
        <li>
          <Link to="/author/create">Create Blog</Link>
        </li>
        <li>
          <Link to="/author/my-blogs">My Blogs</Link>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
