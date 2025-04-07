const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./auth.routes');

// Use route modules
router.use('/auth', authRoutes);
router.use('/users', require('./userRoutes'));
router.use('/events', require('./eventRoutes'));
router.use('/forms', require('./formRoutes'));
router.use('/forms', require('./formSubmissionRoutes'));
router.use('/events', require('./eventFeedbackRoutes'));

module.exports = router;
