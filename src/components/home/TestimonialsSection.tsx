
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/homeData";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <SectionHeader
            title="Don't take our word for it"
            subtitle="Hear what our customers have to say about their experiences with us."
            className="mb-0"
          />
          
          <div className="hidden md:flex space-x-2">
            <button className="p-2 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full border border-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={100 * index}>
              <TestimonialCard {...testimonial} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
