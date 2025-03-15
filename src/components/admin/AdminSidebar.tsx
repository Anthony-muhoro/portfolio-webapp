
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarTrigger, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { 
  Globe, 
  FolderGit2, 
  Book, 
  User, 
  Users, 
  Settings, 
  Mail, 
  ArrowLeft,
  LayoutDashboard,
  FileText,
  BarChart3,
  PanelLeftClose
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const mainMenuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderGit2,
    },
    {
      id: "skills",
      title: "Skills",
      icon: Book,
    },
    {
      id: "experience",
      title: "Experience",
      icon: User,
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
    },
  ];

  const contentMenuItems = [
    {
      id: "pages",
      title: "Pages",
      icon: FileText,
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: BarChart3,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">Portfolio Admin</span>
            <span className="text-xs text-muted-foreground">Manage your content</span>
          </div>
        </div>
        <SidebarTrigger>
          <PanelLeftClose className="h-5 w-5" />
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection(item.id)}
                    className={activeSection === item.id ? "bg-secondary" : ""}
                    tooltip={item.title}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection(item.id)}
                    className={activeSection === item.id ? "bg-secondary" : ""}
                    tooltip={item.title}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm hover:bg-secondary transition-colors"
        >
          <Globe className="h-4 w-4" />
          <span>View Website</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
