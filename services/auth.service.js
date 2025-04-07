const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

// 🔐 Register User
const registerUser = async (name, email, password, role = 'user') => {
  // Check if email exists
  const [existingUser] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existingUser.length > 0) {
    return {
      success: false,
      message: "Email already registered. Please use a different email.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert into DB
  const [result] = await db.query(
    "INSERT INTO users (name, email, passwordHased, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );

  return {
    success: true,
    message: "User registered successfully.",
    user: {
      id: result.insertId,
      name,
      email,
      role,
    },
  };
};

// 🔓 Login User
const loginUser = async (email, password) => {
  const [users] = await db.query(
    "SELECT id, name, email, passwordHased, role FROM users WHERE email = ?",
    [email]
  );

  if (users.length === 0) {
    return { success: false, message: "Invalid credentials." };
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.passwordHased);
  if (!isMatch) {
    return { success: false, message: "Invalid credentials." };
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  return {
    success: true,
    message: "Login successful.",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// 🔁 Auto Login from Token
const autoLogin = async (token) => {
  try {
    if (!token) {
      return { redirect: "login", message: "Token missing." };
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    const [user] = await db.query(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [decoded.id]
    );

    if (user.length === 0) {
      return { redirect: "register", message: "User not found." };
    }

    return { success: true, user: user[0] };

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { redirect: "login", message: "Token expired." };
    }
    return { redirect: "login", message: "Invalid token." };
  }
};

module.exports = { registerUser, loginUser, autoLogin };
