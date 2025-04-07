const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../services/userService");

// 🛡 Admin Role Check Helper
const isAdmin = (user) => user?.role === "admin";

// 📄 GET /api/users
const handleGetAllUsers = async (req, res) => {
  try {
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const result = await getAllUsers();
    res.json(result);
  } catch (error) {
    console.error("❌ Error in handleGetAllUsers:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// 📄 GET /api/users/:id
const handleGetUserById = async (req, res) => {
  try {
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const result = await getUserById(req.params.id);
    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Error in handleGetUserById:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// 📄 DELETE /api/users/:id
const handleDeleteUserById = async (req, res) => {
  try {
    if (!isAdmin(req.user)) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const result = await deleteUserById(req.params.id);
    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Error in handleDeleteUserById:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
};
