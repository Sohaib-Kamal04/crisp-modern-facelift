"use client";

import { useEffect, useState, useRef } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
  speed: number;
  opacity: number;
  isLarge: boolean;
}

const ParallaxBubbles = () => {
  const [scrollY, setScrollY] = useState(0);
  const bubblesRef = useRef<Bubble[]>([]);

  // Generate bubbles only once
  if (bubblesRef.current.length === 0) {
    // INCREASED: Total bubbles to 40
    bubblesRef.current = Array.from({ length: 40 }, (_, i) => {
      // INCREASED: First 5 bubbles are "Large"
      const isLarge = i < 5;

      // SIZE: Large = 200-400px, Small = 10-60px
      const size = isLarge 
        ? Math.random() * 200 + 200 
        : Math.random() * 50 + 10;

      // LEFT POSITIONing
      let left;
      if (isLarge) {
        // Large bubbles stick to the sides but overlap the screen more
        // Left side (-10% to 5%) OR Right side (85% to 100%)
        left = Math.random() > 0.5 
          ? Math.random() * 15 - 10  // Left Edge
          : Math.random() * 15 + 85; // Right Edge
      } else {
        // Small bubbles scattered everywhere (-5% to 105%)
        left = Math.random() * 110 - 5;
      }

      return {
        id: i,
        size,
        left,
        // Spread vertically across 400vh (adjust if your site is shorter/longer)
        top: Math.random() * 400, 
        
        // Speed: Large moves faster (foreground effect)
        speed: isLarge 
          ? Math.random() * 0.3 + 0.4 
          : Math.random() * 0.1 + 0.05,
          
        // Opacity: Made large bubbles slightly more visible
        opacity: isLarge 
          ? Math.random() * 0.1 + 0.1  // 0.10 to 0.20
          : Math.random() * 0.15 + 0.05, // 0.05 to 0.20
        
        isLarge,
      };
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubblesRef.current.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-primary will-change-transform"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}vh`,
            opacity: bubble.opacity,
            // REDUCED BLUR: 40px is soft but visible. 80px was too faint.
            filter: bubble.isLarge ? 'blur(10px)' : 'blur(1px)',
            transform: `translate3d(0, ${-scrollY * bubble.speed}px, 0)`,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBubbles;
