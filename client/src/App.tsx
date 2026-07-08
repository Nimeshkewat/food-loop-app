import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgorPassword from "./pages/auth/ForgorPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search/:searchText" element={<SearchPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgorPassword />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  );
}

export default App;
