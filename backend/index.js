const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const prisma = new PrismaClient();
const PORT = 5001;
const SECRET = process.env.JWT_SECRET || "supersecret";

app.use(cors());
app.use(express.json());

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  res.json({ message: "User created", userId: user.id });
});

// Login route (for later)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ error: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));

// Middleware to get logged-in user from token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
// Get all other user profiles (exclude self)
app.get("/profiles", authenticate, async (req, res) => {
  const userId = req.userId;

  try {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: {
          not: userId, // exclude current user's profile
        },
      },
      include: {
        user: true, // optional: to access email if needed
      },
    });

    res.json({ profiles });
  } catch (err) {
    console.error("Fetch profiles error:", err);
    res.status(500).json({ error: "Could not fetch profiles" });
  }
});


// Profile creation route
app.post("/profile", authenticate, async (req, res) => {
  const { fullName, age, gender, religion, location, bio } = req.body;
  const userId = req.userId;

  try {
    const existing = await prisma.profile.findUnique({ where: { userId } });
    if (existing) return res.status(400).json({ error: "Profile already exists" });

    const profile = await prisma.profile.create({
      data: {
        fullName,
        age,
        gender,
        religion,
        location,
        bio,
        user: { connect: { id: userId } },
      },
    });

    res.json({ message: "Profile created", profile });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

