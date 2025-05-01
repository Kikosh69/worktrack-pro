const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken } = require('../controllers/authController');

router.get('/', verifyToken, projectController.getAllProjects);
router.post('/', verifyToken, projectController.createProject);

module.exports = router;