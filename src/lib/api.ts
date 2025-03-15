
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Interface for API error format
interface ApiError {
  message: string;
  errors?: Record<string, string>;
}

// Reusable fetch function with authentication and error handling
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  console.log(`Making API request to: ${API_URL}${endpoint}`);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      if (!response.ok) {
        // Handle error responses
        const error = data as ApiError;
        if (response.status === 401) {
          // Handle authentication errors
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        throw new Error(error.message || "Something went wrong");
      }

      console.log(`API response from ${endpoint}:`, data);
      return data;
    } else {
      // Handle non-JSON responses
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    }
  } catch (error) {
    console.error("API Error:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(message);
    throw error;
  }
}

// Send form data (for file uploads)
async function sendFormData(endpoint: string, formData: FormData, method = "POST") {
  const token = localStorage.getItem("token");
  
  const headers: HeadersInit = {};
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log(`Sending FormData to: ${API_URL}${endpoint}`);
  // Log FormData contents for debugging (don't log file contents)
  const formDataEntries = Array.from(formData.entries())
    .filter(([key, value]) => !(value instanceof File))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  console.log('FormData contents:', formDataEntries);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: formData,
    });

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      if (!response.ok) {
        const error = data as ApiError;
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        throw new Error(error.message || "Something went wrong");
      }

      console.log(`API response from ${endpoint}:`, data);
      return data;
    } else {
      // Handle non-JSON responses
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    }
  } catch (error) {
    console.error("API Error:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(message);
    throw error;
  }
}

// API services structured by resource
export const api = {
  auth: {
    login: (credentials: { email: string; password: string }) => 
      fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    register: (userData: { name: string; email: string; password: string }) => 
      fetchWithAuth("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
  },
  projects: {
    getAll: () => fetchWithAuth("/projects"),
    getById: (id: string) => fetchWithAuth(`/projects/${id}`),
    create: (formData: FormData) => sendFormData("/projects", formData),
    update: (id: string, formData: FormData) => sendFormData(`/projects/${id}`, formData, "PUT"),
    delete: (id: string) => fetchWithAuth(`/projects/${id}`, { method: "DELETE" }),
  },
  skills: {
    getAll: () => fetchWithAuth("/skills"),
    getById: (id: string) => fetchWithAuth(`/skills/${id}`),
    create: (skillData: any) => fetchWithAuth("/skills", {
      method: "POST",
      body: JSON.stringify(skillData),
    }),
    update: (id: string, skillData: any) => fetchWithAuth(`/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(skillData),
    }),
    delete: (id: string) => fetchWithAuth(`/skills/${id}`, { method: "DELETE" }),
  },
  experience: {
    getAll: () => fetchWithAuth("/experience"),
    getById: (id: string) => fetchWithAuth(`/experience/${id}`),
    create: (expData: any) => fetchWithAuth("/experience", {
      method: "POST",
      body: JSON.stringify(expData),
    }),
    update: (id: string, expData: any) => fetchWithAuth(`/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(expData),
    }),
    delete: (id: string) => fetchWithAuth(`/experience/${id}`, { method: "DELETE" }),
  },
  categories: {
    getAll: () => fetchWithAuth("/categories"),
    getById: (id: string) => fetchWithAuth(`/categories/${id}`),
    create: (categoryData: any) => fetchWithAuth("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    }),
    update: (id: string, categoryData: any) => fetchWithAuth(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    }),
    delete: (id: string) => fetchWithAuth(`/categories/${id}`, { method: "DELETE" }),
  },
  contact: {
    getAll: () => fetchWithAuth("/contact"),
    getById: (id: string) => fetchWithAuth(`/contact/${id}`),
    create: (contactData: any) => {
      console.log("Sending contact form data:", contactData);
      return fetchWithAuth("/contact", {
        method: "POST",
        body: JSON.stringify(contactData),
      }).then(response => {
        toast.success("Email sent successfully! You will receive a confirmation email shortly.");
        return response;
      });
    },
    update: (id: string, contactData: any) => fetchWithAuth(`/contact/${id}`, {
      method: "PUT",
      body: JSON.stringify(contactData),
    }),
    markAsRead: (id: string) => fetchWithAuth(`/contact/${id}/read`, { method: "PUT" }),
    delete: (id: string) => fetchWithAuth(`/contact/${id}`, { method: "DELETE" }),
  },
};

export default api;
