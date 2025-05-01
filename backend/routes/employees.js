const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Create new employee
router.post('/', employeeController.createEmployee);

// Get employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Update employee by ID
router.patch('/:id', employeeController.updateEmployee);

// Delete employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;