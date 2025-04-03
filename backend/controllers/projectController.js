const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { name, description, status } = req.body;
  const project = new Project({ name, description, status });
  try {
    await project.save();
    res.status(201).json({ message: 'Project created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};