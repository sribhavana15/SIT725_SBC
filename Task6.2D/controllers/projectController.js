// controllers/projectController.js
const projectModel = require("../models/projectModel");

const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.json(projects);
  } catch (err) {
    console.error("Error getting projects:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const createProject = async (req, res) => {
  try {
    const project = req.body;
    await projectModel.addProject(project);
    res.status(201).json({ message: "Project added!" });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProjects,
  createProject,
};
