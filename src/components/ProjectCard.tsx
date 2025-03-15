
import { useState } from "react";
import { ExternalLink, Github, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  githubLink?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle the different property names between frontend and backend
  const demoLink = project.demoLink || project.liveUrl || "#";
  const githubLink = project.githubLink || project.githubUrl || "#";

  return (
    <>
      <div 
        className={cn(
          "group relative rounded-lg overflow-hidden bg-gray-800 shadow-md transition-all duration-300 hover:shadow-xl border border-gray-700",
          "animate-slide-in"
        )}
        style={{ animationDelay: `${index * 150}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-56 relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-3">
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 text-sm rounded-md flex items-center"
                aria-label={`View ${project.title} demo`}
              >
                <ExternalLink size={16} className="mr-1" />
                Live Demo
              </a>
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 text-sm rounded-md flex items-center"
                aria-label={`View ${project.title} code on GitHub`}
              >
                <Github size={16} className="mr-1" />
                Code
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="View details"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          
          {project.featured && (
            <div className="absolute top-3 left-3 bg-primary px-2 py-1 text-xs font-medium text-primary-foreground rounded">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors text-white">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-gray-700 text-gray-200 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in" onClick={() => setShowModal(false)}>
          <div 
            className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto m-4 animate-scale-in border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-800 z-10 flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors text-gray-300"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Project Description</h4>
                  <p className="text-gray-300">
                    {project.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium bg-gray-700 text-gray-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex gap-4">
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md flex items-center"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    View Live Demo
                  </a>
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <Github size={18} className="mr-2" />
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
