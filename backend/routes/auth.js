const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.verifyToken, authController.getMe);
router.patch('/me', authController.verifyToken, authController.updateMe);

module.exports = router;