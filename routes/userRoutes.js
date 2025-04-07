const express = require("express");
const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


// 👥 GET /api/users - Get all users (admin only)
router.get("/", authMiddleware  ,handleGetAllUsers);

// 🔍 GET /api/users/:id - Get user by ID (admin only)
router.get("/:id", authMiddleware , handleGetUserById);

// 🗑 DELETE /api/users/:id - Delete user by ID (admin only)
router.delete("/:id", authMiddleware ,handleDeleteUserById);

module.exports = router;
