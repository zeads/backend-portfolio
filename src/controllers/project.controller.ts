import { Request, Response } from "express";
import ProjectService from "../services/project.service";
import { ProjectFilters } from "../types/Project";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const filters: ProjectFilters = req.query;
    const data = await ProjectService.getAllProjects(filters);

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = await ProjectService.createProject(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
