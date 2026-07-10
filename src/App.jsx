import HomePage from "./user/HomePage";
import AllBlogsPage from "./user/AllBlogsPage";
import BlogDetail from "./user/BlogDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./author/Register";
import Login from "./author/Login";
import Dashboard from "./author/Dashboard";
import CreateBlog from "./author/CreateBlog";
import EditBlog from "./author/EditBlog";
import MyBlogs from "./author/MyBlogs";
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import ManageBlogs from "./admin/ManageBlogs";
import ManageAuthors from "./admin/ManageAuthors";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/all-blogs" element={<AllBlogsPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/author/register" element={<Register />} />
        <Route path="/author/login" element={<Login />} />
        <Route path="/author/dashboard" element={<Dashboard />} />
        <Route path="/author/create" element={<CreateBlog />} />
        <Route path="/author/edit/:id" element={<EditBlog />} />
        <Route path="/author/my-blogs" element={<MyBlogs />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/blogs" element={<ManageBlogs />} />
        <Route path="/admin/authors" element={<ManageAuthors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
