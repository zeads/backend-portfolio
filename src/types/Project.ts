export interface IProject {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  content?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPublished: boolean;
  category: "Fullstack" | "Frontend" | "Backend" | "Mobile";
}

export interface ProjectFilters {
  category?: string;
  tag?: string;
  search?: string;
}
