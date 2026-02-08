import { Link, FileText, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Connect Job Post",
    description: "Integrate with your existing ATS like Greenhouse or Lever, or simply paste your job description directly into our portal.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Import Resumes",
    description: "Upload bulk PDFs, sync applicant folders, or let us monitor your incoming applications in real-time. No limits.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "View Ranked Shortlist",
    description: "Our AI ranks candidates based on role requirements, giving you a score and specific reasoning for every person.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to automate your recruiting pipeline and find the top 1% of talent instantly.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-background rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Step number */}
                <span className="absolute top-8 right-8 text-5xl font-bold text-muted/50">
                  {step.number}
                </span>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
