
import AnimatedSection from "@/components/AnimatedSection";
import SearchBar from "@/components/SearchBar";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 z-10 relative">
        <AnimatedSection className="text-white text-center mb-12">
          <div className="inline-block bg-brand-yellow text-black font-medium px-4 py-1 rounded-full mb-4">
            Limited Time Offer
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Unleash Your Wanderlust<br />Book Your Next Journey
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto mb-8">
            Find and book your perfect trip with exclusive deals. Your adventure begins with TravelGo.
          </p>
        </AnimatedSection>
        
        <SearchBar />
        
        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  index === 0 ? 'w-8 bg-brand-yellow' : 'w-3 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
