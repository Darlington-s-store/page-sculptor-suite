
import { useEffect } from 'react';
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

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Subscribe Section */}
      <SubscribeSection />
      
      <Footer />
    </div>
  );
};

export default Home;
