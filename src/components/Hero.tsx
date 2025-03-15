
import { ArrowDown, Download } from "lucide-react";
import { socialLinks, profile } from "@/lib/data";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Hero = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "digital experiences";
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    const typeText = () => {
      if (isDeleting) {
        setText(fullText.substring(0, currentIndex - 1));
        currentIndex--;
        typingSpeed = 50;
        
        if (currentIndex === 0) {
          isDeleting = false;
          setIsTyping(false);
          timeout = setTimeout(() => {
            setIsTyping(true);
          }, 1500);
        }
      } else {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        typingSpeed = 150;
        
        if (currentIndex === fullText.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
          }, 1500);
        }
      }
      
      if ((isTyping && currentIndex < fullText.length) || isDeleting) {
        timeout = setTimeout(typeText, typingSpeed);
      }
    };
    
    if (isTyping) {
      timeout = setTimeout(typeText, 100);
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [isTyping, fullText]);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="container flex flex-col md:flex-row items-center md:gap-12 relative z-10 animate-fade-in">
        <div className="md:w-1/3 mb-10 md:mb-0 flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary animate-scale-in shadow-lg shadow-primary/20">
            <img 
              src={profile.photo} 
              alt={profile.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop";
              }}
            />
          </div>
        </div>
        
        <div className="md:w-2/3 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium animate-slide-in" style={{ animationDelay: "200ms" }}>
            <span>{profile.title}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-in text-white" style={{ animationDelay: "400ms" }}>
            I'm <span className="text-primary">{profile.name}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-8 animate-slide-in" style={{ animationDelay: "600ms" }}>
            Creating <span className="text-primary relative">
              {text}
              <span className={`absolute -right-[4px] top-0 h-full w-[2px] bg-primary ${isTyping ? "animate-pulse" : "opacity-0"}`}></span>
            </span> that matter
          </p>
          
          <p className="text-base text-gray-400 max-w-2xl mx-auto md:mx-0 mb-8 animate-slide-in" style={{ animationDelay: "800ms" }}>
            {profile.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4 mb-10 animate-slide-in" style={{ animationDelay: "1000ms" }}>
            <a href="#projects" className="w-full sm:w-auto btn-primary group transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
              View My Work
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
            
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto btn-secondary group">
              Download CV
              <Download className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-6 animate-slide-in" style={{ animationDelay: "1200ms" }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-300"
                aria-label={link.name}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" aria-label="Scroll to services" className="flex flex-col items-center">
          <span className="text-sm text-primary mb-2">Scroll Down</span>
          <ArrowDown className="text-primary" size={30} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
