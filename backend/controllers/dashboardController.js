const Employee = require('../models/Employee');
const Project = require('../models/Project');

exports.getDashboardStats = async (req, res) => {
  try {
    const employeeCount = await Employee.countDocuments();
    const projectCount = await Project.countDocuments();
    const countries = await Employee.distinct('country');
    const recentEmployees = await Employee.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      employeeCount,
      projectCount,
      countryCount: countries.length,
      recentEmployees
    });
  } catch (error) {
    console.error('Chyba pri načítaní dashboard dát:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
