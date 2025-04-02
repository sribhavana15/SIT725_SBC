const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let projectCollection;

// Connect to MongoDB and set up the collection
client.connect()
  .then(() => {
    const db = client.db("portfolio");
    projectCollection = db.collection("projects");
    console.log("✅ Connected to MongoDB");
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
  });

// API endpoint to fetch all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await projectCollection.find({}).toArray();
    res.json(projects);
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint to add a new project (optional)
app.post("/api/projects", async (req, res) => {
  try {
    const project = req.body;
    await projectCollection.insertOne(project);
    res.status(201).json({ message: "Project added!" });
  } catch (err) {
    console.error("Failed to insert project:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at: http://localhost:${port}`);
});
