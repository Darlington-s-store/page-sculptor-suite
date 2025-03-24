
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Search, Users, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HotelCard from '@/components/HotelCard';
import { hotels } from '@/data/hotelData';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const HotelsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [priceRange, setPriceRange] = useState('all');
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [sortOrder, setSortOrder] = useState('recommended');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = [...hotels];

    if (searchQuery) {
      filtered = filtered.filter((hotel) => 
        hotel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'budget':
          filtered = filtered.filter((hotel) => hotel.price < 150);
          break;
        case 'mid':
          filtered = filtered.filter((hotel) => hotel.price >= 150 && hotel.price <= 300);
          break;
        case 'luxury':
          filtered = filtered.filter((hotel) => hotel.price > 300);
          break;
      }
    }

    switch (sortOrder) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'recommended' - no specific sort, use default order
        break;
    }

    setFilteredHotels(filtered);
  }, [searchQuery, priceRange, sortOrder]);

  const handleSearch = () => {
    console.log('Searching hotels with:', { searchQuery, checkIn, checkOut, guests });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-blue to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-lg opacity-90">
              Discover luxurious hotels, cozy boutiques, and amazing accommodations worldwide for your next adventure.
            </p>
          </div>
          
          {/* Search Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to stay?"
                  className="pl-10 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="pl-10 pr-4 py-3 w-full border rounded-lg text-left focus:ring-2 focus:ring-brand-blue focus:border-brand-blue">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      {checkIn ? format(checkIn, 'PP') : 'Check-in date'}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="pl-10 pr-4 py-3 w-full border rounded-lg text-left focus:ring-2 focus:ring-brand-blue focus:border-brand-blue">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      {checkOut ? format(checkOut, 'PP') : 'Check-out date'}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleSearch} 
                  className="bg-brand-yellow text-black font-bold h-full px-6 rounded-lg hover:brightness-105"
                >
                  <Search className="h-5 w-5 mr-2" /> Search
                </Button>
              </div>
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
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceRange === 'all'} 
                          onChange={() => setPriceRange('all')}
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>All Prices</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceRange === 'budget'} 
                          onChange={() => setPriceRange('budget')}
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Budget ($0 - $150)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceRange === 'mid'} 
                          onChange={() => setPriceRange('mid')}
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Mid-range ($150 - $300)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceRange === 'luxury'} 
                          onChange={() => setPriceRange('luxury')}
                          className="w-4 h-4 accent-brand-blue"
                        />
                        <span>Luxury ($300+)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Sort By</h4>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-low">Price (Low to High)</SelectItem>
                        <SelectItem value="price-high">Price (High to Low)</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hotels Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">{filteredHotels.length} Hotels Found</h2>
              </div>
              
              {filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotels.map((hotel, index) => (
                    <AnimatedSection key={hotel.id} delay={100 * index}>
                      <HotelCard {...hotel} />
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <p className="text-xl text-gray-500">No hotels found matching your criteria.</p>
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

export default HotelsPage;
