import { useEffect, useState, useRef } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
  speed: number;
  opacity: number;
}

const ParallaxBubbles = () => {
  const [scrollY, setScrollY] = useState(0);
  const bubblesRef = useRef<Bubble[]>([]);

  // Generate bubbles only once
  if (bubblesRef.current.length === 0) {
    bubblesRef.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 120 + 20, // 20px to 140px
      left: Math.random() * 100,
      top: Math.random() * 300, // Spread across page height (in vh)
      speed: Math.random() * 0.5 + 0.1, // Different speeds for parallax
      opacity: Math.random() * 0.15 + 0.05, // 0.05 to 0.2 opacity
    }));
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
          className="absolute rounded-full bg-primary"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            top: `${bubble.top}vh`,
            opacity: bubble.opacity,
            transform: `translateY(${-scrollY * bubble.speed}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBubbles;
