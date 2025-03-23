
const CategorySearchSection = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center flex-wrap gap-4 mt-8">
          <a href="/search?category=flights" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5 15L15.5 9L21.5 3M21.5 3H13.5M21.5 3V11M10 3H3V21H21V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Flights
          </a>
          <a href="/search?category=hotels" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H21M19 21H14M5 21H3M5 21H10M9 7H10M9 11H10M14 7H15M14 11H15M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Hotels
          </a>
          <a href="/search?category=tours" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Tours
          </a>
          <a href="/search?category=cars" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 6L17.5 9M6.5 9L8 6M5.5 12H18.5M6 13L6.5 17M17.5 17L18 13M5.5 19H18.5M18.5 19C19.3284 19 20 18.3284 20 17.5V12.5C20 11.6716 19.3284 11 18.5 11H5.5C4.67157 11 4 11.6716 4 12.5V17.5C4 18.3284 4.67157 19 5.5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cars
          </a>
          <a href="/search?category=cruises" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17C7.88071 17 9 18.1193 9 19.5M9 19.5C9 18.1193 10.1193 17 11.5 17C12.8807 17 14 18.1193 14 19.5M14 19.5C14 18.1193 15.1193 17 16.5 17C17.8807 17 19 18.1193 19 19.5M4 19.5H19M20 12.5C20 14.9853 17.9853 17 15.5 17C13.0147 17 11 14.9853 11 12.5C11 10.0147 15.5 4 15.5 4C15.5 4 20 10.0147 20 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cruises
          </a>
          <a href="/search?category=activities" className="flex items-center px-5 py-3 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 17.5L12 15M12 15L9.5 17.5M12 15V20M8 10C8 10 9 9 12 9C15 9 16 10 16 10M16.5 2.5C16.5 2.5 16 6 12 6C8 6 7.5 2.5 7.5 2.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Activities
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategorySearchSection;
