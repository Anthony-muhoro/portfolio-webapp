
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Plus, Pencil, Trash, Save } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Types for form fields
interface FormField {
  id: string;
  name: string;
  type: string;
  required: boolean;
}

const ContactManagement = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "hello@example.com",
    phone: "+1 (234) 567-890",
    location: "San Francisco, CA"
  });
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "field-1", name: "Name", type: "text", required: true },
    { id: "field-2", name: "Email", type: "email", required: true },
    { id: "field-3", name: "Subject", type: "text", required: true },
    { id: "field-4", name: "Message", type: "textarea", required: true }
  ]);
  
  const [newField, setNewField] = useState<FormField>({
    id: "",
    name: "",
    type: "text",
    required: false
  });
  
  const [isAddingField, setIsAddingField] = useState(false);
  
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo({...contactInfo, [name]: value});
  };
  
  const handleToggleRequired = (fieldId: string) => {
    setFormFields(fields => 
      fields.map(field => 
        field.id === fieldId 
          ? { ...field, required: !field.required } 
          : field
      )
    );
  };
  
  const handleEditFieldName = (fieldId: string, newName: string) => {
    setFormFields(fields => 
      fields.map(field => 
        field.id === fieldId 
          ? { ...field, name: newName } 
          : field
      )
    );
  };
  
  const handleDeleteField = (fieldId: string) => {
    setFormFields(fields => fields.filter(field => field.id !== fieldId));
  };
  
  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewField({ ...newField, [name]: value });
  };
  
  const handleToggleNewFieldRequired = (checked: boolean) => {
    setNewField({ ...newField, required: checked });
  };
  
  const handleAddField = () => {
    if (!newField.name.trim()) {
      toast.error("Field name is required");
      return;
    }
    
    const newFieldWithId = {
      ...newField,
      id: `field-${Date.now()}`
    };
    
    setFormFields([...formFields, newFieldWithId]);
    setNewField({
      id: "",
      name: "",
      type: "text",
      required: false
    });
    setIsAddingField(false);
    toast.success("Field added successfully!");
  };
  
  const handleSaveChanges = () => {
    // Here you would typically save to a database or API
    toast.success("Contact settings saved successfully!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Management</h2>
        <Button onClick={handleSaveChanges} className="flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium mb-1">Email Address</Label>
                <div className="flex">
                  <div className="bg-secondary flex items-center justify-center p-3 rounded-l-md">
                    <Mail size={18} />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleContactInfoChange}
                    className="flex-1 rounded-l-none focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">Phone Number</Label>
                <div className="flex">
                  <div className="bg-secondary flex items-center justify-center p-3 rounded-l-md">
                    <Phone size={18} />
                  </div>
                  <Input
                    type="text"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactInfoChange}
                    className="flex-1 rounded-l-none focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">Location</Label>
                <div className="flex">
                  <div className="bg-secondary flex items-center justify-center p-3 rounded-l-md">
                    <MapPin size={18} />
                  </div>
                  <Input
                    type="text"
                    name="location"
                    value={contactInfo.location}
                    onChange={handleContactInfoChange}
                    className="flex-1 rounded-l-none focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Form Management</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive an email when someone submits the contact form</p>
                </div>
                <div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Form Fields</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddingField(true)}
                    className="flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Field
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {formFields.map((field) => (
                    <div 
                      key={field.id} 
                      className="p-3 border rounded-md flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Switch
                          checked={field.required}
                          onCheckedChange={() => handleToggleRequired(field.id)}
                          className="mr-3"
                        />
                        <span>{field.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({field.type})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${
                          field.required 
                            ? "bg-primary/10 text-primary" 
                            : "bg-secondary text-secondary-foreground"
                        }`}>
                          {field.required ? "Required" : "Optional"}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const newName = prompt("Enter new field name", field.name);
                            if (newName && newName.trim()) {
                              handleEditFieldName(field.id, newName.trim());
                            }
                          }}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteField(field.id)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {isAddingField && (
                    <div className="p-3 border rounded-md space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="fieldName" className="text-sm">Field Name</Label>
                          <Input
                            id="fieldName"
                            name="name"
                            placeholder="e.g. Phone Number"
                            value={newField.name}
                            onChange={handleNewFieldChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="fieldType" className="text-sm">Field Type</Label>
                          <select
                            id="fieldType"
                            name="type"
                            value={newField.type}
                            onChange={handleNewFieldChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Phone</option>
                            <option value="textarea">Text Area</option>
                            <option value="select">Dropdown</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="required"
                          checked={newField.required}
                          onCheckedChange={handleToggleNewFieldRequired}
                        />
                        <Label htmlFor="required">Required field</Label>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" onClick={() => setIsAddingField(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddField}>
                          Add Field
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {!isAddingField && (
                    <Button 
                      variant="outline" 
                      className="w-full p-3 border border-dashed rounded-md text-muted-foreground hover:text-foreground hover:border-border flex items-center justify-center gap-2 transition-colors"
                      onClick={() => setIsAddingField(true)}
                    >
                      <Plus size={16} />
                      Add Custom Field
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactManagement;
