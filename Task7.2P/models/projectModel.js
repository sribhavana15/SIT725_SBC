// models/projectModel.js
const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
      useUnifiedTopology: true
    });
    db = client.db("portfolio"); // You can rename this DB if needed
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}

// Return the database instance
function getDB() {
  return db;
}

// Return the 'projects' collection
function Projects() {
  return db.collection("projects");
}

module.exports = {
  connectDB,
  getDB,
  Projects
};
