import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart2, Sliders, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bias-Free Evaluation",
    description: "Our LLMs focus purely on competency and experience, ensuring every candidate gets a fair shot based on merit.",
    large: true,
  },
  {
    icon: BarChart2,
    title: "Deep Insights",
    description: "Detailed scoring explanations for every single applicant.",
    large: false,
  },
  {
    icon: RefreshCw,
    title: "Seamless Sync",
    description: "Syncs back to your ATS instantly.",
    large: false,
  },
  {
    icon: Sliders,
    title: "Custom Scoring Models",
    description: "Define what matters to your culture. Set custom weightings for technical skills, soft skills, or years of industry experience.",
    large: true,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for High-Growth Teams
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Powerful features that help you hire better, faster, and without the bias of manual screening.
            </p>
          </div>
          <Button variant="link" className="mt-4 md:mt-0">
            Explore all features
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl overflow-hidden ${
                feature.large ? "md:col-span-1 lg:row-span-1" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted" />
              <div className="relative p-8 h-full flex flex-col justify-end min-h-[240px]">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
