import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, if not, standard template literals work

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

  // 1. Check Screen Size (Mobile vs Desktop)
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop(); // Initial check
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // 2. Calculate SVG length (Desktop only)
  useEffect(() => {
    if (isDesktop && pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [isDesktop]);

  // 3. Handle Scroll (Desktop only)
  useEffect(() => {
    if (!isDesktop) return; // Skip scroll logic on mobile

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

  const wavyPath = "M 50 80 C 50 200, 150 300, 150 400 C 150 500, 50 550, 150 650 L 500 650 C 600 650, 650 550, 650 450 C 650 350, 550 300, 550 200 C 550 100, 650 80, 750 80 L 950 80";

  return (
    <section 
      ref={containerRef} 
      className="relative bg-foreground text-background"
      // Mobile: Auto height | Desktop: 300vh for scroll space
      style={{ height: isDesktop ? "300vh" : "auto" }}
    >
      {/* CONTAINER WRAPPER 
        Mobile: Padding & Block layout
        Desktop: Sticky & Flex layout
      */}
      <div className={`
        w-full px-6 py-20
        md:sticky md:top-0 md:h-screen md:flex md:items-center md:justify-center md:overflow-hidden md:py-0
      `}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 md:mb-20 text-background">
            The Way We Work
          </h2>

          {/* Visualization Area */}
          <div className="relative max-w-5xl mx-auto md:h-[500px]">
            
            {/* SVG Wavy Line - HIDDEN ON MOBILE */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 700"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={wavyPath}
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 8"
              />
              <path
                ref={pathRef}
                d={wavyPath}
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
            <div className={`
              /* Mobile: Flex Column Layout */
              flex flex-col gap-12
              
              /* Desktop: Absolute Full Layout */
              md:block md:absolute md:inset-0
            `}>
              {steps.map((step, index) => {
                // Desktop Positioning Logic
                const thresholds = [0.1, 0.5, 0.9];
                const isActive = isDesktop ? progress >= thresholds[index] : true;
                
                const desktopPositions = [
                  { left: "5%", top: "10%" },
                  { left: "45%", top: "60%" },
                  { left: "75%", top: "5%" },
                ];

                // Dynamic Style Object (Only applied on Desktop)
                const desktopStyle = isDesktop ? {
                  left: desktopPositions[index].left,
                  top: desktopPositions[index].top,
                  opacity: isActive ? 1 : 0.2,
                  transform: isActive ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
                  filter: isActive ? "blur(0px)" : "blur(2px)",
                } : {};

                return (
                  <div
                    key={index}
                    className={`
                      /* Common transitions */
                      transition-all duration-700 ease-out
                      
                      /* Mobile Styles: Relative, Centered, Lines connecting items */
                      relative w-full max-w-md mx-auto
                      
                      /* Desktop Styles: Absolute, Fixed width */
                      md:absolute md:w-72 md:m-0
                    `}
                    style={desktopStyle}
                  >
                    {/* Mobile Only: Vertical Line Connector */}
                    <div className="md:hidden absolute left-4 top-16 bottom-[-3rem] w-0.5 bg-primary/20 last:hidden" />

                    <div className="bg-background/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 relative z-10">
                      <span className="inline-block text-primary text-xs font-bold mb-3 px-2 py-1 bg-primary/10 rounded">
                        STEP {step.number}
                      </span>
                      <h3 className="text-xl font-display font-bold mb-3 text-background">
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
