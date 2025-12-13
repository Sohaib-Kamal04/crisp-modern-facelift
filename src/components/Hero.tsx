"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [scale, setScale] = useState(1);
  const [radius, setRadius] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on first 500px of scrolling
      // You can adjust '500' to make the animation faster or slower
      const progress = Math.min(scrollY / 300, 1);

      // SCALE: Shrink from 1.0 down to 0.9
      const newScale = 1 - (progress * 0.05); 
      
      // RADIUS: Go from 0px to 40px
      const newRadius = progress * 40;

      setScale(newScale);
      setRadius(newRadius);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // 1. SCROLL TRACK: Taller than screen (150vh) to allow scrolling time for animation
    <div ref={containerRef} className="relative h-[150vh] bg-background">
      
      {/* 2. STICKY WRAPPER: Stays pinned to the viewport while shrinking */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* 3. ANIMATED CARD: The actual hero content that shrinks */}
        <div 
          className="relative w-full h-full overflow-hidden shadow-2xl transition-transform duration-100 ease-linear will-change-transform"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${radius}px`,
          }}
        >
          {/* VIDEO BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Brighter Overlay (30% opacity) */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Main Content */}
          <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center pt-20">
            <div className="max-w-4xl mx-auto text-center">
              
              {/* Eyebrow */}
              <div className="animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-8 border border-white/20 shadow-lg">
                  Professional Cleaning Services
                </span>
              </div>

              {/* Main headline */}
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-up opacity-0 text-white drop-shadow-md"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Transforming Spaces,{" "}
                <span className="text-primary-foreground">One Clean</span>{" "}
                at a Time
              </h1>

              {/* Subheadline */}
              <p 
                className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 drop-shadow-sm font-medium"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                Explore our range of cleaning solutions and experience the difference 
                of a pristine space today.
              </p>

              {/* CTAs */}
              <div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0"
                style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
              >
                <Button variant="hero" size="xl" className="shadow-xl shadow-primary/20">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="hero-outline" 
                  size="xl" 
                  className="text-white border-white hover:bg-white hover:text-primary transition-all duration-300 shadow-lg"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust indicators */}
              <div 
                className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80 animate-fade-up opacity-0"
                style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border-2 border-transparent flex items-center justify-center text-xs font-medium text-white shadow-sm"
                      >
                        {["J", "E", "M", "S"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm drop-shadow-sm">
                    <strong className="text-white">500+</strong> Happy Clients
                  </span>
                </div>
                <div className="h-6 w-px bg-white/30 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm drop-shadow-sm">
                    <strong className="text-white">4.9</strong> Average Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
