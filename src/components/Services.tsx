
import { services } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container">
        <h2 className="section-title animate-slide-in text-white">My Services</h2>
        <p className="section-subtitle animate-slide-in text-gray-300">
          High-quality development services to bring your ideas to life
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-primary/10 text-primary mb-6">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 text-primary">•</div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-primary hover:underline transition-all duration-300 text-sm font-medium"
                >
                  Contact me <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
