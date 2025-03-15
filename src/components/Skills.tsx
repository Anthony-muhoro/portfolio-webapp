
import { useState } from "react";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Code, Smartphone, Database, Server } from "lucide-react";

interface SkillLevel {
  [key: string]: number;
}

const skillLevels: SkillLevel = {
  "HTML": 95,
  "CSS": 90,
  "JavaScript": 92,
  "TypeScript": 85,
  "React": 90,
  "React Native": 85,
  "Next.js": 88,
  "Tailwind CSS": 95,
  "Node.js": 88,
  "Express": 90,
  "Prisma": 85,
  "PostgreSQL": 80,
  "MySQL": 82,
  "MongoDB": 85,
  "Git": 90,
  "Docker": 78,
  "AWS": 75,
  "Figma": 80,
};

const SkillIcon = ({ name, category }: { name: string; category: string }) => {
  let IconComponent;
  
  switch(category) {
    case "Frontend":
      IconComponent = Code;
      break;
    case "Mobile":
      IconComponent = Smartphone;
      break;
    case "Backend":
      IconComponent = Server;
      break;
    case "Database":
      IconComponent = Database;
      break;
    default:
      IconComponent = Code;
  }
  
  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
      <IconComponent size={24} />
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const categories = ["Frontend", "Mobile", "Backend", "Database", "Tools"];
  
  const filteredSkills = activeCategory
    ? skills.filter(skill => skill.category === activeCategory)
    : skills;

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container">
        <h2 className="section-title animate-slide-in text-white">My Skills</h2>
        <p className="section-subtitle animate-slide-in text-gray-300">
          Here are the technologies and tools I work with.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-in">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              activeCategory === null
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={cn(
                "group flex flex-col items-center p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 animate-scale-in border border-gray-700",
                "hover:shadow-md relative"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <SkillIcon name={skill.name} category={skill.category} />
              <span className="mt-3 text-sm font-medium text-center text-gray-200">{skill.name}</span>
              
              {/* Skill level tooltip */}
              {hoveredSkill === skill.name && skillLevels[skill.name] && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-md shadow-lg border border-gray-700 z-10 w-32 animate-fade-in">
                  <div className="text-xs text-center mb-1 text-gray-300">
                    Proficiency: {skillLevels[skill.name]}%
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${skillLevels[skill.name]}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Bottom highlight line for hover effect */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
