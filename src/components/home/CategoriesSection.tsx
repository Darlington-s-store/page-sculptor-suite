
import AnimatedSection from "@/components/AnimatedSection";
import CategoryCard from "@/components/CategoryCard";
import SectionHeader from "@/components/SectionHeader";
import { categories } from "@/data/homeData";

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Top Categories of Tours"
          subtitle="Explore our wide variety of tour categories to find your perfect adventure."
          showButton={true}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category, index) => (
            <AnimatedSection key={index} delay={100 * index}>
              <CategoryCard {...category} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
