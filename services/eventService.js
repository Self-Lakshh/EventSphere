const db = require("../config/db");

// 🎉 Create Event (Admin only)
const createEvent = async ({
  admin_id,
  title,
  description,
  location,
  start_date,
  end_date,
  isActive = false,
  is_feedback_enabled = false,
  speaker_details = [],
  image_base64 = "",
}) => {
  const speakerJSON = JSON.stringify(speaker_details);

  const [result] = await db.query(
    `INSERT INTO events (
      admin_id, title, description, location,
      start_date, end_date, isActive, is_feedback_enabled,
      speaker_details, image_base64
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      admin_id,
      title,
      description,
      location,
      start_date,
      end_date,
      isActive,
      is_feedback_enabled,
      speakerJSON,
      image_base64,
    ]
  );

  return {
    success: true,
    message: "Event created successfully.",
    eventId: result.insertId,
  };
};

// 📋 Get All Events
const getAllEvents = async () => {
  const [rows] = await db.query("SELECT * FROM events ORDER BY start_date DESC");
  return { success: true, events: rows };
};

// 🔍 Get Event By ID
const getEventById = async (id) => {
  const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [id]);
  if (!rows.length) return { success: false, message: "Event not found." };
  return { success: true, event: rows[0] };
};

// ✏️ Update Event (Admin only)
const updateEvent = async (id, updatedData) => {
  const {
    title,
    description,
    location,
    start_date,
    end_date,
    isActive,
    is_feedback_enabled,
    speaker_details,
    image_base64,
  } = updatedData;

  const speakerJSON = JSON.stringify(speaker_details);

  const [result] = await db.query(
    `UPDATE events SET 
      title = ?, description = ?, location = ?,
      start_date = ?, end_date = ?, isActive = ?, is_feedback_enabled = ?,
      speaker_details = ?, image_base64 = ?
     WHERE id = ?`,
    [
      title,
      description,
      location,
      start_date,
      end_date,
      isActive,
      is_feedback_enabled,
      speakerJSON,
      image_base64,
      id,
    ]
  );

  return {
    success: result.affectedRows > 0,
    message: result.affectedRows > 0
      ? "Event updated successfully."
      : "Event not found or no changes applied.",
  };
};

// 🗑 Delete Event (Admin only)
const deleteEvent = async (id) => {
  const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);
  return {
    success: result.affectedRows > 0,
    message: result.affectedRows > 0 ? "Event deleted successfully." : "Event not found.",
  };
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
