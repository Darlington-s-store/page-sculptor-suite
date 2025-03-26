
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            
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
            
            {/* User Dashboard */}
            <Route path="/dashboard" element={<UserDashboard />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
