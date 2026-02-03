import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
