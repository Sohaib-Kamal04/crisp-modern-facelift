import { Home, Building2, ChevronLeft, ChevronRight } from "lucide-react";

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
  // Mock state for the progress indicator
  const currentStep = 1; 
  const totalSteps = 4;

  return (
    <section id="services" className="py-24 bg-secondary/30 relative overflow-hidden">
      
      {/* --- OUTSIDE BUBBLES (Behind the main white card) --- */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- BOOKING FORM CONTAINER (White Card for Contrast) --- */}
        <div className="bg-white rounded-[3rem] shadow-2xl relative overflow-hidden max-w-6xl mx-auto min-h-[600px] flex flex-col justify-center py-16 px-8 md:px-20">
          
          {/* --- INSIDE BUBBLES (Inside the white card) --- */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          {/* --- NAVIGATION ARROWS --- */}
          {/* Left Arrow */}
          <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md transition-all z-20 group">
            <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </button>
          
          {/* Right Arrow */}
          <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md transition-all z-20 group">
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </button>

          {/* --- MAIN CONTENT --- */}
          <div className="relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Step 1 of {totalSteps}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Receive a <span className="text-gradient">FREE</span> Quote
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                What type of project? Please provide what type of cleaning you require.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="group glass-card bg-secondary/10 border-transparent hover:border-primary/20 rounded-2xl p-8 hover-lift cursor-pointer transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* --- PAGINATION DOTS (Progress Indicator) --- */}
          <div className="flex justify-center gap-3 mt-12 relative z-20">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`
                  h-2.5 rounded-full transition-all duration-300
                  ${index + 1 === currentStep 
                    ? "w-8 bg-black" // Active: Long & Black
                    : "w-2.5 bg-gray-300 hover:bg-gray-400" // Inactive: Small & Grey
                  }
                `}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
