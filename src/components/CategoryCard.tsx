
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  count: number;
  image: string;
  slug: string;
}

const CategoryCard = ({ title, count, image, slug }: CategoryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/tours/category/${slug}`} className="block">
      <div className="feature-card relative rounded-lg overflow-hidden shadow-md h-40">
        <div className={`absolute inset-0 bg-gray-200 ${imageLoaded ? 'opacity-0' : 'animate-pulse'}`}></div>
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'scale-100' : 'scale-105 blur-sm'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm opacity-80">{count} tours</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
