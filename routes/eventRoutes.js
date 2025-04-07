const express = require("express");
const router = express.Router();

const {
  handleCreateEvent,
  handleGetAllEvents,
  handleGetEventById,
  handleUpdateEvent,
  handleDeleteEvent,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");

// ➕ POST /api/events - Create new event (admin)
router.post("/", authMiddleware, handleCreateEvent);

// 📋 GET /api/events - Get all events
router.get("/", handleGetAllEvents);

// 🔍 GET /api/events/:id - Get event details by ID
router.get("/:id", handleGetEventById);

// ✏️ PUT /api/events/:id - Update event (admin)
router.put("/:id", authMiddleware, handleUpdateEvent);

// 🗑 DELETE /api/events/:id - Delete event (admin)
router.delete("/:id", authMiddleware, handleDeleteEvent);

module.exports = router;
