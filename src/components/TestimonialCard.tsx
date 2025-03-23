
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  location?: string;
}

const TestimonialCard = ({ name, avatar, rating, text, date, location }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-start mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-brand-yellow"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          {location && <p className="text-sm text-gray-500">{location}</p>}
        </div>
      </div>
      
      <div className="flex items-center mb-3">
        {Array(5).fill(null).map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-xs text-gray-500 ml-2">{date}</span>
      </div>
      
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default TestimonialCard;
