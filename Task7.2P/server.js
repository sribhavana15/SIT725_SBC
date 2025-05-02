// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// ✅ Added for Socket.IO
const http = require("http");
const { Server } = require("socket.io");

const projectController = require("./controllers/projectController");
const projectModel = require("./models/projectModel");

const app = express();
// ✅ Wrap app in HTTP server
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

// Connect to DB
projectModel.connectDB().then(() => {
  insertTestProjects(); // ✅ Insert test projects once DB connects
});

// Middleware
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/controllers", express.static(path.join(__dirname, "controllers")));

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API routes
app.get("/api/projects", projectController.getProjects);
app.post("/api/projects", projectController.createProject);

// ✅ Socket.IO logic
io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("sendMessage", (msg) => {
    console.log("📨 Received:", msg);
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ One-time test project insertion
async function insertTestProjects() {
  const { Projects } = projectModel;
  try {
    const existing = await Projects().find().toArray();
    if (existing.length === 0) {
      await Projects().insertMany([
        {
          title: "Big Data Pipeline",
          description: "ETL workflow using Apache Spark.",
          image: "images/pipeline.png"
        },
        {
          title: "Cloud Dashboard",
          description: "Visualized cloud metrics with Grafana.",
          image: "images/dashboard.png"
        },
        {
          title: "API Service",
          description: "Custom Node.js API for anomaly detection.",
          image: "images/api.png"
        }
      ]);
      console.log("✅ Test projects inserted into DB");
    } else {
      console.log("ℹ️ Test projects already exist — skipping insert");
    }
  } catch (err) {
    console.error("❌ Failed to insert test projects:", err);
  }
}

// ✅ Start the HTTP server instead of app.listen
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
