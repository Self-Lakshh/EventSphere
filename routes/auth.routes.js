const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // <- Ensure correct path

// Route definitions
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/verify', authController.autoLogin);

module.exports = router;
