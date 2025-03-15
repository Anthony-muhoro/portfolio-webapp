
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { X, Loader2, Upload, Image } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured: boolean;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (formData: FormData) => void;
  isSubmitting?: boolean;
}

const ProjectModal = ({ isOpen, onClose, project, onSave, isSubmitting = false }: ProjectModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setLiveUrl(project.liveUrl || "");
      setGithubUrl(project.githubUrl || "");
      setFeatured(project.featured || false);
      setTechStack(project.techStack || []);
      setImagePreview(project.image || "");
    } else {
      // Reset form for new project
      setTitle("");
      setDescription("");
      setLiveUrl("");
      setGithubUrl("");
      setFeatured(false);
      setTechStack([]);
      setImagePreview("");
      setImageFile(null);
    }
  }, [project]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    
    setImageFile(file);
    
    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      if (!techStack.includes(techInput.trim())) {
        setTechStack([...techStack, techInput.trim()]);
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!imageFile && !imagePreview && !project) {
      toast.error("Please upload a project image");
      return;
    }

    if (techStack.length === 0) {
      toast.error("Please add at least one technology");
      return;
    }

    // Create FormData
    const formData = new FormData();
    if (project?.id) {
      formData.append("id", project.id);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("liveUrl", liveUrl);
    formData.append("githubUrl", githubUrl);
    formData.append("featured", featured.toString());
    techStack.forEach((tech) => {
      formData.append("techStack", tech);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">{project ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="required text-gray-300">Project Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Project name"
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="required text-gray-300">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe your project..."
                  rows={4}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="liveUrl" className="text-gray-300">Live Demo URL</Label>
                <Input 
                  id="liveUrl" 
                  value={liveUrl} 
                  onChange={(e) => setLiveUrl(e.target.value)} 
                  placeholder="https://example.com"
                  type="url"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="githubUrl" className="text-gray-300">GitHub URL</Label>
                <Input 
                  id="githubUrl" 
                  value={githubUrl} 
                  onChange={(e) => setGithubUrl(e.target.value)} 
                  placeholder="https://github.com/username/repo"
                  type="url"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured" 
                  checked={featured} 
                  onCheckedChange={setFeatured}
                />
                <Label htmlFor="featured" className="text-gray-300">Featured Project</Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="image" className="required text-gray-300">Project Image</Label>
                <div 
                  className={`mt-1 border-2 border-dashed ${isDragging ? 'border-primary' : 'border-gray-600'} rounded-lg p-4 text-center bg-gray-700 transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-48 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setImageFile(null);
                        }}
                        className="absolute top-2 right-2 bg-gray-800/80 p-1 rounded-full"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </div>
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={imagePreview ? "hidden" : "opacity-0 absolute inset-0 cursor-pointer"}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="techStack" className="required text-gray-300">Technologies</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="techStack" 
                    value={techInput} 
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add a technology"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button type="button" onClick={handleAddTech}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full flex items-center gap-1"
                    >
                      {tech}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTech(tech)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {techStack.length === 0 && (
                    <p className="text-sm text-gray-500">No technologies added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {project ? "Updating..." : "Creating..."}
                </>
              ) : (
                project ? "Update Project" : "Create Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
