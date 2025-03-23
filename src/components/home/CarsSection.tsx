
import AnimatedSection from "@/components/AnimatedSection";
import CarCard from "@/components/CarCard";
import SectionHeader from "@/components/SectionHeader";
import { cars } from "@/data/homeData";

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
          {cars.map((car, index) => (
            <AnimatedSection key={car.id} delay={100 * index}>
              <CarCard {...car} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
