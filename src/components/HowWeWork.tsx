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
      const windowHeight = window.innerHeight;
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

  // UPDATED PATH: A simple rounded "U" curve (Quadratic Bezier)
  // Starts Top Left (50, 150) -> Dips to Bottom Center (500, 600) -> Ends Top Right (950, 150)
  const simplePath = "M 50 150 Q 500 600 950 150";

  return (
    <section 
      ref={containerRef} 
      className="relative bg-foreground text-background"
      // UPDATED HEIGHT: Reduced from 300vh to 175vh for a shorter, faster workflow
      style={{ height: isDesktop ? "175vh" : "auto" }}
    >
      <div className={`
        w-full px-6 py-20
        md:sticky md:top-0 md:h-screen md:max-h-screen md:flex md:flex-col md:items-center md:pt-28 md:pb-8 md:overflow-hidden
      `}>
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 md:mb-0 md:shrink-0 text-background z-20">
          The Way We Work
        </h2>

        {/* VISUALIZATION AREA */}
        <div className="relative w-full max-w-6xl mx-auto md:flex-1 md:min-h-0 md:flex md:items-center md:justify-center">
          
          <div className="md:relative md:w-full md:aspect-[1000/700] md:max-h-full">
            
            {/* SVG Wavy Line */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 700"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={simplePath}
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 8"
              />
              <path
                ref={pathRef}
                d={simplePath}
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
                
                const desktopPositions = [
                  { left: "2%", top: "15%" },  // Adjusted top slightly to match new curve start
                  { left: "50%", top: "auto", bottom: "15%", x: "-50%" }, // Adjusted bottom for curve dip
                  { left: "auto", right: "2%", top: "15%" }, // Adjusted top to match new curve end
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
