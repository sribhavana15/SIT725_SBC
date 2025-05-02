// controllers/projectController.js
const projectModel = require("../models/projectModel");

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.Projects().find().toArray();
    res.json(projects);
  } catch (err) {
    console.error("❌ Error getting projects:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/projects
const createProject = async (req, res) => {
  try {
    const project = req.body;

    // Basic validation
    if (!project.title || !project.description || !project.image) {
      return res.status(400).json({ message: "Missing required project fields" });
    }

    await projectModel.Projects().insertOne(project);
    res.status(201).json({ message: "✅ Project added!" });
  } catch (err) {
    console.error("❌ Error creating project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProjects,
  createProject,
};
