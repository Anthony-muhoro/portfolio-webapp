
import { socialLinks, navLinks } from "@/lib/data";
import { ArrowUp, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="py-12 bg-card border-t border-border relative">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-3">
              <span className="text-primary">Portfolio</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Creating beautiful, functional, and user-friendly web applications.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8 md:mb-0">
            <div>
              <h3 className="font-medium mb-3 text-primary">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.url} 
                      className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-primary">Social</h3>
              <div className="flex flex-col space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center hover:translate-x-1 transform duration-300"
                    aria-label={link.name}
                  >
                    <link.icon size={16} className="mr-2" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            <span>© {currentYear} Muhoro. All rights reserved.</span>
            
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transform transition-all duration-300 z-10 hover:scale-110 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
