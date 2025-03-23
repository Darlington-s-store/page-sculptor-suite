
import AnimatedSection from "@/components/AnimatedSection";
import HotelCard from "@/components/HotelCard";
import SectionHeader from "@/components/SectionHeader";
import { hotels } from "@/data/homeData";

const HotelsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Top Rated Hotels"
          subtitle="Stay in comfort with our selection of the highest-rated accommodations worldwide."
          showButton={true}
          buttonText="View All Hotels"
          buttonLink="/hotels"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel, index) => (
            <AnimatedSection key={hotel.id} delay={100 * index}>
              <HotelCard {...hotel} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;
