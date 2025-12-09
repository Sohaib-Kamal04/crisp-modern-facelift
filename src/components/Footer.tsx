const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <span className="text-3xl font-display font-bold mb-4 block">
              crisp.
            </span>
            <p className="text-background/60 max-w-md leading-relaxed">
              Transforming spaces, one clean at a time. We're committed to 
              delivering exceptional cleaning services that exceed your expectations.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-semibold mb-4">Sitemap</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-background/60 hover:text-background transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-semibold mb-4">Help & Support</h4>
            <div className="space-y-3">
              <a
                href="mailto:crispcleaningmelbourne@outlook.com"
                className="text-background/60 hover:text-background transition-colors block"
              >
                crispcleaningmelbourne@outlook.com
              </a>
              <a
                href="#contact"
                className="text-background/60 hover:text-background transition-colors block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-sm">
            © 2024 Crisp Cleaning. All rights reserved.
          </p>
          <a
            href="#"
            className="text-background/40 hover:text-background/60 text-sm transition-colors"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
