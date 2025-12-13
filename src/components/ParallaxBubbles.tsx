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
    // INCREASED: Total bubbles to 80 for much better density
    bubblesRef.current = Array.from({ length: 80 }, (_, i) => {
      // Keep about 6 "Large" bubbles, rest are small
      const isLarge = i < 6;

      // SIZE
      const size = isLarge 
        ? Math.random() * 200 + 200 
        : Math.random() * 50 + 10;

      // LEFT POSITIONing
      let left;
      if (isLarge) {
        // Large bubbles on edges
        left = Math.random() > 0.5 
          ? Math.random() * 15 - 10 
          : Math.random() * 15 + 85; 
      } else {
        // Small bubbles scattered everywhere (-5% to 105%)
        left = Math.random() * 110 - 5;
      }

      return {
        id: i,
        size,
        left,
        top: Math.random() * 400, // Spread vertically
        
        // Speed
        speed: isLarge 
          ? Math.random() * 0.3 + 0.4 
          : Math.random() * 0.1 + 0.05,
          
        // Opacity: Increased minimum opacity slightly so they don't vanish
        opacity: isLarge 
          ? Math.random() * 0.1 + 0.1 
          : Math.random() * 0.2 + 0.1, // Small bubbles now 0.1 to 0.3 opacity
        
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
    // IMPORTANT: Added 'z-50' back so they float ABOVE your sections
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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
            filter: bubble.isLarge ? 'blur(3px)' : 'blur(1px)',
            transform: `translate3d(0, ${-scrollY * bubble.speed}px, 0)`,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBubbles;
