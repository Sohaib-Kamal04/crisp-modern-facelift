"use client";

import { Star } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useScrollScale from "@/hooks/useScrollScale";

const testimonials = [
  {
    name: "David R.",
    role: "Recent Client",
    content: "Since hiring them for our bi-weekly cleaning, our house has never felt so calm. They don't just clean—they organize and refresh everything.",
    avatar: "DR",
  },
  {
    name: "Sarah P.",
    role: "Home Owner",
    content: "The apartment looked better than when we moved in! It made the inspection a breeze. Highly recommended for any intense cleaning job.",
    avatar: "SP",
  },
  {
    name: "Michel T.",
    role: "Showroom Manager",
    content: "Punctuality and attention to detail are key in our office, and this agency delivers every time. Our common areas are always spotless.",
    avatar: "MT",
  },
  {
    name: "David R.",
    role: "Office Admin",
    content: "I was specifically impressed with their Showroom Cleaning service. We have huge front windows and all the display cases were absolutely flawless.",
    avatar: "DR",
  },
  {
    name: "Emilia A.",
    role: "Founder & CEO",
    content: "We've been using this cleaning agency for two years, and the biggest compliment I can give is how much I trust them.",
    avatar: "EA",
  },
];

const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardVisibilityRef = useRef(null);
  const { ref: sectionRef, style: scaleStyle } = useScrollScale({ threshold: 0.1 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } 
    );
    if (cardVisibilityRef.current) observer.observe(cardVisibilityRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="reviews" 
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 overflow-hidden rounded-2xl"
      style={scaleStyle}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hear from our satisfied customers about their experience
          </p>
        </div>

        <div ref={cardVisibilityRef} className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 pt-10 pb-10">
          {testimonials.map((testimonial, index) => {
            const isOddCard = index % 2 === 0;
            const getRotation = () => {
              if (!isOddCard) return 0;
              if (index === 0) return -10;
              if (index === 2) return -5;
              if (index === 4) return 10;
              return 0;
            };
            const rotation = getRotation();

            return (
              <div
                key={index}
                className={`
                  w-full max-w-sm md:w-64
                  md:ml-[-40px] md:first:ml-0
                  /* CHANGED: transition-all to transition-[opacity,transform] for better performance */
                  transition-[opacity,transform] duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'}
                  md:hover:!z-50
                `}
                style={{
                  zIndex: index + 1,
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div
                  className={`
                    relative 
                    bg-background rounded-2xl p-6 shadow-lg 
                    cursor-pointer 
                    /* CHANGED: transition-all to transition-transform */
                    transition-transform duration-300 ease-out
                    /* ADDED: will-change-transform for GPU Acceleration */
                    will-change-transform
                    transform-none mb-0
                    md:[transform:rotate(var(--desktop-rotation))]
                    md:hover:![transform:rotate(0deg)_translateY(-20px)]
                  `}
                  // ADDED: backfaceVisibility helps smooth out rotation rendering
                  style={{ 
                    '--desktop-rotation': `${rotation}deg`,
                    backfaceVisibility: 'hidden' 
                  } as React.CSSProperties}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
