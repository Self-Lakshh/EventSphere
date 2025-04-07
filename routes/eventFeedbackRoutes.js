const express = require("express");
const router = express.Router();

const {
  handleSubmitFeedback,
  handleGetFeedbackByEventId,
  handleGetAverageRating,
} = require("../controllers/eventFeedbackController");

const authMiddleware = require("../middleware/authMiddleware");

// 📝 POST /api/events/:id/feedback - Submit feedback (auth required)
router.post("/:id/feedback", authMiddleware, handleSubmitFeedback);

// 🌟 GET /api/events/:id/feedback - Get all feedback for an event
router.get("/:id/feedback", handleGetFeedbackByEventId);

// 📊 GET /api/events/:id/rating - Get average rating for an event
router.get("/:id/rating", handleGetAverageRating);

module.exports = router;
