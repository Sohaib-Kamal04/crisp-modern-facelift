import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jonathan Kim",
    role: "Valued Client",
    content: "Crisp Cleaning transformed my space. Highly recommend their services!",
    avatar: "JK",
  },
  {
    name: "Emily Rose",
    role: "Valued Client",
    content: "The attention to detail is impeccable. My home has never looked this clean and organized.",
    avatar: "ER",
  },
  {
    name: "James Rodriguez",
    role: "Valued Client",
    content: "The team went above and beyond to ensure every nook and cranny was spotless.",
    avatar: "JR",
  },
];

const featuredTestimonials = [
  {
    name: "Jonathan Kong",
    content: "I've used several cleaning services in the past, but Crisp Cleaning Corp truly stands out. Their professionalism and attention to detail are unmatched.",
    avatar: "JK",
  },
  {
    name: "Emily Johnson",
    content: "The attention to detail is impeccable. My home has never looked this clean and organized. I'll definitely be using their services again!",
    avatar: "EJ",
  },
  {
    name: "Michael Chen",
    content: "The team went above and beyond to ensure every nook and cranny was spotless. Outstanding service from start to finish.",
    avatar: "MC",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Don't Take Our Word For It
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a look at what our valued clients have to say
          </p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative mb-16">
          <div className="flex gap-6 animate-scroll">
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonials */}
        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
            Some Valued People Talking About{" "}
            <span className="text-gradient">Our Company</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 hover-lift"
              >
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">Verified Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero-outline" size="lg">
            Discover More Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
