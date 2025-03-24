
import { useState, useEffect } from 'react';
import { Car, Users, Fuel, Calendar, Search, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import AnimatedSection from '@/components/AnimatedSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Mock data for cars
import { cars } from '@/data/carsData';

const CarsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState('price-asc');
  
  // Categories derived from the car data
  const categories = [...new Set(cars.map(car => car.category))];
  
  useEffect(() => {
    // Filter cars based on search term and filters
    let results = cars;
    
    if (searchTerm) {
      results = results.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(car => car.category === selectedCategory);
    }
    
    if (selectedTransmission) {
      results = results.filter(car => car.transmission === selectedTransmission);
    }
    
    results = results.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    
    // Sort the results
    if (sortOrder === 'price-asc') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-asc') {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      results = [...results].sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredCars(results);
  }, [searchTerm, selectedCategory, selectedTransmission, priceRange, sortOrder]);
  
  // Find min and max prices from the car data
  const minPrice = Math.min(...cars.map(car => car.price));
  const maxPrice = Math.max(...cars.map(car => car.price));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Rental Car</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Choose from our wide range of vehicles for your next adventure
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-64">
              <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                <SelectTrigger>
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Transmissions</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-64">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setPriceRange([minPrice, maxPrice])}
                className="text-sm text-blue-600"
              >
                Reset
              </Button>
            </div>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={10}
              onValueChange={setPriceRange}
              className="mb-4"
            />
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="free-cancellation" />
              <Label htmlFor="free-cancellation">Free Cancellation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="unlimited-mileage" />
              <Label htmlFor="unlimited-mileage">Unlimited Mileage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="air-conditioned" />
              <Label htmlFor="air-conditioned">Air Conditioned</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="no-deposit" />
              <Label htmlFor="no-deposit">No Deposit</Label>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
          </h2>
        </div>
        
        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car, index) => (
              <AnimatedSection key={car.id} delay={100 * index}>
                <CarCard {...car} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Car className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No cars found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search filters to find more results.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedTransmission('');
                setPriceRange([minPrice, maxPrice]);
                setSortOrder('price-asc');
              }}
              className="mt-4"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CarsPage;
