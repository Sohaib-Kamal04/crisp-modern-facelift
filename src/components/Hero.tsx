import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Replace 'your-video.mp4' with your actual video path in the public folder */}
          <source src="/your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay - Essential for text readability over video */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow */}
          <div className="animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-8 border border-white/20">
              Professional Cleaning Services
            </span>
          </div>

          {/* Main headline */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-up opacity-0 text-white"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Transforming Spaces,{" "}
            {/* Changed text-gradient to text-white or a lighter color to pop against video */}
            <span className="text-primary-foreground">One Clean</span>{" "}
            at a Time
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0"
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
            <Button variant="hero" size="xl">
              Get a Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* Added styling to outline button to make it visible on dark video */}
            <Button variant="hero-outline" size="xl" className="text-white border-white hover:bg-white/20">
              Learn More
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-300 animate-fade-up opacity-0"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border-2 border-transparent flex items-center justify-center text-xs font-medium text-white"
                  >
                    {["J", "E", "M", "S"][i - 1]}
                  </div>
                ))}
              </div>
              <span className="text-sm">
                <strong className="text-white">500+</strong> Happy Clients
              </span>
            </div>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">
                <strong className="text-white">4.9</strong> Average Rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
