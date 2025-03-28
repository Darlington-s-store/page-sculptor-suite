
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CarsPage from "./pages/CarsPage";
import CarDetails from "./pages/CarDetails";
import BookingPage from "./pages/BookingPage";
import HotelsPage from "./pages/HotelsPage";
import HotelDetail from "./pages/HotelDetail";
import ToursPage from "./pages/ToursPage";
import TourDetail from "./pages/TourDetail";
import UserDashboard from "./pages/UserDashboard";
import Auth from "./pages/Auth";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UsersPage from "./pages/Admin/UsersPage";
import BookingsPage from "./pages/Admin/BookingsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<Navigate to="/" replace />} />
            
            {/* Auth Route */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Cars Routes */}
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            
            {/* Hotels Routes */}
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            
            {/* Tours Routes */}
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            
            {/* Booking Routes */}
            <Route path="/booking/:type/:id" element={<BookingPage />} />
            
            {/* User Dashboard - Protected Route */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requireAdmin>
                <UsersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute requireAdmin>
                <BookingsPage />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
