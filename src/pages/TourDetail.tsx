
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Check, Clock, Menu, Map, Calendar as CalendarIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { tours } from '@/data/tourData';
import { toast } from 'sonner';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<any>(null);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(addDays(new Date(), 30));
  const [participants, setParticipants] = useState(2);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the tour by ID
    const foundTour = tours.find(t => t.id === id);
    
    if (foundTour) {
      setTour(foundTour);
      
      // Simulate additional images for the tour
      const baseImage = foundTour.image;
      const additionalImages = [
        baseImage,
        'https://images.unsplash.com/photo-1533105079780-92b9be482077',
        'https://images.unsplash.com/photo-1534329539061-64caeb388c42',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
        'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4',
        'https://images.unsplash.com/photo-1682687982107-14492010e05e',
      ];
      
      setSelectedImages(additionalImages);
      setMainImage(additionalImages[0]);
      
      // Generate a fake itinerary based on tour duration
      const durationDays = parseInt(foundTour.duration.split(' ')[0]);
      
      const generatedItinerary = Array.from({ length: durationDays }, (_, i) => ({
        day: i + 1,
        title: i === 0 ? 'Arrival & Welcome' : 
               i === durationDays - 1 ? 'Farewell Day' : 
               `Day ${i + 1} Exploration`,
        description: i === 0 ? 
          'Arrive at your destination, meet your guide, and settle into your accommodation. Welcome dinner in the evening.' : 
          i === durationDays - 1 ? 
          'Final breakfast, last-minute shopping, and farewell lunch before departure arrangements.' : 
          `Full day of guided exploration and activities. Breakfast, lunch, and dinner included.`,
        activities: i === 0 ? 
          ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Tour briefing'] : 
          i === durationDays - 1 ? 
          ['Breakfast', 'Free time', 'Farewell lunch', 'Departure transfer'] : 
          ['Breakfast', 'Guided tour', 'Cultural experience', 'Dinner']
      }));
      
      setItinerary(generatedItinerary);
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

  if (!tour) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
          <p className="mb-8">The tour you're looking for doesn't exist or has been removed.</p>
          <Link to="/tours">
            <Button>Back to Tours</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    if (!departureDate) {
      toast.error("Please select a departure date");
      return;
    }
    
    const totalPrice = tour.price * participants;
    
    // Redirect to booking page with query parameters
    window.location.href = `/booking/tour/${tour.id}?departureDate=${departureDate.toISOString()}&participants=${participants}&duration=${tour.duration}&total=${totalPrice}`;
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
            <Link to="/tours" className="hover:text-brand-blue">Tours</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{tour.title}</span>
          </div>
          
          {/* Tour Title & Rating */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-brand-blue" />
                  <span>{tour.location}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {Array(5).fill(null).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{tour.rating}</span>
                </div>
                <span className="text-gray-500">({tour.reviews} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Tour Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="md:col-span-2 rounded-lg overflow-hidden h-[400px]">
              <img 
                src={mainImage} 
                alt={tour.title} 
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
                    alt={`${tour.title} ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tour Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="w-full">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary" className="flex-1">Itinerary</TabsTrigger>
                  <TabsTrigger value="details" className="flex-1">Tour Details</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                  <p className="text-gray-600 mb-6">
                    {tour.title} is an incredible journey through the beautiful landscapes of {tour.location}. 
                    This carefully crafted tour takes you through the most scenic spots, cultural landmarks, and 
                    authentic local experiences that make {tour.location} special. Our experienced guides will 
                    ensure you have a safe, enjoyable, and unforgettable adventure.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold mb-4">Tour Highlights</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Carefully curated itinerary covering major attractions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Experienced local guides with extensive knowledge</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Quality accommodations throughout your journey</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Authentic local cultural experiences and cuisine</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>All transportation and logistics taken care of</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Professional English-speaking guide</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Accommodations (hotels, resorts, or lodges)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Meals as mentioned in the itinerary</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>All transportation during the tour</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Entrance fees to attractions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">About This Tour</h3>
                  <p className="text-gray-600 mb-3">
                    Embark on an unforgettable {tour.duration} adventure through {tour.location}, where every 
                    day brings new discoveries and experiences. This tour is designed for travelers who want to 
                    experience the authentic culture, natural beauty, and hidden gems of the region.
                  </p>
                  <p className="text-gray-600 mb-6">
                    With a maximum group size of {tour.maxPeople} people, you'll enjoy a personalized experience 
                    while making new friends along the way. Our expert guides share insights about local history, 
                    culture, and traditions that you won't find in guidebooks.
                  </p>
                </TabsContent>
                
                <TabsContent value="itinerary" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                  
                  <div className="space-y-6">
                    {itinerary.map((day) => (
                      <div key={day.day} className="border-l-4 border-brand-blue pl-6 relative">
                        <div className="absolute left-[-13px] top-0 h-6 w-6 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                          {day.day}
                        </div>
                        <div className="pb-6">
                          <h3 className="text-xl font-bold mb-2">{day.title}</h3>
                          <p className="text-gray-600 mb-4">{day.description}</p>
                          
                          <h4 className="font-medium text-brand-blue mb-2">Today's Activities:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="flex items-center">
                                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                  <Check className="h-3 w-3 text-brand-blue" />
                                </div>
                                <span className="text-gray-700">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Tour Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Tour Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                            <Clock className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">Duration</h4>
                            <p className="text-gray-600">{tour.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                            <Users className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">Group Size</h4>
                            <p className="text-gray-600">Maximum {tour.maxPeople} people</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                            <Menu className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">Meals</h4>
                            <p className="text-gray-600">Breakfast, lunch, and dinner included as specified in the itinerary</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                            <Map className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">Transportation</h4>
                            <p className="text-gray-600">Air-conditioned vehicles, plus domestic flights if applicable</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Important Information</h3>
                      
                      <div className="bg-yellow-50 p-5 rounded-lg mb-6">
                        <h4 className="font-medium mb-2">Booking & Cancellation Policy</h4>
                        <ul className="text-gray-700 space-y-2">
                          <li>• 20% deposit required to secure your booking</li>
                          <li>• Full payment due 30 days before departure</li>
                          <li>• Free cancellation up to 45 days before departure</li>
                          <li>• 50% refund for cancellations 30-44 days before departure</li>
                          <li>• No refund for cancellations less than 30 days before departure</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">What to Bring</h4>
                        <ul className="grid grid-cols-2 gap-2 text-gray-700">
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Comfortable shoes</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Weather-appropriate clothing</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Sunscreen</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Insect repellent</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Camera</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span>Personal medications</span>
                          </li>
                        </ul>
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
                            className={`h-5 w-5 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-bold">{tour.rating}</span>
                      <span className="text-gray-500">({tour.reviews} reviews)</span>
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
                          <h4 className="font-bold">Sarah Thompson</h4>
                          <p className="text-sm text-gray-500">Traveled in June 2023</p>
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
                        This tour exceeded all my expectations! Our guide was incredibly knowledgeable
                        and made every destination come alive with stories and insights. The itinerary
                        was perfectly balanced with both popular attractions and hidden gems. I particularly
                        enjoyed the authentic local dining experiences that were included.
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
                          <h4 className="font-bold">Michael Chen</h4>
                          <p className="text-sm text-gray-500">Traveled in May 2023</p>
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
                        Great tour overall! The accommodations were excellent and the transportation was
                        comfortable. I took off one star because I felt a bit rushed at some locations
                        and would have liked more free time to explore on my own. However, our guide was
                        fantastic and very attentive to everyone's needs.
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
                          <h4 className="font-bold">Emma Wilson</h4>
                          <p className="text-sm text-gray-500">Traveled in April 2023</p>
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
                        I traveled solo and was a bit nervous about joining a group tour, but it turned
                        out to be the best decision! The small group size made it easy to connect with
                        fellow travelers, and our guide created such a friendly atmosphere. Every detail
                        was taken care of, and the experiences we had were truly authentic and memorable.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-gray-500">From</span>
                    <p className="text-3xl font-bold text-brand-blue">${tour.price}</p>
                    <span className="text-gray-500">per person</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-brand-blue mr-2" />
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Departure Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={departureDate}
                          onSelect={setDepartureDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Participants</label>
                    <Select value={participants.toString()} onValueChange={(value) => setParticipants(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of participants" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                        <SelectItem value="5">5 People</SelectItem>
                        <SelectItem value="6">6+ People (Contact us)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border-t border-b py-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tour Price (per person)</span>
                    <span>${tour.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Number of Participants</span>
                    <span>x {participants}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>${tour.price * participants}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-blue hover:bg-blue-700 text-white" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book This Tour
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Only 20% deposit required to secure your booking</p>
                  <p>Free cancellation up to 45 days before departure</p>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="text-brand-blue">
                    Ask a Question
                  </Button>
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

export default TourDetail;
