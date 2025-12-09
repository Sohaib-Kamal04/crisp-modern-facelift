import { useEffect, useState, ReactNode } from "react";

interface ScrollContainerProps {
  children: ReactNode;
}

const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="mx-auto transition-all duration-500 ease-out relative z-10"
      style={{
        width: hasScrolled ? "95%" : "100%",
        maxWidth: hasScrolled ? "95%" : "100%",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
