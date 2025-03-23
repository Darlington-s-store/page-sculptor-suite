
import AnimatedSection from './AnimatedSection';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  centered?: boolean;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  centered = false,
  showButton = false,
  buttonText = 'View All',
  buttonLink = '#',
  className = '',
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col md:flex-row ${centered ? 'text-center items-center justify-center' : 'items-start justify-between'} mb-8 ${className}`}>
      <AnimatedSection className="mb-4 md:mb-0">
        <div>
          <h2 className={`section-title ${centered ? 'after:left-1/2 after:-translate-x-1/2' : ''}`}>
            {title}
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg">{subtitle}</p>
        </div>
      </AnimatedSection>
      
      {showButton && (
        <AnimatedSection delay={200}>
          <a 
            href={buttonLink}
            className="px-5 py-2 border-2 border-brand-blue text-brand-blue rounded-lg font-medium transition-colors hover:bg-brand-blue hover:text-white"
          >
            {buttonText}
          </a>
        </AnimatedSection>
      )}
    </div>
  );
};

export default SectionHeader;
