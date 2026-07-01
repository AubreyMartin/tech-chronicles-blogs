import HomePage from "./user/HomePage";
import AllBlogsPage from "./user/AllBlogsPage";
import BlogDetail from "./user/BlogDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/all-blogs" element={<AllBlogsPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
