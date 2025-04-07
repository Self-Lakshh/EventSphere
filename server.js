require("dotenv").config();
const express = require("express");
const cors = require("cors"); // <-- Add this line
const apiRoutes = require("./routes");
const mysqlConfig = require("./config/db");

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse request body
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for URL-encoded body

// Routes
app.use("/api", apiRoutes);

// Get port from env or fallback to 4000
const PORT = process.env.PORT || 4000;

// Function to test MySQL connection before starting server
const connectDatabases = async () => {
  try {
    const connection = await mysqlConfig.getConnection();
    await connection.ping();
    connection.release();

    console.log("MySQL connected successfully");
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server is running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
    process.exit(1);
  }
};

// Global error handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the server
connectDatabases();
