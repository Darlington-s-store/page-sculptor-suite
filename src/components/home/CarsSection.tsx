
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import CarCard from "@/components/CarCard";
import SectionHeader from "@/components/SectionHeader";
import { cars } from "@/data/carsData";

const CarsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Recent Launched Car"
          subtitle="Choose from our fleet of recently added, top-quality vehicles for your journey."
          showButton={true}
          buttonText="View All Cars"
          buttonLink="/cars"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.slice(0, 4).map((car, index) => (
            <AnimatedSection key={car.id} delay={100 * index}>
              <CarCard {...car} />
            </AnimatedSection>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/cars" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue shadow-sm hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
          >
            Browse All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
