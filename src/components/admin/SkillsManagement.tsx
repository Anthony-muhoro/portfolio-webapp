
import { useState } from "react";
import { skills } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import SkillModal from "./modals/SkillModal";
import CategoryModal from "./modals/CategoryModal";
import { Button } from "@/components/ui/button";
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

const SkillsManagement = () => {
  const [skillsList, setSkillsList] = useState(skills);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(''); // 'skill' or 'category'

  // Get unique categories
  const categories = Array.from(new Set(skillsList.map(s => s.category)));

  const handleAddSkill = () => {
    setCurrentSkill(null);
    setIsSkillModalOpen(true);
  };

  const handleEditSkill = (skill) => {
    setCurrentSkill(skill);
    setIsSkillModalOpen(true);
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory({ name: category });
    setIsCategoryModalOpen(true);
  };

  const handleSaveSkill = (skillData) => {
    if (currentSkill) {
      // Edit existing skill
      const updatedSkills = skillsList.map(sk => 
        sk.name === currentSkill.name ? { ...sk, ...skillData } : sk
      );
      setSkillsList(updatedSkills);
      toast.success("Skill updated successfully!");
    } else {
      // Add new skill
      const newSkill = {
        ...skillData,
      };
      setSkillsList([...skillsList, newSkill]);
      toast.success("Skill added successfully!");
    }
  };

  const handleSaveCategory = (categoryData) => {
    if (currentCategory) {
      // Edit existing category
      const oldName = currentCategory.name;
      const newName = categoryData.name;
      
      // Update all skills with this category
      const updatedSkills = skillsList.map(skill => 
        skill.category === oldName ? { ...skill, category: newName } : skill
      );
      
      setSkillsList(updatedSkills);
      toast.success("Category updated successfully!");
    } else {
      // Add new category (no action needed for skills)
      toast.success("Category added successfully!");
      // You might want to automatically create a skill with this category
    }
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteType === 'skill' && itemToDelete) {
      const filteredSkills = skillsList.filter(skill => skill.name !== itemToDelete.name);
      setSkillsList(filteredSkills);
      toast.success("Skill deleted successfully!");
    } else if (deleteType === 'category' && itemToDelete) {
      const categoryToDelete = itemToDelete;
      const filteredSkills = skillsList.filter(skill => skill.category !== categoryToDelete);
      setSkillsList(filteredSkills);
      toast.success("Category and associated skills deleted successfully!");
    }
    setIsDeleteDialogOpen(false);
  };

  const handleMoveSkill = (index, direction) => {
    const skillsInCategory = skillsList.filter(skill => 
      skill.category === skillsList[index].category
    );
    const categoryIndex = skillsInCategory.findIndex(skill => 
      skill.name === skillsList[index].name
    );
    
    if (categoryIndex + direction < 0 || categoryIndex + direction >= skillsInCategory.length) {
      return;
    }
    
    const newSkills = [...skillsList];
    const allSkillsIndices = newSkills.reduce((indices, skill, idx) => {
      if (skill.category === skillsList[index].category) {
        indices.push(idx);
      }
      return indices;
    }, []);
    
    const temp = newSkills[allSkillsIndices[categoryIndex]];
    newSkills[allSkillsIndices[categoryIndex]] = newSkills[allSkillsIndices[categoryIndex + direction]];
    newSkills[allSkillsIndices[categoryIndex + direction]] = temp;
    
    setSkillsList(newSkills);
    toast.success("Skill order updated!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skills Management</h2>
        <Button onClick={handleAddSkill} className="flex items-center gap-2">
          <Plus size={18} />
          Add Skill
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Skill Categories</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddCategory}
                className="flex items-center gap-1"
              >
                <Plus size={14} />
                Add Category
              </Button>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <div 
                  key={category} 
                  className="p-3 bg-card border rounded-md flex items-center justify-between"
                >
                  <span>{category}</span>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteClick(category, 'category')}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              {categories.length === 0 && (
                <div className="text-center p-4 text-muted-foreground">
                  No categories found. Add your first category to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skillsList.map((skill, index) => (
                    <tr key={skill.name} className="border-b">
                      <td className="p-4 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <span className="font-bold">{skill.name.charAt(0)}</span>
                          </div>
                          {skill.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-secondary text-xs rounded-full">
                          {skill.category}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Edit"
                            onClick={() => handleEditSkill(skill)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDeleteClick(skill, 'skill')}
                            className="text-destructive"
                          >
                            <Trash size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Move Up"
                            onClick={() => handleMoveSkill(index, -1)}
                          >
                            <ArrowUp size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Move Down"
                            onClick={() => handleMoveSkill(index, 1)}
                          >
                            <ArrowDown size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {skillsList.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-muted-foreground">
                        No skills found. Add your first skill to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Modal */}
      {isSkillModalOpen && (
        <SkillModal 
          isOpen={isSkillModalOpen}
          onClose={() => setIsSkillModalOpen(false)}
          skill={currentSkill}
          onSave={handleSaveSkill}
          categories={categories}
        />
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <CategoryModal 
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          category={currentCategory}
          onSave={handleSaveCategory}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteType === 'skill' 
                ? `This will permanently delete the skill "${itemToDelete?.name}".`
                : `This will permanently delete the category "${itemToDelete}" and all associated skills.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SkillsManagement;
