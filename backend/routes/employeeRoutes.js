const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

// Multer: ukladanie zmlúv
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload zmluvy
router.post('/:id/upload-contract', upload.single('contract'), async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Zamestnanec nenájdený' });

    employee.contracts = employee.contracts || [];
    employee.contracts.push(req.file.filename);
    const updated = await employee.save();
    res.json({ message: 'Zmluva nahratá', updatedEmployee: updated });
  } catch (err) {
    console.error('Chyba pri ukladaní zmluvy:', err);
    res.status(500).json({ message: 'Chyba servera' });
  }
});

// CRUD routy
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
