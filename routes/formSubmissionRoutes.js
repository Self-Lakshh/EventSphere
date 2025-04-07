const express = require("express");
const router = express.Router();

const {
  handleSubmitForm,
  handleGetSubmissionsByFormId,
  handleGetSubmissionById,
} = require("../controllers/formSubmissionController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/:id/submit", authMiddleware, handleSubmitForm); // /forms/:id/submit

router.get("/:id/submissions", authMiddleware, handleGetSubmissionsByFormId); // /forms/:id/submissions

router.get("/submissions/:id", authMiddleware, handleGetSubmissionById); // forms/submissions/:id

module.exports = router;
