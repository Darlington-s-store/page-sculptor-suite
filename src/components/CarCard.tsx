
import { useState } from 'react';
import { Users, Gauge, Fuel, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  seats: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  year: number;
  price: number;
}

const CarCard = ({ id, name, image, category, seats, mileage, transmission, fuelType, year, price }: CarCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="feature-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 bg-gray-200 ${imageLoaded ? 'opacity-0' : 'animate-pulse'}`}></div>
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-contain transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-95 blur-sm'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">{category}</span>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {year}
          </span>
        </div>
        
        <h3 className="font-bold text-lg mb-3">{name}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2 text-brand-blue" />
            <span>{seats} Seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Gauge className="h-4 w-4 mr-2 text-brand-blue" />
            <span>{mileage}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-2 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10L8 12L6 14M16 10L14 12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Fuel className="h-4 w-4 mr-2 text-brand-blue" />
            <span>{fuelType}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-xs text-gray-500">Per day</span>
            <p className="font-bold text-lg text-brand-blue">${price}</p>
          </div>
          <Link 
            to={`/cars/${id}`}
            className="px-4 py-2 bg-brand-blue text-white rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
