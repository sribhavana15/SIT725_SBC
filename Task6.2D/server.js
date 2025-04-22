// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const projectController = require("./controllers/projectController");
const projectModel = require("./models/projectModel");

const app = express();
const port = 3000;

// Connect to DB
projectModel.connectDB();

// Middleware
app.use(bodyParser.json());

// ✅ Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));               // For script.js, stylesheet.css
app.use("/images", express.static(path.join(__dirname, "public/images")));        // ✅ This line fixes the image loading
app.use("/controllers", express.static(path.join(__dirname, "controllers")));     // If needed

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API routes
app.get("/api/projects", projectController.getProjects);
app.post("/api/projects", projectController.createProject);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
