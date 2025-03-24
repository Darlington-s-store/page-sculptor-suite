
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  CreditCard,
  Shield, 
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from "sonner";
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import BookingSummary from '@/components/BookingSummary';

// Mock data
import { cars } from '@/data/carsData';

const BookingPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Booking form state
  const [bookingData, setBookingData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    specialRequests: '',
    insuranceOption: 'basic',
    agreeToTerms: false
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // Fetch item data based on type and id
  useEffect(() => {
    let data = null;
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      if (type === 'car') {
        data = cars.find(car => car.id === id);
      }
      // Add other types here when needed (hotels, tours, etc.)
      
      setItem(data);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [type, id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  
  const handleDateChange = (field: string, date: Date | undefined) => {
    if (date) {
      setBookingData({ ...bookingData, [field]: date });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      // Validate current step
      if (currentStep === 1) {
        if (!bookingData.startDate || !bookingData.endDate) {
          toast.error("Please select dates for your booking");
          return;
        }
        if (bookingData.startDate > bookingData.endDate) {
          toast.error("End date cannot be before start date");
          return;
        }
      } else if (currentStep === 2) {
        if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone) {
          toast.error("Please fill in all required fields");
          return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(bookingData.email)) {
          toast.error("Please enter a valid email address");
          return;
        }
      }
      
      // Move to next step
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final submission
      if (!bookingData.agreeToTerms) {
        toast.error("Please agree to the terms and conditions");
        return;
      }
      
      // Here you would typically send data to your backend
      console.log("Booking submitted:", bookingData);
      
      toast.success("Booking confirmed!", {
        description: "Your booking has been successfully processed."
      });
      
      // Redirect to success page or home
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <Car className="mx-auto h-20 w-20 text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Item Not Found</h1>
          <p className="text-gray-600 mb-6">
            The {type} you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const getDuration = () => {
    const diffTime = Math.abs(bookingData.endDate.getTime() - bookingData.startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Calculate the total price based on the item type and duration
  const calculateTotal = () => {
    const duration = getDuration();
    
    if (type === 'car') {
      const basePrice = item.price * duration;
      const insuranceCost = bookingData.insuranceOption === 'basic' ? 15 * duration : 
                           bookingData.insuranceOption === 'premium' ? 25 * duration : 0;
      const serviceFee = 10;
      
      return {
        basePrice,
        insuranceCost,
        serviceFee,
        total: basePrice + insuranceCost + serviceFee
      };
    }
    
    // Add other types of calculations here
    return {
      basePrice: 0,
      insuranceCost: 0,
      serviceFee: 0,
      total: 0
    };
  };
  
  const priceDetails = calculateTotal();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Complete Your Booking</h1>
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-white text-blue-600' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-white' : 'bg-gray-300'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-white text-blue-600' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-white' : 'bg-gray-300'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-white text-blue-600' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Booking Form */}
          <div className="w-full lg:w-8/12">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Booking Details */}
              {currentStep === 1 && (
                <AnimatedSection>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Pickup Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !bookingData.startDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {bookingData.startDate ? (
                                format(bookingData.startDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={bookingData.startDate}
                              onSelect={(date) => handleDateChange('startDate', date)}
                              initialFocus
                              disabled={(date) => date < new Date()}
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="endDate">Return Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !bookingData.endDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {bookingData.endDate ? (
                                format(bookingData.endDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={bookingData.endDate}
                              onSelect={(date) => handleDateChange('endDate', date)}
                              initialFocus
                              disabled={(date) => date < bookingData.startDate}
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    {type === 'car' && (
                      <>
                        <div className="space-y-2 mb-6">
                          <Label htmlFor="pickupLocation">Pickup Location</Label>
                          <Select 
                            onValueChange={(value) => setBookingData({...bookingData, pickupLocation: value})}
                            defaultValue=""
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select pickup location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="main-city">Main City Branch</SelectItem>
                              <SelectItem value="airport">Airport Branch</SelectItem>
                              <SelectItem value="downtown">Downtown Branch</SelectItem>
                              <SelectItem value="west-side">West Side Branch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          <Label htmlFor="dropoffLocation">Return Location</Label>
                          <Select 
                            onValueChange={(value) => setBookingData({...bookingData, dropoffLocation: value})}
                            defaultValue=""
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select return location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="main-city">Main City Branch</SelectItem>
                              <SelectItem value="airport">Airport Branch</SelectItem>
                              <SelectItem value="downtown">Downtown Branch</SelectItem>
                              <SelectItem value="west-side">West Side Branch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          <Label htmlFor="insuranceOption">Insurance Options</Label>
                          <Select 
                            value={bookingData.insuranceOption}
                            onValueChange={(value) => setBookingData({...bookingData, insuranceOption: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic Coverage ($15/day)</SelectItem>
                              <SelectItem value="premium">Premium Coverage ($25/day)</SelectItem>
                              <SelectItem value="none">No Additional Insurance</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">
                            Basic insurance covers damage to the rental vehicle. Premium includes personal accident insurance and theft protection.
                          </p>
                        </div>
                      </>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Textarea 
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Any special requests or additional information"
                        value={bookingData.specialRequests}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )}
              
              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <AnimatedSection>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <p className="text-xs text-gray-500">Booking confirmation will be sent to this email</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                        <div>
                          <p className="font-medium">Your information is secure</p>
                          <p className="text-sm text-gray-600">
                            We use industry-standard security measures to protect your personal data. 
                            Your information will only be used for processing your booking.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}
              
              {/* Step 3: Payment and Confirmation */}
              {currentStep === 3 && (
                <AnimatedSection>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Review and Confirm</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Booking Summary</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex mb-3">
                          <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden mr-3">
                            <img 
                              src={item.image} 
                              alt={item.name || item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.name || item.title}</h4>
                            <p className="text-sm text-gray-600">
                              {type === 'car' ? `${item.category} - ${item.transmission}` : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                              <span className="font-medium">Dates: </span>
                              <span>
                                {format(bookingData.startDate, "MMM d, yyyy")} - {format(bookingData.endDate, "MMM d, yyyy")}
                              </span>
                              <span className="text-gray-500 ml-1">({getDuration()} days)</span>
                            </div>
                          </div>
                          
                          {type === 'car' && bookingData.pickupLocation && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <span className="font-medium">Pickup: </span>
                                <span>
                                  {bookingData.pickupLocation === 'main-city' ? 'Main City Branch' :
                                   bookingData.pickupLocation === 'airport' ? 'Airport Branch' :
                                   bookingData.pickupLocation === 'downtown' ? 'Downtown Branch' :
                                   bookingData.pickupLocation === 'west-side' ? 'West Side Branch' : ''}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {type === 'car' && bookingData.dropoffLocation && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <span className="font-medium">Return: </span>
                                <span>
                                  {bookingData.dropoffLocation === 'main-city' ? 'Main City Branch' :
                                   bookingData.dropoffLocation === 'airport' ? 'Airport Branch' :
                                   bookingData.dropoffLocation === 'downtown' ? 'Downtown Branch' :
                                   bookingData.dropoffLocation === 'west-side' ? 'West Side Branch' : ''}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {type === 'car' && (
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <span className="font-medium">Insurance: </span>
                                <span>
                                  {bookingData.insuranceOption === 'basic' ? 'Basic Coverage' :
                                   bookingData.insuranceOption === 'premium' ? 'Premium Coverage' :
                                   'No Additional Insurance'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Payment Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Base Rate ({getDuration()} days)</span>
                            <span>${priceDetails.basePrice}</span>
                          </div>
                          
                          {type === 'car' && bookingData.insuranceOption !== 'none' && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {bookingData.insuranceOption === 'basic' ? 'Basic Insurance' : 'Premium Insurance'}
                              </span>
                              <span>${priceDetails.insuranceCost}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service Fee</span>
                            <span>${priceDetails.serviceFee}</span>
                          </div>
                          
                          <div className="flex justify-between pt-3 border-t border-gray-200 font-bold">
                            <span>Total</span>
                            <span>${priceDetails.total}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Payment Method</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Your card will not be charged until you pick up the {type}.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input 
                              id="cardName"
                              name="cardName"
                              placeholder="As it appears on your card"
                              disabled
                              defaultValue={`${bookingData.firstName} ${bookingData.lastName}`}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative">
                              <Input 
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                disabled
                                defaultValue="**** **** **** 1234"
                              />
                              <CreditCard className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                disabled
                                defaultValue="12/25"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                disabled
                                defaultValue="***"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-4">
                          This is a demo. No actual payment will be processed. In a real application, 
                          secure payment processing would be implemented here.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 mb-6">
                      <Checkbox 
                        id="agreeToTerms" 
                        checked={bookingData.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setBookingData({...bookingData, agreeToTerms: checked as boolean})
                        }
                      />
                      <Label 
                        htmlFor="agreeToTerms" 
                        className="text-sm leading-tight font-normal cursor-pointer"
                      >
                        I agree to the <Link to="#" className="text-blue-600 hover:underline">Terms and Conditions</Link> and <Link to="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                  </div>
                </AnimatedSection>
              )}
              
              {/* Bottom Navigation */}
              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button type="submit">
                  {currentStep < totalSteps ? 'Continue' : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Booking Summary Sidebar */}
          <div className="w-full lg:w-4/12">
            <BookingSummary 
              item={item}
              type={type || ''}
              duration={getDuration()}
              dates={{
                start: bookingData.startDate,
                end: bookingData.endDate
              }}
              priceDetails={priceDetails}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
