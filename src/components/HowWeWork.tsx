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
  const containerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [exitProgress, setExitProgress] = useState(0);

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

  // 3. Handle Scroll with entry/exit transitions
  useEffect(() => {
    if (!isDesktop) {
      setSectionVisible(true);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Entry detection - starts when section enters viewport
      const entryStart = windowHeight;
      const entryEnd = windowHeight * 0.3;
      
      // Calculate section visibility for scale animation
      if (rect.top < entryStart && rect.top > entryEnd) {
        const entryProgress = 1 - (rect.top - entryEnd) / (entryStart - entryEnd);
        setSectionVisible(entryProgress > 0.3);
      } else if (rect.top <= entryEnd) {
        setSectionVisible(true);
      } else {
        setSectionVisible(false);
      }

      // Calculate line animation progress
      const scrollDist = rect.height - windowHeight * 0.9;
      const scrolled = -rect.top;

      if (scrolled < 0) setProgress(0);
      else if (scrolled > scrollDist) setProgress(1);
      else setProgress(scrolled / scrollDist);

      // Calculate exit progress for fade out
      const exitStart = rect.height - windowHeight * 1.5;
      const exitEnd = rect.height - windowHeight * 0.5;
      if (scrolled > exitStart && scrolled < exitEnd) {
        setExitProgress((scrolled - exitStart) / (exitEnd - exitStart));
      } else if (scrolled >= exitEnd) {
        setExitProgress(1);
      } else {
        setExitProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathLength, isDesktop]);

  // Calculate dynamic styles for smooth transitions
  const sectionScale = sectionVisible ? 1 : 0.5;
  const sectionOpacity = sectionVisible ? 1 : 0;
  const bgOpacity = sectionVisible ? (1 - exitProgress * 0.3) : 0;

  // UPDATED PATH: The "Red Line" Arch / Ohm Symbol
  const redLinePath = "M 50 600 C 250 600, 350 100, 500 100 S 750 600, 950 600";

  return (
    <section 
      ref={containerRef} 
      className="relative rounded-2xl"
      style={{ 
        height: isDesktop ? "180vh" : "auto",
      }}
    >
      {/* Background layer with its own transition */}
      <div 
        className="absolute inset-0 bg-foreground rounded-2xl"
        style={{
          opacity: bgOpacity,
          transform: `scale(${sectionScale})`,
          borderRadius: sectionVisible ? "0" : "2rem",
          transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), border-radius 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      
      <div 
        className={`
          relative w-full px-6 py-20 text-background
          md:sticky md:top-0 md:h-[90vh] md:max-h-[90vh] md:flex md:flex-col md:items-center md:pt-28 md:pb-8 md:overflow-hidden
        `}
        style={{
          transform: `scale(${sectionScale})`,
          opacity: sectionOpacity,
          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 md:mb-0 md:shrink-0 text-background z-20">
          The Way We Work
        </h2>

        {/* VISUALIZATION AREA */}
        <div className="relative w-full max-w-6xl mx-auto md:flex-1 md:min-h-0 md:flex md:items-center md:justify-center">
          
          <div className="md:relative md:w-full md:aspect-[1100/700] md:max-h-full">
            
            {/* SVG Line */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1100 700"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ghost Line (Grey Background) */}
              <path
                d={redLinePath}
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 8"
              />
              {/* Animated Line (Primary Color) */}
              <path
                ref={pathRef}
                d={redLinePath}
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
                
                // POSITIONS:
                // Card 1: Top Left
                // Card 2: Bottom Center
                // Card 3: Top Right
                const desktopPositions = [
                  { left: "2%", top: "5%" }, 
                  { left: "50%", bottom: "5%", x: "-50%" }, 
                  { left: "auto", right: "2%", top: "5%" }, 
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
