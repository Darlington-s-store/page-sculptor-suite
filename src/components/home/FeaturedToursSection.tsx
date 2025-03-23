
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import TourCard from "@/components/TourCard";
import { featuredTours } from "@/data/homeData";

const FeaturedToursSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Our Featured Tours"
          subtitle="Handpicked tours to make your journey unforgettable. Explore our most popular destinations."
          showButton={true}
          buttonText="View All Tours"
          buttonLink="/tours"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTours.map((tour) => (
            <AnimatedSection key={tour.id} delay={100 * parseInt(tour.id)}>
              <TourCard {...tour} featured={parseInt(tour.id) === 1} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedToursSection;
