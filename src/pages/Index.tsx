
import { useEffect } from "react";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  // Smooth scrolling for anchor links with improved behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          e.preventDefault();
          
          // Calculate header offset dynamically to account for responsive designs
          const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 80;
          
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight,
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gray-900 text-white"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Experience />
        <Skills />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
