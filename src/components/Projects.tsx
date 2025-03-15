
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { projects } from "@/lib/data";

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProjects = filter
    ? projects.filter((project) => {
        if (filter === 'featured') return project.featured;
        return project.techStack.includes(filter);
      })
    : projects;

  // Calculate unique technologies across all projects
  const uniqueTechs = Array.from(
    new Set(projects.flatMap((project) => project.techStack))
  ).sort();

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container">
        <h2 className="section-title animate-slide-in text-white">My Projects</h2>
        <p className="section-subtitle animate-slide-in text-gray-300">
          Explore my recent work and the technologies I've used to build them.
        </p>

        <div className="mb-12 animate-slide-in">
          <div className="md:hidden flex justify-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 rounded-full shadow hover:shadow-md transition-all text-white"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-300 ${
            showFilters || window.innerWidth >= 768 ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-96 md:opacity-100 overflow-hidden"
          }`}>
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                filter === null
                  ? "bg-primary text-primary-foreground shadow shadow-primary/20"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                filter === "featured"
                  ? "bg-primary text-primary-foreground shadow shadow-primary/20"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              Featured
            </button>
            {uniqueTechs.slice(0, 6).map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  filter === tech
                    ? "bg-primary text-primary-foreground shadow shadow-primary/20"
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                }`}
              >
                {tech}
              </button>
            ))}
            
            {filter && (
              <button
                onClick={() => setFilter(null)}
                className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors flex items-center gap-1"
              >
                <X size={14} /> Clear Filter
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-xl text-gray-400">
              No projects found with the selected filter.
            </p>
            <button
              onClick={() => setFilter(null)}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Projects;
