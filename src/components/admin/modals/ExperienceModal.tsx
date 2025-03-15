
import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ExperienceFormData {
  id?: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  location?: string;
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience?: ExperienceFormData;
  onSave: (experience: ExperienceFormData) => void;
}

const ExperienceModal = ({ isOpen, onClose, experience, onSave }: ExperienceModalProps) => {
  const isEditing = !!experience;
  
  const [formData, setFormData] = useState<ExperienceFormData>(
    experience || {
      role: "",
      company: "",
      duration: "",
      description: "",
      location: ""
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.role.trim()) {
      toast.error("Role is required");
      return;
    }
    
    if (!formData.company.trim()) {
      toast.error("Company is required");
      return;
    }
    
    if (!formData.duration.trim()) {
      toast.error("Duration is required");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    
    onSave(formData);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">{isEditing ? "Edit Experience" : "Add New Experience"}</DialogTitle>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-gray-300"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="role" className="text-gray-300">Role / Position</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter your role/position"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company" className="text-gray-300">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="duration" className="text-gray-300">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. Jan 2020 - Present"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location" className="text-gray-300">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country or Remote"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements"
              rows={4}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <DialogFooter className="pt-2 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit">Save Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceModal;
