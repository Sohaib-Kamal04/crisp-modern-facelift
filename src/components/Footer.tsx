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
    <footer className="relative min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${footerBg})` }}
      />
      
      {/* Glassmorphism Container */}
      <div className="relative z-10 py-16 px-6">
        <div className="container mx-auto">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-10 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Logo & Description */}
              <div className="md:col-span-2">
                <span className="text-3xl font-display font-bold mb-4 block text-foreground">
                  crisp.
                </span>
                <p className="text-foreground/80 max-w-md leading-relaxed">
                  Transforming spaces, one clean at a time. We're committed to 
                  delivering exceptional cleaning services that exceed your expectations.
                </p>
              </div>

              {/* Sitemap */}
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Sitemap</h4>
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
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Help & Support</h4>
                <div className="space-y-3">
                  <a
                    href="mailto:crispcleaningmelbourne@outlook.com"
                    className="text-foreground/70 hover:text-foreground transition-colors block text-sm"
                  >
                    crispcleaningmelbourne@outlook.com
                  </a>
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
            <div className="border-t border-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
