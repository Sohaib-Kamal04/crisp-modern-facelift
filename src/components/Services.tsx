import { Home, Building2, ChevronDown } from "lucide-react";

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
    // BACKGROUND: Kept bg-secondary/30 to blend with surrounding sections
    <section id="services" className="py-24 bg-secondary/30 relative overflow-hidden">
      
      {/* DECORATIVE BUBBLES: Pushed to far edges so they don't overlap text */}
      <div className="absolute top-20 left-[-50px] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[-50px] w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* DARK ROUNDED CARD CONTAINER */}
        <div className="bg-secondary text-secondary-foreground rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative">
            
            {/* Section Header */}
            <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4 border border-primary/10">
                Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
                Receive a <span className="text-gradient">FREE</span> Quote
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
                What type of project? Please provide what type of cleaning.
            </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
                <div
                key={service.title}
                // Changed card bg to be slightly lighter than container for depth
                className="group glass-card rounded-2xl p-8 hover-lift cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">
                    {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                    {service.description}
                </p>
                </div>
            ))}
            </div>

            {/* INDICATOR ARROW */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <ChevronDown className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
