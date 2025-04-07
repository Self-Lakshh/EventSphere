const express = require("express");
const router = express.Router();

const {
  handleCreateForm,
  handleUpdateFormById,
  handleGetAllForms,
  handleGetFormById,
  handleGetFormsByEventId,
  handleDeleteFormById,
} = require("../controllers/formController");

const authMiddleware = require("../middleware/authMiddleware");

// ➕ POST /api/forms - Create new form (admin only)
router.post("/", authMiddleware, handleCreateForm);

// ✏️ PUT /api/forms/:id - Update form (admin only)
router.put("/:id", authMiddleware, handleUpdateFormById);

// 📋 GET /api/forms - Get all forms
router.get("/", handleGetAllForms);

// 🔍 GET /api/forms/:id - Get form by ID
router.get("/:id", handleGetFormById);

router.get("/event-forms/:id", handleGetFormsByEventId);

// 🗑 DELETE /api/forms/:id - Delete form (admin only)
router.delete("/:id", authMiddleware, handleDeleteFormById);

module.exports = router;
