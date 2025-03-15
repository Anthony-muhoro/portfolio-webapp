import { Github, Globe, FolderGit2, Code, BriefcaseBusiness, Smartphone, Database, Server, Download, Twitter, Linkedin } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  category: "Frontend" | "Mobile" | "Backend" | "Database" | "Tools";
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: typeof Code;
  features: string[];
}

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Anthony-muhoro",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: Twitter,
  },
];

export const navLinks = [
  {
    name: "Home",
    url: "#home",
  },
  {
    name: "Services",
    url: "#services",
  },
  {
    name: "Projects",
    url: "#projects",
  },
  {
    name: "Skills",
    url: "#skills",
  },
  {
    name: "Contact",
    url: "#contact",
  },
];

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "1",
    role: "Freelance Web Developer",
    company: "Self-employed",
    duration: "2023 - Present",
    description: [
      "Designing and developing responsive landing pages for small businesses",
      "Creating simple e-commerce solutions using React and Tailwind CSS",
      "Implementing mobile-first designs that work across all device sizes"
    ]
  },
  {
    id: "2",
    role: "Frontend Development bootcamp",
    company: "Tech Learning Hub",
    duration: "Apr 2024 - Sep 2024",
    description: [
      "Participated in weekly code reviews and learning sessions",
      "Built UI components using React and styled-components",
      "Assisted in implementing responsive design patterns for web applications"
    ]
  },
  {
    id: "3",
    role: "Open Source Contributor",
    company: "Various Projects",
    duration: "2022 - Present",
    description: [
      "Contributing to open-source React component libraries",
      "Fixeing UI bugs and improving accessibility features",
      "Collaborating with developers globally through GitHub"
    ]
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering, user authentication, and payment processing.",
    image: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?q=80&w=2670&auto=format&fit=crop",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    demoLink: "https://smart-electron-dashboard.onrender.com",
    githubLink: "https://github.com/MuhoroDev-tony/smart-electron-dashboard.git",
    featured: true,
  },
  {
    id: "2",
    title: "Hacker News Top 100",
    description: "A collaborative task management application with drag-and-drop interfaces, real-time updates, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    techStack: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
    demoLink: "https://muhoro-news-app.onrender.com",
    githubLink: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Health & Fitness Tracker",
    description: "A comprehensive fitness tracking application with workout plans, nutrition logging, and progress visualization.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    techStack: ["React Native", "Redux", "Express", "PostgreSQL"],
    demoLink: "https://muhoro-news-app.onrender.com",
    githubLink: "#",
    featured: true,
  },
  {
    id: "4",
    title: "Weather Dashboard",
    description: "Real-time weather forecasting application with interactive maps and historical data visualization.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop",
    techStack: ["JavaScript", "Next.js", "Node.js", "OpenWeather API"],
    demoLink: "#",
    githubLink: "#",
    featured: false,
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "A sleek, responsive portfolio website showcasing development projects and skills.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2670&auto=format&fit=crop",
    techStack: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    demoLink: "#",
    githubLink: "#",
    featured: false,
  }
];

export const skills: Skill[] = [
  { name: "HTML", icon: "html5", category: "Frontend" },
  { name: "CSS", icon: "css3", category: "Frontend" },
  { name: "JavaScript", icon: "javascript", category: "Frontend" },
  { name: "TypeScript", icon: "typescript", category: "Frontend" },
  { name: "React", icon: "react", category: "Frontend" },
  { name: "Next.js", icon: "nextjs", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "Frontend" },
  { name: "React Native", icon: "react", category: "Mobile" },
  { name: "Node.js", icon: "nodejs", category: "Backend" },
  { name: "Express", icon: "express", category: "Backend" },
  { name: "Prisma", icon: "prisma", category: "Backend" },
  { name: "PostgreSQL", icon: "postgresql", category: "Database" },
  { name: "MySQL", icon: "mysql", category: "Database" },
  { name: "MongoDB", icon: "mongodb", category: "Database" },
  { name: "Git", icon: "git", category: "Tools" },
  { name: "Postman", icon: "postgresql", category: "Tools" },
];

export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom web applications tailored to your business needs with modern technologies and responsive designs.",
    icon: Code,
    features: [
      "Responsive website design",
      "Custom web applications",
      "E-commerce solutions",
      "Performance optimization"
    ]
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android using React Native.",
    icon: Smartphone,
    features: [
      "Cross-platform development",
      "iOS and Android apps",
      "Real-time features",
      "Offline capabilities",
      "App store deployment"
    ]
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Robust, scalable backend systems with Node.js, Express, and modern database technologies.",
    icon: Server,
    features: [
      "API development",
      "Database design",
      "Authentication systems",
      "Server management",
      "Performance optimization"
    ]
  },
  {
    id: 4,
    title: "Database Solutions",
    description: "Database design, optimization, and management with SQL and NoSQL databases.",
    icon: Database,
    features: [
      "Database architecture",
      "Data migration",
      "Query optimization",
      "Backup solutions",
      "Data security"
    ]
  }
];

export const profile = {
  name: "Anthony Muhoro",
  title: "Full Stack Developer",
  photo: "https://res.cloudinary.com/dyzssa40e/image/upload/v1739451629/5866255608246815703_hyneja.jpg", // You should add a profile photo to the public directory
  bio: "I'm a passionate full stack developer with expertise in web and mobile application development. I love creating elegant solutions that solve real-world problems.",
  location: "Murang'a, Kenya",
  email: "anthonymuhoro7.com",
  phone: "+254 706 471 469",
  resumeUrl: "/mycv.rtf" // You should add a PDF resume to the public directory
};
