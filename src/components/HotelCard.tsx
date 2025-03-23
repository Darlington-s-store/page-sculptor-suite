
import { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HotelCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  amenities: string[];
}

const HotelCard = ({ id, title, location, image, rating, reviews, price, amenities }: HotelCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="feature-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
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
        
        <div className="flex flex-wrap gap-2 mb-3">
          {amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-xs text-gray-500">Per night</span>
            <p className="font-bold text-lg text-brand-blue">${price}</p>
          </div>
          <Link 
            to={`/hotels/${id}`}
            className="px-4 py-2 bg-brand-blue text-white rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
