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
    bubblesRef.current = Array.from({ length: 15 }, (_, i) => {
      // First 2 bubbles are "Hero" bubbles (Huge)
      const isLarge = i < 2;

      // SIZE
      const size = isLarge 
        ? Math.random() * 200 + 300 
        : Math.random() * 80 + 20;

      // LEFT: Push to far edges
      let left;
      if (isLarge) {
        // Either far left (-15% to -5%) or far right (95% to 105%)
        left = Math.random() > 0.5 ? Math.random() * 10 - 15 : Math.random() * 10 + 95; 
      } else {
        // Random spread, allowing slight overflow
        left = Math.random() * 110 - 5;
      }

      return {
        id: i,
        size,
        left,
        top: Math.random() * 400, // Spread vertically
        // Speed: Large = Fast (Foreground), Small = Slow (Background)
        speed: isLarge ? Math.random() * 0.4 + 0.6 : Math.random() * 0.2 + 0.05, 
        opacity: isLarge ? 0.08 : Math.random() * 0.15 + 0.05, 
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
    // CHANGED: z-0 -> z-50 to ensure they sit ON TOP of your white/grey section backgrounds
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
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
            // Blur effect
            filter: bubble.isLarge ? 'blur(80px)' : 'blur(2px)',
            // Parallax movement
            transform: `translate3d(0, ${-scrollY * bubble.speed}px, 0)`,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBubbles;
