import ProjectService from "../src/services/project.service";
import Project from "../src/models/project.model";

// Mocking Mongoose Model
jest.mock("../src/models/project.model");

describe("ProjectService Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Bersihkan mock setelah setiap test case
  });

  describe("getAllProjects", () => {
    it("should return all published projects", async () => {
      const mockProjects = [
        { title: "Project 1", isPublished: true },
        { title: "Project 2", isPublished: true },
      ];

      // Simulasi Mongoose .find().sort()
      (Project.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockProjects),
      });

      const result = await ProjectService.getAllProjects({});

      expect(Project.find).toHaveBeenCalledWith({ isPublished: true });
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe("Project 1");
    });
  });

  describe("getProjectBySlug", () => {
    it("should return a project if slug exists", async () => {
      const mockProject = { title: "Deep Learning", slug: "deep-learning" };
      (Project.findOne as jest.Mock).mockResolvedValue(mockProject);

      const result = await ProjectService.getProjectBySlug("deep-learning");

      expect(result.title).toBe("Deep Learning");
      expect(Project.findOne).toHaveBeenCalledWith({ slug: "deep-learning" });
    });

    it("should throw an error if project is not found", async () => {
      (Project.findOne as jest.Mock).mockResolvedValue(null);

      await expect(ProjectService.getProjectBySlug("unknown")).rejects.toThrow(
        "Project not found",
      );
    });
  });

  describe("createProject", () => {
    it("should create a new project successfully", async () => {
      const projectData = { title: "New App", slug: "new-app" };

      // Pastikan slug belum ada
      (Project.findOne as jest.Mock).mockResolvedValue(null);
      (Project.create as jest.Mock).mockResolvedValue(projectData);

      const result = await ProjectService.createProject(projectData);

      expect(result.title).toBe("New App");
      expect(Project.create).toHaveBeenCalledWith(projectData);
    });

    it("should throw error if slug already exists", async () => {
      const projectData = { title: "New App", slug: "existing-slug" };
      (Project.findOne as jest.Mock).mockResolvedValue({ id: "123" });

      await expect(ProjectService.createProject(projectData)).rejects.toThrow(
        "Slug already exists",
      );
    });
  });
});
