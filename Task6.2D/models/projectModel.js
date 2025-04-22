// models/projectModel.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let projectCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("portfolio");
    projectCollection = db.collection("projects");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

async function getAllProjects() {
  return await projectCollection.find({}).toArray();
}

async function addProject(project) {
  return await projectCollection.insertOne(project);
}

module.exports = {
  connectDB,
  getAllProjects,
  addProject,
};
