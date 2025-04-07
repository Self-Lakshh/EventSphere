const db = require("../config/db");

// 📝 Submit a form
const submitForm = async (form_id, submissionData, user_id) => {
    // Check if form exists
    const [form] = await db.query("SELECT * FROM forms WHERE id = ?", [form_id]);
    if (form.length === 0) {
        return {
            success: false,
            message: "Form not found.",
        };
    }
    // Basic validation
    if (user_id) {
        const [existingSubmission] = await db.query(
            "SELECT * FROM form_submissions WHERE form_id = ? AND user_id = ?",
            [form_id, user_id]
        );
        if (existingSubmission.length > 0) {
            return {
                success: false,
                message: "You have already submitted this form.",
            };
        }
    }

    // Validate required fields
    if (!submissionData.full_name || !submissionData.email || !submissionData.phone) {
        return {
            success: false,
            message: "Full name, email and phone are required.",
        };
    }
    // Assign default values (null) for missing fields
    const {
        enrollment_id = null,
        full_name = null,
        email = null,
        year = null,
        sem = null,
        phone = null,
        age = null,
        gender = null,
        address = null,
    } = submissionData;

    const [result] = await db.query(
        `INSERT INTO form_submissions 
        (form_id, user_id, enrollment_id, full_name, email, year, sem, phone, age, gender, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            form_id,
            user_id,
            enrollment_id,
            full_name,
            email,
            year,
            sem,
            phone,
            age,
            gender,
            address,
        ]
    );

    return {
        success: true,
        message: "Form submitted successfully.",
        submission_id: result.insertId,
    };
};

// 📋 Get all submissions for a form (admin only)
const getSubmissionsByFormId = async (form_id) => {

    // Check if form exists
    const [form] = await db.query("SELECT * FROM forms WHERE id = ?", [form_id]);
    if (form.length === 0) {
        return {
            success: false,
            message: "Form not found.",
        };
    }
  const [submissions] = await db.query(
    "SELECT * FROM form_submissions WHERE form_id = ? ORDER BY submitted_at DESC",
    [form_id]
  );
  return { success: true, submissions };
};

// 🔍 Get single submission by ID (admin only)
const getSubmissionById = async (id) => {
  const [submissions] = await db.query(
    "SELECT * FROM form_submissions WHERE id = ?",
    [id]
  );
  if (submissions.length === 0) {
    return { success: false, message: "Submission not found." };
  }
  return { success: true, submission: submissions[0] };
};

module.exports = {
  submitForm,
  getSubmissionsByFormId,
  getSubmissionById,
};
