import { FeaturedServicesGrid } from "@/components/FeaturedServicesGrid";
import ServicesCarousel from "@/components/ServicesCarousel";

/**
 * Home: featured service grid (static) + full list in carousel (no autoplay).
 */
export function HomeServicesSection() {
  return (
    <section className="bg-white" aria-labelledby="home-services-heading">
      <FeaturedServicesGrid />
      <ServicesCarousel
        heading="Explore all services"
        autoplayEnabled={false}
        sectionClassName="border-t border-slate-100 pt-6 pb-12 md:pt-8"
      />
    </section>
  );
}
