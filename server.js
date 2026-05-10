const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// MongoDB URL from Render environment
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);

let db;

// Connect once (IMPORTANT for production)
async function connectDB() {
    try {
        await client.connect();
        db = client.db("apnacollege-db");
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
    }
}

connectDB();


// GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const data = await db.collection("users").find({}).toArray();
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});


// POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        const result = await db.collection("users").insertOne(userObj);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
