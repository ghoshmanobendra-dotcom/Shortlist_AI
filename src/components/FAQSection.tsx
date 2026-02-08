import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I upgrade or downgrade later?",
    answer:
      "Yes, you can change your plan at any time. If you upgrade, the new rate will be prorated for the current billing cycle. Downgrades take effect at the end of the current cycle.",
  },
  {
    question: "What happens if I reach my resume limit?",
    answer:
      'Once you hit your limit, you can choose to upgrade to a higher tier or wait until the next billing cycle. We also offer one-time "top-up" packs for high-volume months.',
  },
  {
    question: "Do you offer custom enterprise plans?",
    answer:
      "Absolutely. For teams processing more than 1,000 resumes per month, please contact our sales team for a custom solution tailored to your workflow.",
  },
  {
    question: "How accurate is the AI matching?",
    answer:
      "Our AI achieves 94%+ accuracy in matching candidates to job requirements, based on extensive testing across thousands of hiring decisions. Each match includes detailed reasoning so you understand exactly why a candidate scored the way they did.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use enterprise-grade encryption, row-level security, and strict access controls. Your candidate data is never shared with third parties and is automatically deleted after your retention period.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
