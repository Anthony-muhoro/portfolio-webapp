
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import ProjectsManagement from "@/components/admin/ProjectsManagement";
import SkillsManagement from "@/components/admin/SkillsManagement";
import ExperienceManagement from "@/components/admin/ExperienceManagement";
import ContactManagement from "@/components/admin/ContactManagement";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, DollarSign, Users, Activity, TrendingUp, FileText } from "lucide-react";

// Dashboard Overview component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <select className="bg-background border rounded-md px-2 py-1 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-xs text-primary mt-1">↑ 7% from last month</p>
              </div>
              <div className="rounded-md bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <h3 className="text-2xl font-bold mt-1">2,856</h3>
                <p className="text-xs text-primary mt-1">↑ 12% from last month</p>
              </div>
              <div className="rounded-md bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact Messages</p>
                <h3 className="text-2xl font-bold mt-1">18</h3>
                <p className="text-xs text-destructive mt-1">↓ 3% from last month</p>
              </div>
              <div className="rounded-md bg-primary/10 p-2">
                <Activity className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project Completion</p>
                <h3 className="text-2xl font-bold mt-1">86%</h3>
                <p className="text-xs text-primary mt-1">↑ 4% from last month</p>
              </div>
              <div className="rounded-md bg-primary/10 p-2">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your portfolio activity in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="mt-0.5 rounded-full bg-secondary p-1">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Project "{['Web App', 'Mobile UI', 'Dashboard', 'Portfolio'][i-1]}" was updated</p>
                    <p className="text-xs text-muted-foreground">{i} day{i > 1 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks scheduled for completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Update Portfolio Bio</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">In Progress</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Update your professional bio with recent achievements</div>
                <div className="text-xs text-muted-foreground mt-2">Due in 2 days</div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Add New Project</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">To Do</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Add the latest e-commerce project to your portfolio</div>
                <div className="text-xs text-muted-foreground mt-2">Due in 5 days</div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Review Contact Form</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Ensure all contact form submissions are addressed</div>
                <div className="text-xs text-muted-foreground mt-2">Completed yesterday</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Analytics component placeholder
const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex items-center space-x-2">
          <select className="bg-background border rounded-md px-2 py-1 text-sm">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Page visits and user engagement</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart className="h-10 w-10 mx-auto mb-2" />
              <p>Analytics chart visualization will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Pages Management component placeholder
const PagesManagement = () => {
  const pages = [
    { id: 1, title: "Home", slug: "/", status: "Published", lastUpdated: "2 days ago" },
    { id: 2, title: "About", slug: "/about", status: "Published", lastUpdated: "1 week ago" },
    { id: 3, title: "Projects", slug: "/projects", status: "Published", lastUpdated: "3 days ago" },
    { id: 4, title: "Contact", slug: "/contact", status: "Published", lastUpdated: "5 days ago" },
    { id: 5, title: "Blog", slug: "/blog", status: "Draft", lastUpdated: "1 day ago" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pages Management</h2>
        <button className="btn-primary flex items-center gap-2">
          <FileText size={18} />
          Add New Page
        </button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Page Title</th>
                  <th className="text-left p-4 font-medium">Slug</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Last Updated</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="border-b">
                    <td className="p-4 font-medium">{page.title}</td>
                    <td className="p-4">{page.slug}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        page.status === "Published" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4">{page.lastUpdated}</td>
                    <td className="p-4 text-right">
                      <button className="text-sm text-primary hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <div className="flex-1 flex flex-col">
            <AdminTopbar />
            
            <div className="flex-1 p-6 md:p-8 overflow-auto">
              {activeSection === "dashboard" && <DashboardOverview />}
              {activeSection === "projects" && <ProjectsManagement />}
              {activeSection === "skills" && <SkillsManagement />}
              {activeSection === "experience" && <ExperienceManagement />}
              {activeSection === "contact" && <ContactManagement />}
              {activeSection === "pages" && <PagesManagement />}
              {activeSection === "analytics" && <Analytics />}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
