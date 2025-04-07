const db = require("../config/db");

// ➕ Create a new form (admin only)
const createForm = async ({ event_id, title, description }) => {
  const [result] = await db.query(
    "INSERT INTO forms (event_id, title, description) VALUES (?, ?, ?)",
    [event_id, title, description]
  );

  return {
    success: true,
    message: "Form created successfully.",
    form: {
      id: result.insertId,
      event_id,
      title,
      description,
    },
  };
};

// ✏️ Update form by ID
const updateFormById = async (id, { title, description }) => {
  const [result] = await db.query(
    "UPDATE forms SET title = ?, description = ? WHERE id = ?",
    [title, description, id]
  );

  if (result.affectedRows === 0) {
    return { success: false, message: "Form not found or no changes made." };
  }

  return {
    success: true,
    message: "Form updated successfully.",
  };
};

// 📋 Get all forms
const getAllForms = async () => {
  const [forms] = await db.query("SELECT * FROM forms ORDER BY created_at DESC");
  return { success: true, forms };
};

// 🔍 Get form by ID
const getFormById = async (id) => {
  const [forms] = await db.query("SELECT * FROM forms WHERE id = ?", [id]);
  if (forms.length === 0) {
    return { success: false, message: "Form not found." };
  }
  return { success: true, form: forms[0] };
};

// 📦 Get all forms for a specific event
const getFormsByEventId = async (event_id) => {
  const [forms] = await db.query("SELECT * FROM forms WHERE event_id = ?", [event_id]);
  return { success: true, forms };
};

// 🗑 Delete form by ID
const deleteFormById = async (id) => {
  const [result] = await db.query("DELETE FROM forms WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    return { success: false, message: "Form not found or already deleted." };
  }
  return { success: true, message: "Form deleted successfully." };
};

module.exports = {
  createForm,
  updateFormById,
  getAllForms,
  getFormById,
  getFormsByEventId,
  deleteFormById,
};
