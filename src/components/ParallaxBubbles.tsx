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
      // Make the first 2 bubbles "Hero" bubbles (Huge)
      const isLarge = i < 2;

      // SIZE: Large ones are 300px-500px, others are 20px-100px
      const size = isLarge 
        ? Math.random() * 200 + 300 
        : Math.random() * 80 + 20;

      // LEFT: Range from -10% to 110% to let them hang off screen
      // If it's large, force it to the far edges (either < 0 or > 80)
      let left;
      if (isLarge) {
        left = Math.random() > 0.5 ? Math.random() * 10 - 15 : Math.random() * 10 + 95; 
      } else {
        left = Math.random() * 120 - 10;
      }

      // SPEED: Large bubbles move faster (foreground), small move slower (background)
      // Range: 0.05 (very slow) to 0.8 (fast)
      const speed = isLarge 
        ? Math.random() * 0.4 + 0.6  // 0.6 - 1.0 speed
        : Math.random() * 0.2 + 0.05; // 0.05 - 0.25 speed

      return {
        id: i,
        size,
        left,
        // Spread vertically across 400vh to cover long scrolls
        top: Math.random() * 400, 
        speed,
        // Lower opacity for large bubbles so they don't block text
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
            // Blur effect for depth (Large = blurrier)
            filter: bubble.isLarge ? 'blur(80px)' : 'blur(2px)',
            // The translation moves them upward based on scroll
            transform: `translate3d(0, ${-scrollY * bubble.speed}px, 0)`,
            // Removed transition for snappier, direct parallax feel
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBubbles;
