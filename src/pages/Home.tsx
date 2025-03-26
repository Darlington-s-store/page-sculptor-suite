
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedToursSection from '@/components/home/FeaturedToursSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import PromoBannersSection from '@/components/home/PromoBannersSection';
import HotelsSection from '@/components/home/HotelsSection';
import WhyTravelWithUsSection from '@/components/home/WhyTravelWithUsSection';
import CarsSection from '@/components/home/CarsSection';
import CategorySearchSection from '@/components/home/CategorySearchSection';
import CategorySearchHeader from '@/components/home/CategorySearchHeader';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogSection from '@/components/home/BlogSection';
import SubscribeSection from '@/components/home/SubscribeSection';
import CustomerServiceSection from '@/components/home/CustomerServiceSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Loading from '@/components/Loading';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Welcome toast to enhance the user experience
      toast({
        title: "Welcome to TravelGo",
        description: "Find and book your perfect vacation with us!",
        duration: 5000,
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  if (isLoading) {
    return <Loading fullScreen message="Getting your dream vacation ready..." />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Tours Section */}
      <FeaturedToursSection />
      
      {/* Categories Section */}
      <CategoriesSection />
      
      {/* Promo Banners */}
      <PromoBannersSection />
      
      {/* Top Rated Hotels */}
      <HotelsSection />
      
      {/* Why Travel With Us */}
      <WhyTravelWithUsSection />
      
      {/* Car Rentals */}
      <CarsSection />
      
      {/* Search by category */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <CategorySearchHeader />
          <CategorySearchSection />
        </div>
      </section>
      
      {/* Customer Service Section */}
      <CustomerServiceSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Subscribe Section */}
      <SubscribeSection />
      
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Home;
