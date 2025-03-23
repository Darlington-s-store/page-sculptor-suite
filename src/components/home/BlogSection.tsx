
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import SectionHeader from "@/components/SectionHeader";
import { blogPosts } from "@/data/homeData";

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="News, Tips & Guides"
          subtitle="Stay up to date with the latest travel news and helpful tips for your next adventure."
          showButton={true}
          buttonText="View All Posts"
          buttonLink="/blog"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={100 * index}>
              <BlogCard {...post} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
