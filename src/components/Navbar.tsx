"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // New State for Scaling (Matches Hero.jsx)
  const [scale, setScale] = useState(1);
  const [radius, setRadius] = useState(0);

  // Define the point where the background color animation triggers
  const ANIMATION_END_POINT = 300;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Background Logic
      setIsScrolled(scrollY > ANIMATION_END_POINT);

      // 2. Scaling Logic (Matches Hero.jsx exactly)
      // Note: Ensure this '200' matches your Hero's scroll divisor
      const progress = Math.min(scrollY / 200, 1);
      
      // Matches the scale factor in your Hero component (0.02 or 0.1 depending on your preference)
      const newScale = 1 - (progress * 0.02); 
      const newRadius = progress * 40; // Matches Hero radius
      
      setScale(newScale);
      setRadius(newRadius);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text Color Logic
  const textColorClass = isScrolled ? "text-foreground/70" : "text-white/90";
  const hoverColorClass = "hover:text-primary";

  return (
    <header
      // Added 'will-change-transform' for performance
      // Added 'transition-colors' instead of 'transition-all' to prevent fighting with JS scale updates
      className={`fixed top-0 z-50 transition-colors duration-300 ease-linear ${
        isScrolled
          ? "bg-card/90 backdrop-blur-lg shadow-sm py-3" 
          : "bg-transparent py-6"
      }`}
      style={{
        // Apply the same transform logic as Hero
        transform: `scale(${scale})`,
        // We set margin-left/right auto via 'left-0 right-0' + 'mx-auto' on a container, 
        // but for a fixed element scaling, we need to ensure it stays centered.
        // 'top center' keeps it pinned to top while shrinking.
        transformOrigin: "top center", 
        // Apply the matching border radius (only noticeable if bg is colored)
        borderBottomLeftRadius: `${radius}px`,
        borderBottomRightRadius: `${radius}px`,
        // Ensure it spans full width before scaling
        width: "100%",
        left: 0,
      }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Crisp Logo" 
            className="h-14 w-auto object-contain" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${hoverColorClass} ${
                link.name === "Home" && isScrolled 
                  ? "text-primary" 
                  : textColorClass
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            className={isScrolled ? "" : "text-white hover:bg-white/20 hover:text-white"}
          >
            Login
          </Button>
          <Button variant="hero" size="default">
            Get Started Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground/70 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button variant="ghost">Login</Button>
              <Button variant="hero">Get Started Now</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
