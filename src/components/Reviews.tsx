import { Star } from "lucide-react";

const testimonials = [
  {
    name: "David R.",
    role: "Recent Client",
    content: "Since hiring them for our bi-weekly cleaning, our house has never felt so calm. They don't just clean—they organize and refresh everything. Coming home after they've visited is the best feeling.",
    avatar: "DR",
    rotation: -12,
  },
  {
    name: "Sarah P.",
    role: "Home Owner",
    content: "The apartment looked better than when we moved in! It made the inspection a breeze. Highly recommended for any intense cleaning job.",
    avatar: "SP",
    rotation: -6,
  },
  {
    name: "Michel T.",
    role: "Showroom Manager",
    content: "Punctuality and attention to detail are key in our office, and this agency delivers every time. Our common areas and restrooms are always spotless, which is essential for our clients.",
    avatar: "MT",
    rotation: 0,
  },
  {
    name: "David R.",
    role: "Office Admin",
    content: "I was specifically impressed with their Showroom Cleaning service. We have huge front windows and all the display cases were absolutely flawless—zero streaks, just crystal clear.",
    avatar: "DR",
    rotation: 6,
  },
  {
    name: "Emilia A.",
    role: "Founder & CEO",
    content: "We've been using this cleaning agency for two years, and the biggest compliment I can give is how much I trust them. They are fantastic communicators, always confirm their arrival time.",
    avatar: "EA",
    rotation: 12,
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-primary/10 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
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

        {/* Tilted Cards */}
        <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap py-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative w-64 md:w-72 bg-background rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-500 ease-out hover:z-20 hover:shadow-2xl"
              style={{
                transform: `rotate(${testimonial.rotation}deg)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) translateY(-20px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${testimonial.rotation}deg)`;
              }}
            >
              {/* Avatar and Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
