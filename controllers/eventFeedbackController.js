const {
    submitEventFeedback,
    getFeedbackByEventId,
    getAverageRatingByEventId,
  } = require("../services/eventFeedbackService");
  
  // 🛡 Auth Required: Submit Feedback
  const handleSubmitFeedback = async (req, res) => {
    try {
      const { id: event_id } = req.params;
      const user_id = req.user?.id;
      const { rating, comment } = req.body;
  
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
      }
  
      const result = await submitEventFeedback({
        event_id,
        user_id,
        rating,
        comment,
      });
  
      if (!result.success) {
        return res.status(400).json(result);
      }
  
      res.status(201).json(result);
    } catch (error) {
      console.error("❌ Error submitting feedback:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 🌟 Public: Get All Feedback for an Event
  const handleGetFeedbackByEventId = async (req, res) => {
    try {
      const { id: event_id } = req.params;
      const result = await getFeedbackByEventId(event_id);
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching feedback:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 📊 Public: Get Average Rating for an Event
  const handleGetAverageRating = async (req, res) => {
    try {
      const { id: event_id } = req.params;
      const result = await getAverageRatingByEventId(event_id);
      res.json(result);
    } catch (error) {
      console.error("❌ Error calculating average rating:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  module.exports = {
    handleSubmitFeedback,
    handleGetFeedbackByEventId,
    handleGetAverageRating,
  };
  