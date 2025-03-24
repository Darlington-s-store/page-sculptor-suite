
import { useState, useEffect } from 'react';
import { MapPin, Search, SlidersHorizontal, Clock, Users, Filter, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TourCard from '@/components/TourCard';
import { tours } from '@/data/tourData';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ToursPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [duration, setDuration] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [filteredTours, setFilteredTours] = useState(tours);
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = [...tours];

    if (searchQuery) {
      filtered = filtered.filter((tour) => 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (duration !== 'all') {
      switch (duration) {
        case 'short':
          filtered = filtered.filter((tour) => {
            const days = parseInt(tour.duration.split(' ')[0]);
            return days <= 3;
          });
          break;
        case 'medium':
          filtered = filtered.filter((tour) => {
            const days = parseInt(tour.duration.split(' ')[0]);
            return days > 3 && days <= 7;
          });
          break;
        case 'long':
          filtered = filtered.filter((tour) => {
            const days = parseInt(tour.duration.split(' ')[0]);
            return days > 7;
          });
          break;
      }
    }

    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'budget':
          filtered = filtered.filter((tour) => tour.price < 300);
          break;
        case 'mid':
          filtered = filtered.filter((tour) => tour.price >= 300 && tour.price <= 600);
          break;
        case 'luxury':
          filtered = filtered.filter((tour) => tour.price > 600);
          break;
      }
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => {
          const daysA = parseInt(a.duration.split(' ')[0]);
          const daysB = parseInt(b.duration.split(' ')[0]);
          return daysA - daysB;
        });
        break;
      default:
        // 'recommended' - no specific sort, use default order
        break;
    }

    setFilteredTours(filtered);
  }, [searchQuery, duration, priceRange, sortBy]);

  const handleSearch = () => {
    console.log('Searching tours with:', { searchQuery, duration, priceRange });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-blue to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Amazing Tours</h1>
            <p className="text-lg opacity-90">
              Discover unforgettable experiences with our carefully curated tours from around the world.
            </p>
          </div>
          
          {/* Search Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search destination or tour name"
                  className="pl-10 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">Budget ($0 - $300)</SelectItem>
                      <SelectItem value="mid">Mid-range ($300 - $600)</SelectItem>
                      <SelectItem value="luxury">Luxury ($600+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Duration</SelectItem>
                      <SelectItem value="short">Short (1-3 days)</SelectItem>
                      <SelectItem value="medium">Medium (4-7 days)</SelectItem>
                      <SelectItem value="long">Long (8+ days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch} 
                className="bg-brand-yellow text-black font-bold h-full px-6 rounded-lg hover:brightness-105"
              >
                <Search className="h-5 w-5 mr-2" /> Search Tours
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <SlidersHorizontal className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Tour Categories</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Adventure</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Cultural</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Beach</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>City</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Nature</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Group Size</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Small (1-5 people)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Medium (6-10 people)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Large (11+ people)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Customer Rating</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>5 Star</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>4 Star & above</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>3 Star & above</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Sort By</h4>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort tours by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-low">Price (Low to High)</SelectItem>
                        <SelectItem value="price-high">Price (High to Low)</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tours Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{filteredTours.length} Tours Found</h2>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-gray-500" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price (Low to High)</SelectItem>
                      <SelectItem value="price-high">Price (High to Low)</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredTours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTours.map((tour, index) => (
                    <AnimatedSection key={tour.id} delay={100 * index}>
                      <TourCard {...tour} />
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <p className="text-xl text-gray-500">No tours found matching your criteria.</p>
                  <p className="text-gray-400 mt-2">Try adjusting your filters or search query.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ToursPage;
