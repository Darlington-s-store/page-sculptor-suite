
import { useState } from 'react';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const SearchBar = () => {
  const [selectedTab, setSelectedTab] = useState('hotels');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    console.log('Searching for:', { selectedTab, location, checkIn, checkOut, guests });
  };

  return (
    <div className="search-bar animate-fade-in">
      <Tabs defaultValue="hotels" onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="flights">Flights</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="cars">Cars</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hotels" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Where are you going?"
                className="pl-10 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
        </TabsContent>
        
        <TabsContent value="flights" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Similar structure as hotels tab but with appropriate flight search fields */}
            <div className="flex justify-center items-center col-span-full">
              <p className="text-gray-500">Flight search options would appear here</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tours" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Tour search options */}
            <div className="flex justify-center items-center col-span-full">
              <p className="text-gray-500">Tour search options would appear here</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cars" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Car rental search options */}
            <div className="flex justify-center items-center col-span-full">
              <p className="text-gray-500">Car rental search options would appear here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchBar;
