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
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  // 1. Calculate the exact length of the SVG path on mount
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // 2. Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // The element is sticky for the duration of: Container Height - Window Height
      const scrollDist = rect.height - windowHeight;
      
      // Calculate how far we have scrolled past the top of the container
      // Rect.top is positive when entering, negative when scrolling through
      const scrolled = -rect.top; 

      if (scrolled < 0) {
        setProgress(0);
      } else if (scrolled > scrollDist) {
        setProgress(1);
      } else {
        setProgress(scrolled / scrollDist);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathLength]); // Recalculate if path length changes (unlikely but safe)

  // SVG path for the wavy line
  const wavyPath = "M 50 80 C 50 200, 150 300, 150 400 C 150 500, 50 550, 150 650 L 500 650 C 600 650, 650 550, 650 450 C 650 350, 550 300, 550 200 C 550 100, 650 80, 750 80 L 950 80";

  return (
    <section 
      ref={containerRef} 
      className="relative bg-foreground"
      // 300vh means: 1 screen to view, 2 screens of scrolling duration
      style={{ height: "300vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 md:mb-20 text-background">
            The Way We Work
          </h2>

          {/* Visualization Container */}
          <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px]">
            {/* SVG Wavy Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 700"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ghost Path (Background) */}
              <path
                d={wavyPath}
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 8"
              />
              
              {/* Animated Path (Foreground) */}
              <path
                ref={pathRef}
                d={wavyPath}
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: pathLength,
                  // If pathLength is 0 (initial render), hide the line
                  strokeDashoffset: pathLength === 0 ? 0 : pathLength - (progress * pathLength),
                  // Removing transition creates a 1:1 feel with scroll. 
                  // Add it back if you want it 'smooth' but laggy.
                }}
              />
            </svg>

            {/* Steps Nodes */}
            <div className="absolute inset-0">
              {steps.map((step, index) => {
                // Adjust thresholds to match where the curves actually are in the SVG
                const thresholds = [0.1, 0.5, 0.9];
                const isActive = progress >= thresholds[index];
                
                // CSS positions matching the SVG curve points approximately
                const positions = [
                  { left: "5%", top: "10%" },   // Start
                  { left: "45%", top: "60%" },  // Middle Dip
                  { left: "75%", top: "5%" },   // End High
                ];
                
                return (
                  <div
                    key={index}
                    className="absolute w-64 md:w-72 transition-all duration-700 ease-out"
                    style={{
                      left: positions[index].left,
                      top: positions[index].top,
                      opacity: isActive ? 1 : 0.2,
                      transform: isActive ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }}
                  >
                    <div className="bg-background/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                      <span className="inline-block text-primary text-xs font-bold mb-2 px-2 py-1 bg-primary/10 rounded">
                        STEP {step.number}
                      </span>
                      <h3 className="text-xl font-display font-bold mb-2 text-background">
                        {step.title}
                      </h3>
                      <p className="text-background/60 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;