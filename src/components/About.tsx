import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useScrollScale from "@/hooks/useScrollScale";

const About = () => {
  const [yearsCount, setYearsCount] = useState(0);
  const counterRef = useRef(null);
  const { ref: sectionRef, style: scaleStyle } = useScrollScale({ threshold: 0.15 });
  
  // CONFIGURATION: Set your start year here
  const startYear = 2015;
  
  // Calculate total years dynamically
  const currentYear = new Date().getFullYear();
  const totalYears = currentYear - startYear;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start animation when element is visible
          let start = 0;
          const end = totalYears;
          const duration = 1300; // 2 seconds animation
          const incrementTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            setYearsCount(start);
            if (start === end) clearInterval(timer);
          }, incrementTime);

          // Stop observing after animation starts
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [totalYears]);

  return (
    <section 
      id="about" 
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24"
      style={scaleStyle}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Get To Know{" "}
              <span className="text-gradient">Our Story</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Curious about the heart behind our pristine services? Dive into the 
              essence of Crisp Cleaning by exploring our story. Discover the passion, 
              values, and commitment that drive us to elevate the standards of cleanliness.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We believe that a clean space is more than just visually appealing—it's 
              about creating environments where people can thrive, work better, and 
              live happier lives.
            </p>
            <Button variant="hero">
              About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative z-10">
              <div 
                ref={counterRef}
                className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-7xl font-display font-bold text-gradient mb-4 tabular-nums">
                    {yearsCount}+
                  </div>
                  <p className="text-muted-foreground text-lg">Years of Excellence</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">Since {startYear}</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-2xl -z-0" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
