
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash, Eye, Github, ArrowUp, ArrowDown, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ProjectModal from "./modals/ProjectModal";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  featured: boolean;
}

const ProjectsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  
  const queryClient = useQueryClient();
  
  // Fetch projects
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => api.projects.getAll(),
  });

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => api.projects.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success("Project created successfully!");
      setIsModalOpen(false);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create project: ${error.message}`);
    }
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => 
      api.projects.update(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success("Project updated successfully!");
      setIsModalOpen(false);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update project: ${error.message}`);
    }
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.projects.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success("Project deleted successfully!");
      setIsDeleteDialogOpen(false);
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    }
  });

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = (projectData: FormData) => {
    if (currentProject) {
      // Edit existing project
      updateMutation.mutate({ 
        id: currentProject.id, 
        formData: projectData 
      });
    } else {
      // Add new project
      createMutation.mutate(projectData);
    }
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteMutation.mutate(projectToDelete.id);
    }
  };

  // Cannot reorder projects on the server side, so this would need to be implemented
  // with a position or order field in the database
  const handleMoveProject = (index: number, direction: number) => {
    toast.info("Reordering functionality requires a position field in the database.");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-destructive">Error loading projects. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Button 
          onClick={handleAddProject} 
          className="flex items-center gap-2"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Project
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Preview</th>
                    <th className="text-left p-4 font-medium">Title</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">Tech Stack</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">Featured</th>
                    <th className="text-left p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project: Project, index: number) => (
                    <tr key={project.id} className="border-b">
                      <td className="p-4">
                        <div className="w-16 h-12 rounded-md overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-medium">{project.title}</td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2 py-1 bg-secondary text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2 py-1 bg-secondary text-xs rounded-full">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        {project.featured ? (
                          <span className="flex items-center text-green-500">
                            <Check size={16} className="mr-1" /> Yes
                          </span>
                        ) : (
                          <span className="flex items-center text-muted-foreground">
                            <X size={16} className="mr-1" /> No
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Eye size={16} />
                            </a>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Edit"
                            onClick={() => handleEditProject(project)}
                            disabled={updateMutation.isPending}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDeleteClick(project)}
                            className="text-destructive"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Move Up"
                            onClick={() => handleMoveProject(index, -1)}
                            disabled={index === 0}
                          >
                            <ArrowUp size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Move Down"
                            onClick={() => handleMoveProject(index, 1)}
                            disabled={index === projects.length - 1}
                          >
                            <ArrowDown size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        No projects found. Add your first project to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <ProjectModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={currentProject}
          onSave={handleSaveProject}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project 
              "{projectToDelete?.title}" and remove it from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm} 
              className="bg-destructive text-destructive-foreground"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectsManagement;
