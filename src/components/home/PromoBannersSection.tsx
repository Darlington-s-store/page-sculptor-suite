
import AnimatedSection from "@/components/AnimatedSection";

const PromoBannersSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection>
            <div className="rounded-xl overflow-hidden relative h-64 bg-brand-teal shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-teal to-brand-teal/60"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-center">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Wake up to a<br />
                  <span className="text-3xl">sunny paradise</span>
                </h3>
                <p className="text-white/90 mb-4">Book beach getaways at 25% off</p>
                <a href="/offers" className="btn-primary inline-block w-max">
                  View Offers
                </a>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
                alt="Beach Getaway" 
                className="absolute right-0 h-full w-1/2 object-cover object-left"
              />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="rounded-xl overflow-hidden relative h-64 bg-brand-blue shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue/60"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-center">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Experience true<br />
                  <span className="text-3xl">adventure</span>
                </h3>
                <p className="text-white/90 mb-4">Adventure tours starting at $399</p>
                <a href="/tours/adventure" className="btn-primary inline-block w-max">
                  Book Now
                </a>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1527585743534-7113e3211270" 
                alt="Adventure Tour" 
                className="absolute right-0 h-full w-1/2 object-cover object-left"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default PromoBannersSection;
