import Project from "../models/project.model";
import { IProject, ProjectFilters } from "../types/Project";

class ProjectService {
  /**
   * Mengambil semua project dengan fitur filter dan search
   */
  async getAllProjects(filters: ProjectFilters) {
    const query: any = { isPublished: true };

    if (filters.category) query.category = filters.category;
    if (filters.tag) query.tags = { $in: [filters.tag] };
    if (filters.search) {
      query.title = { $regex: filters.search, $options: "i" };
    }

    return await Project.find(query).sort({ createdAt: -1 });
  }

  /**
   * Mengambil detail project berdasarkan slug (SEO Friendly)
   */
  async getProjectBySlug(slug: string) {
    const project = await Project.findOne({ slug });
    if (!project) throw new Error("Project not found");
    return project;
  }

  /**
   * Membuat project baru (Admin Only)
   */
  async createProject(data: Partial<IProject> & { slug: string }) {
    // Logika tambahan: misalnya validasi slug unik
    const existing = await Project.findOne({ slug: data.slug });
    if (existing) throw new Error("Slug already exists");

    return await Project.create(data);
  }

  /**
   * Update project yang sudah ada
   */
  async updateProject(id: string, updateData: Partial<IProject>) {
    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );
    if (!updated) throw new Error("Project not found");
    return updated;
  }

  /**
   * Soft delete atau permanent delete
   */
  async deleteProject(id: string) {
    const result = await Project.findByIdAndDelete(id);
    if (!result) throw new Error("Project not found");
    return { success: true, message: "Project deleted" };
  }
}

export default new ProjectService();
