
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Clock, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { tours } from '@/data/tourData';
import { toast } from 'sonner';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 5));
  const [participants, setParticipants] = useState(2);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

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
        baseImage.replace('unsplash.com/', 'unsplash.com/q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/'),
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
        'https://images.unsplash.com/photo-1488085061387-422e29b40080',
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
    if (!date) {
      toast.error("Please select a date for your tour");
      return;
    }
    
    const totalPrice = tour.price * participants;
    
    // Redirect to booking page with query parameters
    window.location.href = `/booking/tour/${tour.id}?date=${date.toISOString()}&participants=${participants}&total=${totalPrice}`;
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
                  <TabsTrigger value="inclusions" className="flex-1">Inclusions</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
                  <p className="text-gray-600 mb-6">
                    Experience the magic of {tour.title} on this unforgettable {tour.duration} adventure. 
                    Immerse yourself in the rich culture and stunning landscapes of {tour.location} as our 
                    expert guides take you on a journey through iconic landmarks and hidden gems.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-3">Tour Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Expert local guides</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Small group experience (Max {tour.maxPeople} people)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Iconic landmarks visits</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Cultural immersion</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Authentic local experiences</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Comfortable transportation</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-bold mb-3">Tour Overview</h3>
                  <p className="text-gray-600 mb-6">
                    This {tour.duration} tour is designed to provide a perfect balance of guided exploration 
                    and free time to discover {tour.location} at your own pace. Our knowledgeable guides will 
                    share fascinating insights about the history, culture, and traditions of the region.
                  </p>
                </TabsContent>
                
                <TabsContent value="itinerary" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                  
                  <div className="space-y-8">
                    <div className="border-l-2 border-brand-blue pl-6 relative">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-brand-blue"></div>
                      <h3 className="text-xl font-bold mb-2">Day 1: Arrival and Welcome</h3>
                      <p className="text-gray-600 mb-4">
                        Arrive in {tour.location} and meet your tour guide and fellow travelers. 
                        Enjoy a welcome dinner and briefing about the exciting journey ahead.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img 
                          src="https://images.unsplash.com/photo-1515215316771-2742baa337f4" 
                          alt="Day 1" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1541086095944-f4b5412d3666" 
                          alt="Day 1" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="border-l-2 border-brand-blue pl-6 relative">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-brand-blue"></div>
                      <h3 className="text-xl font-bold mb-2">Day 2: Exploring the Highlights</h3>
                      <p className="text-gray-600 mb-4">
                        Embark on a guided tour of the main attractions and landmarks. 
                        Learn about the rich history and cultural significance of each site.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img 
                          src="https://images.unsplash.com/photo-1596627116790-af6f04c82de6" 
                          alt="Day 2" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1520222984843-df35ebc0f24d" 
                          alt="Day 2" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="border-l-2 border-brand-blue pl-6 relative">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-brand-blue"></div>
                      <h3 className="text-xl font-bold mb-2">Day 3: Cultural Immersion</h3>
                      <p className="text-gray-600 mb-4">
                        Participate in authentic local activities and experiences. 
                        Engage with locals and gain deeper insights into the culture.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img 
                          src="https://images.unsplash.com/photo-1593283590172-adfb21502b4e" 
                          alt="Day 3" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1501658462999-fd8a38156d78" 
                          alt="Day 3" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="inclusions" className="mt-6">
                  <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-5">
                      <h3 className="text-lg font-bold mb-4">Included in This Tour</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Professional, English-speaking guide</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Transportation in comfortable vehicle</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Accommodation ({tour.duration.replace(/\d+/g, '')} nights)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Daily breakfast and selected meals</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Entrance fees to all attractions in the itinerary</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>Welcome and farewell dinners</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-5">
                      <h3 className="text-lg font-bold mb-4">Not Included</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-red-600" />
                          </div>
                          <span>International airfare</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-red-600" />
                          </div>
                          <span>Travel insurance (recommended)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-red-600" />
                          </div>
                          <span>Personal expenses</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-red-600" />
                          </div>
                          <span>Meals not mentioned in the itinerary</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-red-600" />
                          </div>
                          <span>Optional activities and excursions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                            <Check className="h-4 w-4 text-red-600" />
                          </div>
                          <span>Tips for guides and drivers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Traveler Reviews</h2>
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
                            src="https://randomuser.me/api/portraits/men/75.jpg" 
                            alt="Traveler" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Michael Thompson</h4>
                          <p className="text-sm text-gray-500">Traveled in July 2023</p>
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
                        An incredible experience from start to finish! Our guide was knowledgeable and 
                        passionate about sharing the culture and history. The accommodations were 
                        excellent and the itinerary was perfectly balanced between activities and free time.
                      </p>
                    </div>
                    
                    <div className="p-6 border rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src="https://randomuser.me/api/portraits/women/22.jpg" 
                            alt="Traveler" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Sophia Martinez</h4>
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
                        This tour exceeded my expectations! The small group size made for a more 
                        personalized experience. I particularly enjoyed the cultural activities and 
                        interactions with locals. The only minor issue was that one of the hotels wasn't 
                        as nice as the others, but overall it was an amazing trip.
                      </p>
                    </div>
                    
                    <div className="p-6 border rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src="https://randomuser.me/api/portraits/men/43.jpg" 
                            alt="Traveler" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">David Wilson</h4>
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
                        This was my first organized tour, and it has set the bar incredibly high! Every 
                        aspect was thoughtfully planned and executed. Our guide was exceptional, providing 
                        insights that I would never have discovered on my own. The accommodations were 
                        comfortable and ideally located. I'll definitely book with this company again!
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Book This Tour</h3>
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <div className="flex items-center space-x-2">
                    <Clock className="text-brand-blue" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="text-brand-blue" />
                    <span>Max {tour.maxPeople} people</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tour Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Participants</label>
                    <Select 
                      value={participants.toString()}
                      onValueChange={(value) => setParticipants(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of participants" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                        <SelectItem value="5">5 People</SelectItem>
                        <SelectItem value="6">6 People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border-t border-b py-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      ${tour.price} x {participants} {participants === 1 ? 'person' : 'people'}
                    </span>
                    <span>
                      ${tour.price * participants}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span>
                      ${Math.round(tour.price * participants * 0.1)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>
                      ${Math.round(tour.price * participants * 1.1)}
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
                  <p>No payment charged until confirmation</p>
                  <p>Free cancellation up to 30 days before the tour</p>
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
