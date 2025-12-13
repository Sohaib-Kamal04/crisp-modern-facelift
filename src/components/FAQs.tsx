import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useScrollScale from "@/hooks/useScrollScale";

const faqs = [
  {
    question: "What cleaning services do you offer?",
    answer: "We offer a comprehensive range of cleaning services including residential cleaning (regular, deep, and vacate cleans), commercial cleaning for offices, restaurants, schools, gyms, and more. Each service is tailored to meet your specific needs.",
  },
  {
    question: "How do I book a cleaning service?",
    answer: "Booking is easy! Simply click the 'Get Started Now' button, select your service type, provide your home or office details, choose a convenient time slot, and complete the booking. You'll receive instant confirmation.",
  },
  {
    question: "What are your pricing options?",
    answer: "Our pricing is transparent and based on the size of your space, type of cleaning required, and any additional services you select. Get a free quote by using our online booking system to see exact pricing for your needs.",
  },
  {
    question: "Are your cleaning products safe?",
    answer: "Yes! We use eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment. If you have specific product preferences or allergies, please let us know.",
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer: "No, you don't need to be home. Many of our clients provide access via key, lockbox, or access code. We ensure secure handling and return of any keys provided.",
  },
];

const FAQs = () => {
  const { ref: sectionRef, style: scaleStyle } = useScrollScale({ threshold: 0.1 });

  return (
    <section 
      id="faqs" 
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24"
      style={scaleStyle}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Still Have{" "}
              <span className="text-gradient">Questions</span> To Answer?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Navigate to our FAQ section to find answers to common queries and 
              gain a deeper understanding of how we can meet your cleaning needs 
              with precision and care.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We believe in transparency and want to ensure that you have all the 
              information necessary to choose us with confidence.
            </p>
            <Button variant="hero">
              View All FAQs
            </Button>
          </div>

          {/* Right Column - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card rounded-2xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
