
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car, Users, Gauge, Fuel, Calendar, Shield, Check, MapPin, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";

// Mock data
import { cars } from '@/data/carsData';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const foundCar = cars.find(c => c.id === id);
      if (foundCar) {
        setCar(foundCar);
        setSelectedImage(foundCar.image);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!car) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <Car className="mx-auto h-20 w-20 text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Car Not Found</h1>
          <p className="text-gray-600 mb-6">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/cars">
            <Button>Browse All Cars</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Add additional images for the gallery
  const additionalImages = [
    car.image,
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1103&q=80',
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Car Gallery */}
          <div className="w-full md:w-7/12">
            <AnimatedSection>
              <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img 
                  src={selectedImage} 
                  alt={car.name} 
                  className="w-full h-80 object-contain"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {additionalImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === img ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${car.name} - view ${idx + 1}`} 
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            {/* Car Info Tabs */}
            <AnimatedSection delay={100}>
              <Tabs defaultValue="overview" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-4 border rounded-lg mt-2">
                  <h3 className="text-lg font-semibold mb-3">Car Overview</h3>
                  <p className="text-gray-600 mb-4">
                    The {car.name} is a {car.category.toLowerCase()} car that offers excellent performance and comfort for your journey.
                    It comes with {car.transmission} transmission and {car.fuelType} engine.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">{car.seats} Seats</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                      <svg className="h-6 w-6 text-blue-600 mb-2" viewBox="0 0 24 24" fill="none">
                        <path d="M6 10L8 12L6 14M16 10L14 12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="text-sm font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                      <Gauge className="h-6 w-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">{car.mileage}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                      <Fuel className="h-6 w-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">{car.fuelType}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium">Pickup Locations</h4>
                    <div className="flex items-start space-x-2 text-sm">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Main City Branch</p>
                        <p className="text-gray-600">123 Downtown Street, Main City</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Airport Branch</p>
                        <p className="text-gray-600">International Airport Terminal B</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="p-4 border rounded-lg mt-2">
                  <h3 className="text-lg font-semibold mb-3">Car Features</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Interior Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Air Conditioning</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Bluetooth Connectivity</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Navigation System</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>USB Charging Ports</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Premium Audio System</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Safety Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>ABS Braking System</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Multiple Airbags</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Parking Sensors</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Rearview Camera</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Stability Control</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="terms" className="p-4 border rounded-lg mt-2">
                  <h3 className="text-lg font-semibold mb-3">Rental Terms & Conditions</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-1">Requirements</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Valid driver's license (minimum 1 year)</li>
                        <li>Minimum age: 21 years</li>
                        <li>Credit card in the driver's name</li>
                        <li>ID proof/passport</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Insurance</h4>
                      <p className="text-gray-600">
                        Basic insurance is included in the rental price. Extended insurance options 
                        are available during the booking process.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Mileage Policy</h4>
                      <p className="text-gray-600">
                        This vehicle comes with 150 miles per day included. Additional miles are charged at $0.25 per mile.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Fuel Policy</h4>
                      <p className="text-gray-600">
                        The vehicle must be returned with the same fuel level as at pickup. A refueling 
                        fee plus fuel costs will apply if returned with less fuel.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Cancellation Policy</h4>
                      <p className="text-gray-600">
                        Free cancellation up to 48 hours before pickup. Cancellations within 48 hours 
                        will incur a charge of one day rental.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>
          
          {/* Booking Summary and CTA */}
          <div className="w-full md:w-5/12">
            <AnimatedSection delay={50}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                      {car.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{car.year}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-100 py-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Base Rate (per day)</span>
                      <span className="font-medium">${car.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">$15</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">$10</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold mt-4 pt-2 border-t border-gray-100">
                      <span>Total (per day)</span>
                      <span>${car.price + 25}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-sm">Free Cancellation</p>
                        <p className="text-xs text-gray-500">Up to 48 hours before pickup</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-sm">No Hidden Fees</p>
                        <p className="text-xs text-gray-500">All taxes and fees are included</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/booking/car/${car.id}`} className="block w-full">
                    <Button 
                      className="w-full mb-3 flex items-center justify-center"
                      size="lg"
                      onClick={() => {
                        toast.success("Redirecting to booking page", {
                          description: "You're about to book the " + car.name
                        });
                      }}
                    >
                      Rent Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-gray-500">
                    By proceeding, you agree to our terms and conditions
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6">
                  <h3 className="font-medium mb-3">Why Book With Us</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                      <span className="text-sm text-gray-600">Best price guarantee</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                      <span className="text-sm text-gray-600">Free amendments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                      <span className="text-sm text-gray-600">24/7 customer support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CarDetails;
