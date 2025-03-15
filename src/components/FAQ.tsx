
import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer: "I specialize in full-stack web development, creating responsive websites, web applications, and mobile apps. My services include front-end development, back-end development, API integration, database design, and UI/UX improvements."
  },
  {
    question: "What is your development process?",
    answer: "My development process typically involves understanding requirements, creating wireframes, developing a prototype, implementing features, testing, and deployment. I believe in iterative development with regular client feedback to ensure the final product meets expectations."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary depending on complexity, features, and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months or more. I'll provide a realistic timeline estimate after understanding your specific requirements."
  },
  {
    question: "Do you offer maintenance after project completion?",
    answer: "Yes, I offer ongoing maintenance and support services to ensure your application runs smoothly. This includes fixing bugs, implementing updates, adding new features, and ensuring security patches are applied promptly."
  },
  {
    question: "Can you help with an existing project?",
    answer: "Absolutely! I can help improve, debug, or add features to your existing projects. I'm experienced in working with legacy codebases and can help modernize or optimize your current applications."
  },
  {
    question: "How do we start working together?",
    answer: "The best way to start is by reaching out through the contact form on this site. We'll discuss your project requirements, timeline, and budget to determine if we're a good fit for each other. I'll then provide a proposal outlining the development process and costs."
  }
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="container">
        <h2 className="section-title animate-slide-in">
          Frequently Asked Questions
        </h2>
        <p className="section-subtitle animate-slide-in">
          Find answers to common questions about my services and process.
        </p>

        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {FAQs.map((faq, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-primary flex-shrink-0" />
                  <span className="font-medium">{faq.question}</span>
                </div>
                <div className="flex-shrink-0">
                  {expandedIndex === index ? (
                    <ChevronUp className="text-primary" />
                  ) : (
                    <ChevronDown className="text-muted-foreground" />
                  )}
                </div>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? "pb-6 max-h-96" : "max-h-0"
                }`}
              >
                <div className="pt-2 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
