
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import TourCard from '@/components/TourCard';
import CategoryCard from '@/components/CategoryCard';
import HotelCard from '@/components/HotelCard';
import CarCard from '@/components/CarCard';
import BlogCard from '@/components/BlogCard';
import TestimonialCard from '@/components/TestimonialCard';
import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Dummy data - in a real app, this would come from an API
const featuredTours = [
  {
    id: '1',
    title: 'Santorini Island Tour Package',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    rating: 4.8,
    reviews: 128,
    price: 549,
    duration: '5 days',
    maxPeople: 12,
  },
  {
    id: '2',
    title: 'Barcelona City Highlights',
    location: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    rating: 4.6,
    reviews: 98,
    price: 349,
    duration: '3 days',
    maxPeople: 15,
  },
  {
    id: '3',
    title: 'Golden Temple Amritsar',
    location: 'India',
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073',
    rating: 4.9,
    reviews: 156,
    price: 299,
    duration: '2 days',
    maxPeople: 10,
  },
  {
    id: '4',
    title: 'Bali Island Hopping',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    rating: 4.7,
    reviews: 142,
    price: 699,
    duration: '7 days',
    maxPeople: 8,
  },
];

const categories = [
  {
    title: 'Beach',
    count: 42,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    slug: 'beach',
  },
  {
    title: 'Mountain',
    count: 35,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    slug: 'mountain',
  },
  {
    title: 'Desert',
    count: 28,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35',
    slug: 'desert',
  },
  {
    title: 'City',
    count: 53,
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    slug: 'city',
  },
  {
    title: 'Cultural',
    count: 39,
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be',
    slug: 'cultural',
  },
  {
    title: 'Cruise',
    count: 21,
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19',
    slug: 'cruise',
  },
  {
    title: 'Safari',
    count: 18,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e',
    slug: 'safari',
  },
  {
    title: 'Island',
    count: 33,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5',
    slug: 'island',
  },
];

const hotels = [
  {
    id: '1',
    title: 'Luxury Ocean Resort',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    rating: 4.9,
    reviews: 246,
    price: 349,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access', 'Room Service'],
  },
  {
    id: '2',
    title: 'The Grand Budapest',
    location: 'Hungary',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    rating: 4.7,
    reviews: 189,
    price: 229,
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Fitness Center', '24/7 Service'],
  },
  {
    id: '3',
    title: 'Palm Residence Hotel',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    rating: 4.8,
    reviews: 312,
    price: 299,
    amenities: ['Free WiFi', 'Pool', 'Fitness Center', 'Restaurant', 'Bar', 'Parking'],
  },
  {
    id: '4',
    title: 'Sunset Beach Resort',
    location: 'Phuket, Thailand',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    rating: 4.6,
    reviews: 178,
    price: 189,
    amenities: ['Free WiFi', 'Pool', 'Beach Access', 'Restaurant', 'Bar'],
  },
];

const cars = [
  {
    id: '1',
    name: 'Audi A3 S-Line',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
    category: 'Sedan',
    seats: 5,
    mileage: 'Unlimited',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    year: 2023,
    price: 89,
  },
  {
    id: '2',
    name: 'BMW X5',
    image: 'https://images.unsplash.com/photo-1543796076-c4a574578981',
    category: 'SUV',
    seats: 7,
    mileage: 'Unlimited',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    year: 2023,
    price: 129,
  },
  {
    id: '3',
    name: 'Mercedes C-Class',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
    category: 'Sedan',
    seats: 5,
    mileage: 'Unlimited',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    year: 2022,
    price: 119,
  },
  {
    id: '4',
    name: 'Porsche 911',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    category: 'Sports',
    seats: 2,
    mileage: '200 km/day',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    year: 2022,
    price: 189,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: "The best travel experience I've had! Everything was perfectly organized, and the guide was incredibly knowledgeable. Will definitely book again.",
    date: 'March 15, 2023',
    location: 'New York, USA',
  },
  {
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 5,
    text: "My family and I had an amazing time on our tour. The accommodations were excellent, and the itinerary was well-planned. Highly recommend!",
    date: 'April 22, 2023',
    location: 'Toronto, Canada',
  },
  {
    name: 'Emma Williams',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 4,
    text: "Great service and value for money. The only reason for 4 stars instead of 5 is that one of the hotels wasn't as described, but everything else was perfect.",
    date: 'May 10, 2023',
    location: 'London, UK',
  },
  {
    name: 'David Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    rating: 5,
    text: "Booking was easy, and the customer service was excellent. Our guide went above and beyond to make our trip memorable. We'll be back!",
    date: 'June 3, 2023',
    location: 'Madrid, Spain',
  },
];

