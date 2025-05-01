const express = require('express');
const router = express.Router();
const companyItemController = require('../controllers/companyItemController');

// Get all company items
router.get('/', companyItemController.getAllCompanyItems);

// Create new company item
router.post('/', companyItemController.createCompanyItem);

// Get company item by ID
router.get('/:id', companyItemController.getCompanyItemById);

// Update company item by ID
router.patch('/:id', companyItemController.updateCompanyItem);

// Delete company item by ID
router.delete('/:id', companyItemController.deleteCompanyItem);

module.exports = router;