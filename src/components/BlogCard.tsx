
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

const BlogCard = ({ id, title, excerpt, image, date, author, category }: BlogCardProps) => {
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
        <div className="absolute top-4 left-4">
          <span className="bg-brand-yellow text-black text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <div className="flex items-center">
            <img src={author.avatar} alt={author.name} className="h-5 w-5 rounded-full mr-1 object-cover" />
            <span className="text-xs text-gray-500">{author.name}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        
        <Link 
          to={`/blog/${id}`}
          className="text-brand-blue font-medium text-sm inline-flex items-center hover:underline"
        >
          Read More 
          <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
