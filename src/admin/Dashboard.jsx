import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ul>
        <li>
          <Link to="/admin/blogs">Manage Blogs</Link>
        </li>

        <li>
          <Link to="/admin/authors">Manage Authors</Link>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
