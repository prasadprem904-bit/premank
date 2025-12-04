import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminDiamonds from "@/pages/admin/Diamonds";
import AdminAppointments from "@/pages/admin/Appointments";
import AdminCertificates from "@/pages/admin/Certificates";
import { AdminProtectedRoute } from "@/components/AdminProtectedRoute";
import { PageTransition } from "@/components/ui/PageTransition";

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="/admin/login" element={
          <PageTransition>
            <AdminLogin />
          </PageTransition>
        } />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          </AdminProtectedRoute>
        } />
        <Route path="/admin/diamonds" element={
          <AdminProtectedRoute>
            <PageTransition>
              <AdminDiamonds />
            </PageTransition>
          </AdminProtectedRoute>
        } />
        <Route path="/admin/appointments" element={
          <AdminProtectedRoute>
            <PageTransition>
              <AdminAppointments />
            </PageTransition>
          </AdminProtectedRoute>
        } />
        <Route path="/admin/certificates" element={
          <AdminProtectedRoute>
            <PageTransition>
              <AdminCertificates />
            </PageTransition>
          </AdminProtectedRoute>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};
