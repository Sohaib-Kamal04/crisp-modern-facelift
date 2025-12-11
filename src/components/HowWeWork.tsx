import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Request & Estimate",
    description: "The process begins when a potential client contacts the agency for a cleaning service.",
  },
  {
    number: "02",
    title: "Scheduling & Preparation",
    description: "Once the client approves the estimate, the agency schedules a date and time for the service.",
  },
  {
    number: "03",
    title: "Execution & Follow-up",
    description: "The cleaning team arrives at the scheduled time and performs the cleaning service as agreed upon.",
  },
];

const HowWeWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      const scrollStart = rect.top;
      const scrollRange = containerHeight - viewportHeight;
      
      if (scrollStart > 0) {
        setProgress(0);
      } else if (scrollStart < -scrollRange) {
        setProgress(1);
      } else {
        const currentProgress = Math.abs(scrollStart) / scrollRange;
        setProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SVG path for the wavy line connecting all three steps
  const wavyPath = "M 100 50 Q 50 150 100 250 Q 150 350 100 450 Q 50 550 150 650 L 350 650 Q 450 650 500 550 Q 550 450 500 350 Q 450 250 550 150 L 750 150 Q 850 150 900 250 Q 950 350 900 450 Q 850 550 900 650";
  
  const pathLength = 2200; // Approximate path length

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-foreground">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 text-background">
            The Way We Work
          </h2>

          {/* Steps Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* SVG Wavy Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 700"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background dashed line */}
              <path
                d={wavyPath}
                stroke="hsl(var(--primary) / 0.2)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 10"
              />
              {/* Animated solid line */}
              <path
                d={wavyPath}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength - progress * pathLength}
                style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
              />
            </svg>

            {/* Steps */}
            <div className="relative grid md:grid-cols-3 gap-8 py-12">
              {steps.map((step, index) => {
                const stepProgress = progress * 3;
                const isActive = stepProgress >= index;
                const isFullyActive = stepProgress >= index + 0.5;
                
                return (
                  <div
                    key={index}
                    className={`text-center transition-all duration-500 ${
                      index === 1 ? "md:mt-32" : "md:mt-0"
                    }`}
                    style={{
                      opacity: isActive ? 1 : 0.3,
                      transform: isFullyActive ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <span className="inline-block text-primary text-sm font-medium mb-4">
                      [ STEP {step.number} ]
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-4 text-background">
                      {step.title}
                    </h3>
                    <p className="text-background/60 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-background/40 text-xs uppercase tracking-wider">
              {progress < 1 ? "Scroll to explore" : "Continue"}
            </span>
            <div className="w-6 h-10 border-2 border-background/30 rounded-full flex justify-center pt-2">
              <div 
                className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                style={{ animationDuration: "1.5s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
