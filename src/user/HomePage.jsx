import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to Tech Chronicles</h1>
      <p>Explore the latest tech blogs, insights, and tutorials.</p>
      <Link to="/all-blogs">All Blogs</Link>
      <Link to="/BlogDetail">BlogDetail</Link>

      {/* Later, we'll add blog listings here */}
    </div>
  );
}

export default HomePage;
