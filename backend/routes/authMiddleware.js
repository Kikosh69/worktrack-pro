const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware'); // Ochrana
const { email, password } = req.body;


// Ochrana API routov
router.get('/', authMiddleware, employeeController.getAllEmployees);
router.post('/', authMiddleware, employeeController.createEmployee);
router.get('/:id', authMiddleware, employeeController.getEmployeeById);
router.patch('/:id', authMiddleware, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;

