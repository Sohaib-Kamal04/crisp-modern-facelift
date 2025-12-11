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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much we've scrolled into the section
      // The section is 300vh tall, and the sticky content is 100vh
      // So we have 200vh of "scroll space" to animate through
      const scrollableDistance = sectionHeight - windowHeight;
      
      if (sectionTop >= 0) {
        // Haven't entered the section yet
        setProgress(0);
      } else if (Math.abs(sectionTop) >= scrollableDistance) {
        // Past the section
        setProgress(1);
      } else {
        // Currently in the section - calculate progress
        const currentProgress = Math.abs(sectionTop) / scrollableDistance;
        setProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SVG path for the wavy line
  const wavyPath = "M 50 80 C 50 200, 150 300, 150 400 C 150 500, 50 550, 150 650 L 500 650 C 600 650, 650 550, 650 450 C 650 350, 550 300, 550 200 C 550 100, 650 80, 750 80 L 950 80";
  
  const pathLength = 2500;

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-foreground"
      style={{ height: "300vh" }}
    >
      {/* Sticky container - this stays fixed while scrolling through the section */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-20 text-background">
            The Way We Work
          </h2>

          {/* Steps Container */}
          <div className="relative max-w-5xl mx-auto h-[400px]">
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
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8 8"
              />
              {/* Animated solid line */}
              <path
                d={wavyPath}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength - (progress * pathLength),
                  transition: "stroke-dashoffset 0.1s ease-out",
                }}
              />
            </svg>

            {/* Steps positioned along the path */}
            <div className="absolute inset-0">
              {steps.map((step, index) => {
                const stepThreshold = index / steps.length;
                const isActive = progress >= stepThreshold;
                const isFullyActive = progress >= stepThreshold + 0.15;
                
                // Position each step
                const positions = [
                  { left: "5%", top: "10%" },
                  { left: "35%", top: "70%" },
                  { left: "70%", top: "5%" },
                ];
                
                return (
                  <div
                    key={index}
                    className="absolute w-64 text-center transition-all duration-500 ease-out"
                    style={{
                      left: positions[index].left,
                      top: positions[index].top,
                      opacity: isActive ? 1 : 0.2,
                      transform: isFullyActive ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                    }}
                  >
                    <span className="inline-block text-primary text-sm font-medium mb-3 tracking-wider">
                      [ STEP {step.number} ]
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-background">
                      {step.title}
                    </h3>
                    <p className="text-background/50 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="w-24 h-1 bg-background/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-background/40 text-xs uppercase tracking-wider">
              {progress < 1 ? "Scroll to continue" : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
