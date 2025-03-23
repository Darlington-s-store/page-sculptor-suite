
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-20">
        <div className="text-center">
          <h1 className="text-7xl md:text-9xl font-bold text-brand-blue mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Page not found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="bg-brand-yellow text-black font-semibold px-6 py-3 rounded-lg hover:brightness-105 transition-all inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
