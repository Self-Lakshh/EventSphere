const {
    submitForm,
    getSubmissionsByFormId,
    getSubmissionById,
  } = require("../services/formSubmissionService");
  
  // 🛡 Admin Role Check
  const isAdmin = (user) => user?.role === "admin";
  
  // 📝 POST /api/forms/:id/submit — Submit form for an event
  const handleSubmitForm = async (req, res) => {
    try {
      const form_id = req.params.id;
      const user_id = req.user?.id;

        if (!user_id) {
            return res.status(401).json({ message: "User not authenticated." });
            }
  
      const {
        enrollment_id,
        full_name,
        email,
        year,
        sem,
        phone,
        age,
        gender,
        address,
      } = req.body;
  
      // Basic validation
      if (!full_name || !email) {
        return res.status(400).json({ message: "full_name and email are required." });
      }
  
      const result = await submitForm(form_id, {
        enrollment_id,
        full_name,
        email,
        year,
        sem,
        phone,
        age,
        gender,
        address,
      }, user_id);
  
      res.status(201).json(result);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 📋 GET /api/forms/:id/submissions — Get all submissions (admin only)
  const handleGetSubmissionsByFormId = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const result = await getSubmissionsByFormId(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching submissions:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  // 🔍 GET /api/submissions/:id — Get single submission by ID (admin only)
  const handleGetSubmissionById = async (req, res) => {
    try {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const result = await getSubmissionById(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching submission by ID:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
  module.exports = {
    handleSubmitForm,
    handleGetSubmissionsByFormId,
    handleGetSubmissionById,
  };
  