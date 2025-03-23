
import AnimatedSection from "@/components/AnimatedSection";

const SubscribeSection = () => {
  return (
    <section className="py-16 bg-brand-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-block bg-brand-yellow text-black font-medium px-4 py-1 rounded-full mb-4">
              Newsletter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-gray-300 mb-6">
              Join our mailing list to receive travel inspiration, exclusive deals, and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg flex-1 text-gray-800"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
