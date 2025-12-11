import { Home, Building2 } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description:
      "Bring a breath of fresh air and elevate your living spaces with our residential cleaning services, designed to bring comfort and hygiene to your home.",
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description:
      "Our commercial cleaning services are tailored to meet the unique demands of offices, restaurants, schools, gyms... you name it!",
  },
];

const Services = () => {
  return (
    // Updated background to bg-secondary/30
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Receive a <span className="text-gradient">FREE</span> Quote
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            What type of project? Please provide what type of cleaning.
          </p>
        </div>

        {/* Wrapper for visuals to anchor the floating bubbles */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Decorative elements (Bubbles) - Placed behind the grid */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-2xl -z-0" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full -z-0" />

          {/* Service Cards Grid */}
          {/* Added relative and z-10 to ensure cards sit above the bubbles */}
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group glass-card rounded-2xl p-8 hover-lift cursor-pointer bg-background/60 backdrop-blur-sm border border-white/10"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
