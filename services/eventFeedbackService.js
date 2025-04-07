const db = require("../config/db");

// ➕ Submit feedback for an event
const submitEventFeedback = async ({ event_id, user_id, rating, comment }) => {
  // Check if feedback is allowed
  const [eventRows] = await db.query("SELECT is_feedback_enabled FROM events WHERE id = ?", [event_id]);
  if (!eventRows.length) {
    return { success: false, message: "Event not found." };
  }

  if (!eventRows[0].is_feedback_enabled) {
    return { success: false, message: "Feedback is disabled for this event." };
  }

  // Insert feedback
  await db.query(
    "INSERT INTO event_feedback (event_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
    [event_id, user_id, rating, comment]
  );

  return { success: true, message: "Feedback submitted successfully." };
};

// 📋 Get all feedback for an event
const getFeedbackByEventId = async (event_id) => {
  const [feedback] = await db.query(
    `SELECT f.id, f.rating, f.comment, f.submitted_at, u.name AS user_name
     FROM event_feedback f
     JOIN users u ON f.user_id = u.id
     WHERE f.event_id = ?
     ORDER BY f.submitted_at DESC`,
    [event_id]
  );

  return { success: true, feedback };
};

// 📊 Get average rating for an event
const getAverageRatingByEventId = async (event_id) => {
    const [result] = await db.query(
      "SELECT AVG(rating) AS average_rating FROM event_feedback WHERE event_id = ?",
      [event_id]
    );
  
    const avg = result[0].average_rating;
  
    return {
      success: true,
      average_rating: avg !== null ? Number(avg).toFixed(2) : null,
    };
  };
  

module.exports = {
  submitEventFeedback,
  getFeedbackByEventId,
  getAverageRatingByEventId,
};
