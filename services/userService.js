const db = require("../config/db");

// 👥 Get All Users (Admin)
const getAllUsers = async () => {
    const [users] = await db.query(
        "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );

    return {
        success: true,
        users,
    };
};

// 🔍 Get Single User by ID
const getUserById = async (id) => {
    const [users] = await db.query(
        "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
        [id]
    );

    if (users.length === 0) {
        return {
            success: false,
            message: "User not found.",
        };
    }

    return {
        success: true,
        user: users[0],
    };
};

// 🗑️ Delete User by ID
const deleteUserById = async (id) => {
    // Optional: check if user exists first
    const [users] = await db.query("SELECT id FROM users WHERE id = ?", [id]);

    if (users.length === 0) {
        return {
            success: false,
            message: "User not found or already deleted.",
        };
    }

    await db.query("DELETE FROM users WHERE id = ?", [id]);

    return {
        success: true,
        message: "User deleted successfully.",
    };
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
};
