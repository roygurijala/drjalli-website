import { ServicesGridNew } from "@/components/ServicesGridNew";
import { InsuranceHighlightSection } from "@/components/InsuranceHighlightSection";
export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Services
      </h1>
      <p className="mt-3 text-sm text-slate-700 max-w-3xl">
        We provide comprehensive primary care for adults, with a focus on
        prevention, chronic disease management, and lifestyle support.
      </p>
      <ServicesGridNew />
    </div>
  );
}
