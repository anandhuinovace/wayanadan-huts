// src/Router.tsx
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import FoodMenu from "@/pages/MenuList";
import NotFound from "@/pages/NotFound";
import Gallery from "@/pages/Gallery";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { ProtectedRoute } from "./pages/components/ProtectedRoute";
import Layout from "@/components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import AdminEnquirires from "./pages/AdminEnquiries";
import AdminRatings from "./pages/AdminRatings";
import AboutWyanad from "./pages/AboutWyanad";
import ReachWayanad from "./pages/HowtoReach";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes using UserLayout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/menu" element={<FoodMenu />} />
        <Route path="/media" element={<Gallery />} />
          <Route path="/about_wayanad" element={<AboutWyanad />} />
            <Route path="/reach" element={<ReachWayanad />} />
      </Route>

      {/* Admin login - standalone, no layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes using AdminLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/enquiries" element={<AdminEnquirires />} />
        <Route path="/ratings" element={<AdminRatings />} />
      </Route>

      {/* Not Found route - optionally inside UserLayout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
