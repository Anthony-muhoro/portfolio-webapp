
import { useState } from "react";
import { experience } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import ExperienceModal from "./modals/ExperienceModal";
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

const ExperienceManagement = () => {
  const [experienceList, setExperienceList] = useState(experience);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);

  const handleAddExperience = () => {
    setCurrentExperience(null);
    setIsModalOpen(true);
  };

  const handleEditExperience = (exp) => {
    setCurrentExperience(exp);
    setIsModalOpen(true);
  };

  const handleSaveExperience = (expData) => {
    if (currentExperience) {
      // Edit existing experience
      const updatedExperience = experienceList.map(exp => 
        exp.id === currentExperience.id ? { ...exp, ...expData } : exp
      );
      setExperienceList(updatedExperience);
      toast.success("Experience updated successfully!");
    } else {
      // Add new experience
      const newExperience = {
        ...expData,
        id: String(Date.now()),
      };
      setExperienceList([...experienceList, newExperience]);
      toast.success("Experience added successfully!");
    }
  };

  const handleDeleteClick = (exp) => {
    setExperienceToDelete(exp);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (experienceToDelete) {
      const filteredExperience = experienceList.filter(exp => exp.id !== experienceToDelete.id);
      setExperienceList(filteredExperience);
      toast.success("Experience deleted successfully!");
      setIsDeleteDialogOpen(false);
    }
  };

  const handleMoveExperience = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= experienceList.length) return;
    
    const newExperience = [...experienceList];
    [newExperience[index], newExperience[newIndex]] = [newExperience[newIndex], newExperience[index]];
    setExperienceList(newExperience);
    toast.success("Experience order updated!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Experience Management</h2>
        <Button onClick={handleAddExperience} className="flex items-center gap-2">
          <Plus size={18} />
          Add Experience
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Role</th>
                    <th className="text-left p-4 font-medium">Company</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">Duration</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceList.map((exp, index) => (
                    <tr key={exp.id} className="border-b">
                      <td className="p-4 font-medium">{exp.role}</td>
                      <td className="p-4">{exp.company}</td>
                      <td className="p-4 hidden md:table-cell">{exp.duration}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Edit"
                            onClick={() => handleEditExperience(exp)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDeleteClick(exp)}
                            className="text-destructive"
                          >
                            <Trash size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Move Up"
                            onClick={() => handleMoveExperience(index, -1)}
                            disabled={index === 0}
                          >
                            <ArrowUp size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Move Down"
                            onClick={() => handleMoveExperience(index, 1)}
                            disabled={index === experienceList.length - 1}
                          >
                            <ArrowDown size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {experienceList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-muted-foreground">
                        No experience found. Add your first work experience to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience Modal */}
      {isModalOpen && (
        <ExperienceModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          experience={currentExperience}
          onSave={handleSaveExperience}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the experience entry for the role 
              "{experienceToDelete?.role}" at "{experienceToDelete?.company}".
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

export default ExperienceManagement;
