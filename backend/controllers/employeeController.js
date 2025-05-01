// employeeController.js - upravený na podporu firstName a lastName
const Employee = require('../models/Employee');

// Vytvorenie nového zamestnanca
exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, position, department, startDate } = req.body;
    const employee = new Employee({ firstName, lastName, position, department, startDate });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Získanie všetkých zamestnancov
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Získanie jedného zamestnanca podľa ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aktualizácia zamestnanca
exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, position, department } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, position, department },
      { new: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Vymazanie zamestnanca
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
