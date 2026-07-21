import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./pages/Cart";
import Restaurant from "./pages/admin/Restaurant";
import AddMenu from "./pages/admin/AddMenu";
import AdminOrders from "./pages/admin/AdminOrders";
import Success from "./pages/Success";
import PublicRoute from "./components/protected-routes/PublicRoute";
import PrivateRoute from "./components/protected-routes/PrivateRoute";
import AdminRoute from "./components/protected-routes/AdminRoute";
import { useAuth } from "./context/AuthProvider";
import Loader from "./components/ui/Loader";

function App() {
  const { isLoading } = useAuth();
  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/search/:searchText" element={<SearchPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/order-status"
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/restaurant"
          element={
            <AdminRoute>
              <Restaurant />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <AdminRoute>
              <AddMenu />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <AdminOrders />
            </PrivateRoute>
          }
        />
      </Route>
      //* auth routes
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <PrivateRoute>
            <VerifyEmail />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
