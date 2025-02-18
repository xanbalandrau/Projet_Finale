import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home/Home";
import Portfolio from "../pages/Portfolio";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";

import AdminRoute from "./AdminRoute";

import Navbar from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
