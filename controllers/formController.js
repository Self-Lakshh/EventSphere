const {
    createForm,
    updateFormById,
    getAllForms,
    getFormById,
    getFormsByEventId,
    deleteFormById,
  } = require("../services/formService");
  
  // 🛡 Admin Role Check
  const isAdmin = (user) => user?.role === "admin";
  
  // ➕ POST /api/forms - Create form (admin only)
  const handleCreateForm = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const { event_id, title, description } = req.body;
  
      if (!event_id || !title) {
        return res.status(400).json({ message: "event_id and title are required." });
      }
  
      const result = await createForm({ event_id, title, description });
      res.status(201).json(result);
    } catch (error) {
      console.error("❌ Error creating form:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // ✏️ PUT /api/forms/:id - Update form (admin only)
  const handleUpdateFormById = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({ message: "Title is required." });
      }
  
      const result = await updateFormById(req.params.id, { title, description });
  
      if (!result.success) {
        return res.status(404).json(result);
      }
  
      res.json(result);
    } catch (error) {
      console.error("❌ Error updating form:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 📋 GET /api/forms - Get all forms
  const handleGetAllForms = async (req, res) => {
    try {
      const result = await getAllForms();
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching forms:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 🔍 GET /api/forms/:id - Get form by ID
  const handleGetFormById = async (req, res) => {
    try {
      const result = await getFormById(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching form by ID:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 📦 GET /api/forms/event/:id - Get forms for specific event
  const handleGetFormsByEventId = async (req, res) => {
    try {
      const result = await getFormsByEventId(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching forms for event:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 🗑 DELETE /api/forms/:id - Delete form (admin only)
  const handleDeleteFormById = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const result = await deleteFormById(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json(result);
    } catch (error) {
      console.error("❌ Error deleting form:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  module.exports = {
    handleCreateForm,
    handleUpdateFormById,
    handleGetAllForms,
    handleGetFormById,
    handleGetFormsByEventId,
    handleDeleteFormById,
  };
  