
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Check, Coffee, Wifi, Tv, Utensils, Car, Snowflake } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { hotels } from '@/data/hotelData';
import { toast } from 'sonner';

const amenityIcons: Record<string, any> = {
  'Free WiFi': Wifi,
  'Pool': Coffee, // Changed from Pool to Coffee as Pool isn't available in lucide-react
  'Restaurant': Utensils,
  'Room Service': Coffee,
  'Parking': Car,
  'Air Conditioning': Snowflake,
  'TV': Tv,
};

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<any>(null);
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDays(new Date(), 3));
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the hotel by ID
    const foundHotel = hotels.find(h => h.id === id);
    
    if (foundHotel) {
      setHotel(foundHotel);
      
      // Simulate additional images for the hotel
      const baseImage = foundHotel.image;
      const additionalImages = [
        baseImage,
        baseImage.replace('unsplash.com/', 'unsplash.com/q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/'),
        'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      ];
      
      setSelectedImages(additionalImages);
      setMainImage(additionalImages[0]);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
          <p className="mb-8">The hotel you're looking for doesn't exist or has been removed.</p>
          <Link to="/hotels">
            <Button>Back to Hotels</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    const nights = differenceInDays(checkOut, checkIn);
    const totalPrice = hotel.price * nights * rooms;
    
    // Redirect to booking page with query parameters
    window.location.href = `/booking/hotel/${hotel.id}?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}&guests=${guests}&rooms=${rooms}&nights=${nights}&total=${totalPrice}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6 text-gray-500">
            <Link to="/" className="hover:text-brand-blue">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/hotels" className="hover:text-brand-blue">Hotels</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{hotel.title}</span>
          </div>
          
          {/* Hotel Title & Rating */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{hotel.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-brand-blue" />
                  <span>{hotel.location}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {Array(5).fill(null).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{hotel.rating}</span>
                </div>
                <span className="text-gray-500">({hotel.reviews} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Hotel Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="md:col-span-2 rounded-lg overflow-hidden h-[400px]">
              <img 
                src={mainImage} 
                alt={hotel.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {selectedImages.slice(1, 5).map((img, index) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden h-[190px] cursor-pointer"
                  onClick={() => setMainImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${hotel.title} ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hotel Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="w-full">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="amenities" className="flex-1">Amenities</TabsTrigger>
                  <TabsTrigger value="rooms" className="flex-1">Rooms</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
                  <p className="text-gray-600 mb-6">
                    {hotel.title} is a luxurious accommodation option located in the heart of {hotel.location}. 
                    The hotel features elegant rooms with modern amenities, exceptional service, and a prime 
                    location that allows easy access to major attractions, shopping centers, and dining options.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {hotel.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-bold mb-3">Location Highlights</h3>
                  <p className="text-gray-600 mb-6">
                    Perfectly situated in {hotel.location}, guests can enjoy easy access to popular attractions, 
                    shopping areas, and fine dining. The property is just minutes away from public transportation, 
                    making it easy to explore the city.
                  </p>
                </TabsContent>
                
                <TabsContent value="amenities" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Hotel Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotel.amenities.map((amenity: string, index: number) => {
                      const IconComponent = amenityIcons[amenity] || Check;
                      return (
                        <div key={index} className="flex items-center p-4 border rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <IconComponent className="h-5 w-5 text-brand-blue" />
                          </div>
                          <span className="font-medium">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="rooms" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Room Options</h2>
                  
                  <div className="space-y-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-[200px]">
                          <img 
                            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304" 
                            alt="Standard Room" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-bold mb-2">Standard Room</h3>
                          <p className="text-gray-600 mb-4">
                            Comfortable room with all essential amenities for a pleasant stay.
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">1 Queen Bed</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Free WiFi</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">TV</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Air Conditioning</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-500 text-sm">Per night</p>
                              <p className="text-2xl font-bold text-brand-blue">${hotel.price}</p>
                            </div>
                            <Button variant="outline">Select</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-[200px]">
                          <img 
                            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" 
                            alt="Deluxe Room" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-bold mb-2">Deluxe Room</h3>
                          <p className="text-gray-600 mb-4">
                            Spacious room with premium amenities and additional space for comfort.
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">1 King Bed</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Free WiFi</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">TV</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Air Conditioning</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Mini Bar</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-500 text-sm">Per night</p>
                              <p className="text-2xl font-bold text-brand-blue">${Math.round(hotel.price * 1.4)}</p>
                            </div>
                            <Button variant="outline">Select</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-[200px]">
                          <img 
                            src="https://images.unsplash.com/photo-1591088398332-8a7791972843" 
                            alt="Suite" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-bold mb-2">Executive Suite</h3>
                          <p className="text-gray-600 mb-4">
                            Luxury suite with separate living area and premium services.
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">1 King Bed</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Separate Living Area</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Free WiFi</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">TV</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">Bathtub</span>
                            <span className="text-sm bg-gray-100 py-1 px-3 rounded-full">VIP Services</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-500 text-sm">Per night</p>
                              <p className="text-2xl font-bold text-brand-blue">${Math.round(hotel.price * 2)}</p>
                            </div>
                            <Button variant="outline">Select</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Guest Reviews</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array(5).fill(null).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-bold">{hotel.rating}</span>
                      <span className="text-gray-500">({hotel.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 border rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src="https://randomuser.me/api/portraits/women/42.jpg" 
                            alt="Guest" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Emily Johnson</h4>
                          <p className="text-sm text-gray-500">Stayed in June 2023</p>
                        </div>
                        <div className="ml-auto flex">
                          {Array(5).fill(null).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Absolutely loved my stay here! The room was spacious and clean, the staff was 
                        incredibly friendly and helpful. Great location with easy access to all the 
                        attractions. Would definitely stay here again!
                      </p>
                    </div>
                    
                    <div className="p-6 border rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                            alt="Guest" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Robert Smith</h4>
                          <p className="text-sm text-gray-500">Stayed in May 2023</p>
                        </div>
                        <div className="ml-auto flex">
                          {Array(5).fill(null).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Great value for money. The breakfast was amazing and the staff was very 
                        accommodating. The only minor issue was that the WiFi was a bit slow in the evening,
                        but overall a very pleasant stay.
                      </p>
                    </div>
                    
                    <div className="p-6 border rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src="https://randomuser.me/api/portraits/women/65.jpg" 
                            alt="Guest" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Maria Garcia</h4>
                          <p className="text-sm text-gray-500">Stayed in April 2023</p>
                        </div>
                        <div className="ml-auto flex">
                          {Array(5).fill(null).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Perfect location in the heart of the city. The hotel is beautiful and well-maintained, 
                        and the room was very comfortable. The staff went above and beyond to make our 
                        stay special for our anniversary. Highly recommended!
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in / Check-out</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5 Guests</SelectItem>
                        <SelectItem value="6">6+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rooms</label>
                    <Select value={rooms.toString()} onValueChange={(value) => setRooms(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of rooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                        <SelectItem value="4">4+ Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border-t border-b py-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      ${hotel.price} x {checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0} nights
                    </span>
                    <span>
                      ${hotel.price * (checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Taxes & fees (10%)</span>
                    <span>
                      ${Math.round(hotel.price * (checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0) * 0.1)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>
                      ${Math.round(hotel.price * (checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0) * 1.1)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-blue hover:bg-blue-700 text-white" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>No payment charged until check-in</p>
                  <p>Free cancellation until 48 hours before arrival</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;
