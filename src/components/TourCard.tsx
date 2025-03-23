
import { useState } from 'react';
import { Star, MapPin, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  maxPeople: number;
  featured?: boolean;
}

const TourCard = ({ id, title, location, image, rating, reviews, price, duration, maxPeople, featured = false }: TourCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`feature-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${featured ? 'lg:col-span-1' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        {featured && (
          <div className="absolute top-4 left-0 bg-brand-yellow text-black font-medium py-1 px-4 z-10">
            Featured
          </div>
        )}
        <div className={`absolute inset-0 bg-gray-200 ${imageLoaded ? 'opacity-0' : 'animate-pulse'}`}></div>
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-105 blur-sm'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1 text-brand-blue" />
          <span>{location}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{title}</h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {Array(5).fill(null).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({reviews} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex space-x-3 text-xs text-gray-500">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{maxPeople}</span>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500">From</span>
            <p className="font-bold text-lg text-brand-blue">${price}</p>
          </div>
        </div>
      </div>
      
      <Link 
        to={`/tours/${id}`}
        className="block bg-gray-50 text-center py-3 text-brand-blue font-medium hover:bg-brand-blue hover:text-white transition-colors duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default TourCard;
