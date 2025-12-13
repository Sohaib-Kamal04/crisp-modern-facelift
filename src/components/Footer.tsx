import footerBg from "@/assets/footer-bg.png";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="relative min-h-[520px] md:min-h-[480px] overflow-hidden flex items-end rounded-t-[3rem]">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${footerBg})` }}
      />
      
      {/* Glassmorphism Container */}
      <div className="relative z-10 pb-8 pt-12 px-4 md:px-6 w-full">
        <div className="container mx-auto">
          <div className="backdrop-blur-md bg-white/15 border border-white/25 rounded-3xl p-6 md:p-10 shadow-xl">
            
            {/* Grid Layout */}
            <div className="grid md:grid-cols-7 gap-8 text-center md:text-left">
              
              {/* Logo & Description */}
              <div className="md:col-span-3 flex flex-col items-center md:items-start">
                <span className="text-3xl font-display font-bold mb-4 block text-foreground">
                  crisp.
                </span>
                <p className="text-foreground/80 max-w-md leading-relaxed">
                  Transforming spaces, one clean at a time. We're committed to 
                  delivering exceptional cleaning services that exceed your expectations.
                </p>
              </div>

              {/* Sitemap */}
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <h4 className="font-semibold mb-4 text-foreground text-lg">Sitemap</h4>
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Help & Support */}
              <div className="md:col-span-3 flex flex-col items-center md:items-start">
                <h4 className="font-semibold mb-4 text-foreground text-lg">Help & Support</h4>
                <div className="space-y-3 flex flex-col items-center md:items-start w-full">
                  
                  {/* --- FIX IS HERE --- */}
                  <a
                    href="mailto:crispcleaningmelbourne@outlook.com"
                    // Changed: Removed 'whitespace-nowrap overflow-hidden text-ellipsis'
                    // Added: 'break-all' (forces long words to wrap on mobile)
                    className="text-foreground/70 hover:text-foreground transition-colors block text-sm break-all"
                  >
                    crispcleaningmelbourne@outlook.com
                  </a>
                  {/* ------------------- */}

                  <a
                    href="#contact"
                    className="text-foreground/70 hover:text-foreground transition-colors block"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-foreground/20 pt-6 mt-10 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <p className="text-foreground/60 text-sm">
                © 2024 Crisp Cleaning. All rights reserved.
              </p>
              <a
                href="#"
                className="text-foreground/60 hover:text-foreground/80 text-sm transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
