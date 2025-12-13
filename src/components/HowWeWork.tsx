"use client";

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
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // 1. Check Screen Size
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop(); 
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // 2. Calculate SVG length
  useEffect(() => {
    if (isDesktop && pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [isDesktop]);

  // 3. Handle Scroll
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // We calculate based on the reduced height (90vh)
      const windowHeight = window.innerHeight * 0.9; 
      const scrollDist = rect.height - windowHeight;
      const scrolled = -rect.top;

      if (scrolled < 0) setProgress(0);
      else if (scrolled > scrollDist) setProgress(1);
      else setProgress(scrolled / scrollDist);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathLength, isDesktop]);

  // UPDATED PATH: "Ohm/Wave" Style
  // 1. Start: x=150, y=350 (Under Card 1)
  // 2. Curve to: x=500, y=80  (Top of Card 2)
  // 3. Curve to: x=850, y=650 (Bottom of Card 3)
  const wavePath = "M 150 350 C 300 350, 350 80, 500 80 C 650 80, 700 650, 850 650";

  return (
    <section 
      ref={containerRef} 
      className="relative bg-foreground text-background"
      // HEIGHT: Reduced scroll track to 180vh (fast scroll)
      style={{ height: isDesktop ? "180vh" : "auto" }}
    >
      <div className={`
        w-full px-6 py-20
        /* STICKY CONTAINER: Reduced to 90vh (90% viewport) as requested */
        md:sticky md:top-0 md:h-[90vh] md:max-h-[90vh] md:flex md:flex-col md:items-center md:pt-28 md:pb-8 md:overflow-hidden
      `}>
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 md:mb-0 md:shrink-0 text-background z-20">
          The Way We Work
        </h2>

        {/* VISUALIZATION AREA */}
        <div className="relative w-full max-w-6xl mx-auto md:flex-1 md:min-h-0 md:flex md:items-center md:justify-center">
          
          <div className="md:relative md:w-full md:aspect-[1000/700] md:max-h-full">
            
            {/* SVG Line */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 700"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={wavePath}
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 8"
              />
              <path
                ref={pathRef}
                d={wavePath}
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength === 0 ? 0 : pathLength - (progress * pathLength),
                }}
              />
            </svg>

            {/* Steps Container */}
            <div className="flex flex-col gap-12 md:block md:absolute md:inset-0">
              {steps.map((step, index) => {
                const thresholds = [0.1, 0.5, 0.9];
                const isActive = isDesktop ? progress >= thresholds[index] : true;
                
                // NEW POSITIONS to match the "Wave" path
                const desktopPositions = [
                  // Card 1: Top Left (Line starts UNDER it)
                  { left: "2%", top: "10%" }, 
                  // Card 2: Top Center (Line hits TOP of it)
                  { left: "50%", top: "12%", x: "-50%" }, 
                  // Card 3: Bottom Right (Line hits BOTTOM of it)
                  { left: "auto", right: "2%", bottom: "10%" }, 
                ];

                const pos = desktopPositions[index];

                const desktopStyle = isDesktop ? {
                  left: pos.left,
                  right: pos.right,
                  top: pos.top,
                  bottom: pos.bottom,
                  transform: `translate(${pos.x || '0'}, ${isActive ? '0' : '40px'}) scale(${isActive ? 1 : 0.9})`,
                  opacity: isActive ? 1 : 0.2,
                  filter: isActive ? "blur(0px)" : "blur(2px)",
                } : {};

                return (
                  <div
                    key={index}
                    className={`
                      transition-all duration-700 ease-out
                      relative w-full max-w-md mx-auto
                      md:absolute md:w-60 lg:w-72 md:m-0
                    `}
                    style={desktopStyle}
                  >
                    <div className="md:hidden absolute left-4 top-16 bottom-[-3rem] w-0.5 bg-primary/20 last:hidden" />

                    <div className="bg-background/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 relative z-10">
                      <span className="inline-block text-primary text-xs font-bold mb-2 px-2 py-1 bg-primary/10 rounded">
                        STEP {step.number}
                      </span>
                      <h3 className="text-lg md:text-xl font-display font-bold mb-2 text-background">
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
