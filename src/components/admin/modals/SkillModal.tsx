
import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillFormData {
  id?: string;
  name: string;
  category: string;
  level?: number;
}

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: SkillFormData;
  onSave: (skill: SkillFormData) => void;
  categories: string[];
}

const SkillModal = ({ isOpen, onClose, skill, onSave, categories }: SkillModalProps) => {
  const isEditing = !!skill;
  
  const [formData, setFormData] = useState<SkillFormData>(
    skill || {
      name: "",
      category: categories.length > 0 ? categories[0] : "",
      level: 80
    }
  );
  
  const [newCategory, setNewCategory] = useState<string>("");
  const [showNewCategory, setShowNewCategory] = useState<boolean>(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCategorySelect = (value: string) => {
    if (value === "new") {
      setShowNewCategory(true);
    } else {
      setFormData({ ...formData, category: value });
    }
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory("");
      setShowNewCategory(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim()) {
      toast.error("Skill name is required");
      return;
    }
    
    if (!formData.category.trim()) {
      toast.error("Category is required");
      return;
    }
    
    onSave(formData);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">{isEditing ? "Edit Skill" : "Add New Skill"}</DialogTitle>
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
            <Label htmlFor="name" className="text-gray-300">Skill Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter skill name"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-gray-300">Category</Label>
            {showNewCategory ? (
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button type="button" onClick={handleAddCategory}>Add</Button>
              </div>
            ) : (
              <Select onValueChange={handleCategorySelect} defaultValue={formData.category}>
                <SelectTrigger id="category" className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">+ Add New Category</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="level" className="text-gray-300">Skill Level (0-100)</Label>
            <Input
              id="level"
              name="level"
              type="number"
              min="0"
              max="100"
              value={formData.level || 80}
              onChange={handleChange}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <DialogFooter className="pt-2 border-t border-gray-700">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit">Save Skill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;
