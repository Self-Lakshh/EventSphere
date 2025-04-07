const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
  } = require("../services/eventService");
  
  // 🛡 Admin Role Check
  const isAdmin = (user) => user?.role === "admin";
  
  // ➕ POST /api/events
  const handleCreateEvent = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const eventData = {
        ...req.body,
        admin_id: req.user.id,
      };
  
      const result = await createEvent(eventData);
      res.status(201).json(result);
    } catch (error) {
      console.error("❌ Error creating event:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 📋 GET /api/events
  const handleGetAllEvents = async (req, res) => {
    try {
      const result = await getAllEvents();
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 🔍 GET /api/events/:id
  const handleGetEventById = async (req, res) => {
    try {
      const result = await getEventById(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching event by ID:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // ✏️ PUT /api/events/:id
  const handleUpdateEvent = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const updatedData = req.body;
      const result = await updateEvent(req.params.id, updatedData);
      if (!result.success) {
        return res.status(404).json(result);
      }
  
      res.json(result);
    } catch (error) {
      console.error("❌ Error updating event:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 🗑 DELETE /api/events/:id
  const handleDeleteEvent = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const result = await deleteEvent(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
  
      res.json(result);
    } catch (error) {
      console.error("❌ Error deleting event:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  module.exports = {
    handleCreateEvent,
    handleGetAllEvents,
    handleGetEventById,
    handleUpdateEvent,
    handleDeleteEvent,
  };
  