const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Hidden Beaches in Southeast Asia',
    excerpt: 'Discover pristine shorelines and crystal clear waters at these secluded paradises away from the tourist crowds.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2',
    date: 'July 15, 2023',
    author: {
      name: 'Alex Morgan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    category: 'Beaches',
  },
  {
    id: '2',
    title: 'Ultimate Guide to Backpacking Europe on a Budget',
    excerpt: 'Learn how to explore the best of Europe without breaking the bank with these proven money-saving tips.',
    image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6',
    date: 'August 2, 2023',
    author: {
      name: 'Sophia Perez',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    category: 'Tips',
  },
  {
    id: '3',
    title: 'How to Photograph Wildlife: Safari Photography Tips',
    excerpt: 'Capture stunning wildlife moments with these pro techniques for getting the perfect shot on your next safari adventure.',
    image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62',
    date: 'September 10, 2023',
    author: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    category: 'Photography',
  },
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-4 z-10 relative">
          <AnimatedSection className="text-white text-center mb-12">
            <div className="inline-block bg-brand-yellow text-black font-medium px-4 py-1 rounded-full mb-4">
              Limited Time Offer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Unleash Your Wanderlust<br />Book Your Next Journey
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto mb-8">
              Find and book your perfect trip with exclusive deals. Your adventure begins with TravelGo.
            </p>
          </AnimatedSection>
          
          <SearchBar />
          
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all ${
                    index === 0 ? 'w-8 bg-brand-yellow' : 'w-3 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Featured Tours"
            subtitle="Handpicked tours to make your journey unforgettable. Explore our most popular destinations."
            showButton={true}
            buttonText="View All Tours"
            buttonLink="/tours"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour) => (
              <AnimatedSection key={tour.id} delay={100 * parseInt(tour.id)}>
                <TourCard {...tour} featured={parseInt(tour.id) === 1} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Top Categories of Tours"
            subtitle="Explore our wide variety of tour categories to find your perfect adventure."
            showButton={true}
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category, index) => (
              <AnimatedSection key={index} delay={100 * index}>
                <CategoryCard {...category} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promo Banners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection>
              <div className="rounded-xl overflow-hidden relative h-64 bg-brand-teal shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-teal to-brand-teal/60"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-center">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Wake up to a<br />
                    <span className="text-3xl">sunny paradise</span>
                  </h3>
                  <p className="text-white/90 mb-4">Book beach getaways at 25% off</p>
                  <a href="/offers" className="btn-primary inline-block w-max">
                    View Offers
                  </a>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
                  alt="Beach Getaway" 
                  className="absolute right-0 h-full w-1/2 object-cover object-left"
                />
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="rounded-xl overflow-hidden relative h-64 bg-brand-blue shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue/60"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-center">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Experience true<br />
                    <span className="text-3xl">adventure</span>
                  </h3>
                  <p className="text-white/90 mb-4">Adventure tours starting at $399</p>
                  <a href="/tours/adventure" className="btn-primary inline-block w-max">
                    Book Now
                  </a>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1527585743534-7113e3211270" 
                  alt="Adventure Tour" 
                  className="absolute right-0 h-full w-1/2 object-cover object-left"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Top Rated Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Top Rated Hotels"
            subtitle="Stay in comfort with our selection of the highest-rated accommodations worldwide."
            showButton={true}
            buttonText="View All Hotels"
            buttonLink="/hotels"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel, index) => (
              <AnimatedSection key={hotel.id} delay={100 * index}>
                <HotelCard {...hotel} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Travel With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Travel With Us?"
            subtitle="Discover the TravelGo difference and see why travelers choose us for their adventures."
            centered={true}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <AnimatedSection className="text-center">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">100% Secure Payments</h3>
              <p className="text-gray-600">All payment transactions are encrypted and secure.</p>
            </AnimatedSection>
            
            <AnimatedSection className="text-center" delay={100}>
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">We promise the best rates and will match any lower price.</p>
            </AnimatedSection>
            
            <AnimatedSection className="text-center" delay={200}>
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Accommodations</h3>
              <p className="text-gray-600">All hotels and properties are verified for quality and safety.</p>
            </AnimatedSection>
            
            <AnimatedSection className="text-center" delay={300}>
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Customer Support</h3>
              <p className="text-gray-600">Our support team is available round the clock to assist you.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Car Rentals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Recent Launched Car"
            subtitle="Choose from our fleet of recently added, top-quality vehicles for your journey."
            showButton={true}
            buttonText="View All Cars"
            buttonLink="/cars"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car, index) => (
              <AnimatedSection key={car.id} delay={100 * index}>
                <CarCard {...car} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Search by category */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Search by category"
            subtitle="Find exactly what you need with our category search options."
            centered={true}
          />
          
          <div className="flex justify-center flex-wrap gap-4 mt-8">
            <a href="/search?category=flights" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 15L15.5 9L21.5 3M21.5 3H13.5M21.5 3V11M10 3H3V21H21V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Flights
            </a>
            <a href="/search?category=hotels" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H14M5 21H3M5 21H10M9 7H10M9 11H10M14 7H15M14 11H15M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Hotels
            </a>
            <a href="/search?category=tours" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tours
            </a>
            <a href="/search?category=cars" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6L17.5 9M6.5 9L8 6M5.5 12H18.5M6 13L6.5 17M17.5 17L18 13M5.5 19H18.5M18.5 19C19.3284 19 20 18.3284 20 17.5V12.5C20 11.6716 19.3284 11 18.5 11H5.5C4.67157 11 4 11.6716 4 12.5V17.5C4 18.3284 4.67157 19 5.5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cars
            </a>
            <a href="/search?category=cruises" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17C7.88071 17 9 18.1193 9 19.5M9 19.5C9 18.1193 10.1193 17 11.5 17C12.8807 17 14 18.1193 14 19.5M14 19.5C14 18.1193 15.1193 17 16.5 17C17.8807 17 19 18.1193 19 19.5M4 19.5H19M20 12.5C20 14.9853 17.9853 17 15.5 17C13.0147 17 11 14.9853 11 12.5C11 10.0147 15.5 4 15.5 4C15.5 4 20 10.0147 20 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cruises
            </a>
            <a href="/search?category=activities" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 17.5L12 15M12 15L9.5 17.5M12 15V20M8 10C8 10 9 9 12 9C15 9 16 10 16 10M16.5 2.5C16.5 2.5 16 6 12 6C8 6 7.5 2.5 7.5 2.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Activities
            </a>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <SectionHeader
              title="Don't take our word for it"
              subtitle="Hear what our customers have to say about their experiences with us."
              className="mb-0"
            />
            
            <div className="hidden md:flex space-x-2">
              <button className="p-2 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={100 * index}>
                <TestimonialCard {...testimonial} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="News, Tips & Guides"
            subtitle="Stay up to date with the latest travel news and helpful tips for your next adventure."
            showButton={true}
            buttonText="View All Posts"
            buttonLink="/blog"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={100 * index}>
                <BlogCard {...post} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection>
              <div className="inline-block bg-brand-yellow text-black font-medium px-4 py-1 rounded-full mb-4">
                Newsletter
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Subscribe to our newsletter
              </h2>
              <p className="text-gray-300 mb-6">
                Join our mailing list to receive travel inspiration, exclusive deals, and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg flex-1 text-gray-800"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
