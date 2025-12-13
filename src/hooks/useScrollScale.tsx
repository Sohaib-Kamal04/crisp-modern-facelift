import { useEffect, useRef, useState } from "react";

interface UseScrollScaleOptions {
  threshold?: number;
  initialScale?: number;
  finalScale?: number;
}

export const useScrollScale = (options: UseScrollScaleOptions = {}) => {
  const { threshold = 0.2, initialScale = 0.5, finalScale = 1 } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const style: React.CSSProperties = {
    transform: isVisible ? `scale(${finalScale})` : `scale(${initialScale})`,
    opacity: isVisible ? 1 : 0,
    transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return { ref, style, isVisible };
};

export default useScrollScale;
