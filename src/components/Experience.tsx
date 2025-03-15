
import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Calendar, Building, ChevronDown, ChevronUp } from "lucide-react";
import { experience as experienceData } from "@/lib/data";

const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const experienceItems = experienceData;

  return (
    <section id="experience" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Decorative light effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-primary/5 w-96 h-96 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 bg-purple-500/5 w-72 h-72 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <motion.h2 
          className="section-title text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h2>
        <motion.p 
          className="section-subtitle text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          My professional journey in the world of development
        </motion.p>

        <motion.div 
          ref={ref}
          className="max-w-3xl mx-auto mt-12 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {experienceItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)"
              }}
              layout
            >
              <div 
                className="p-6 cursor-pointer flex justify-between items-start"
                onClick={() => toggleExpand(item.id)}
              >
                <div>
                  <motion.h3 
                    className="text-xl font-semibold text-primary"
                    layout="position"
                  >
                    {item.role}
                  </motion.h3>
                  <motion.div 
                    className="flex items-center mt-2 text-gray-400"
                    layout="position"
                  >
                    <Building size={18} className="mr-2" />
                    <span>{item.company}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center mt-1 text-sm text-gray-400"
                    layout="position"
                  >
                    <Calendar size={16} className="mr-2" />
                    <span>{item.duration}</span>
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  {expandedId === item.id ? (
                    <ChevronUp className="text-primary" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.3
                        },
                        opacity: {
                          duration: 0.25,
                          delay: 0.15
                        }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.3
                        },
                        opacity: {
                          duration: 0.25
                        }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-700">
                        <ul className="space-y-3 text-gray-300">
                          {item.description.map((desc, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start"
                            >
                              <span className="text-primary mr-2">•</span>
                              {desc}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          
          {experienceItems.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400">No experience entries found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
