
const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

// Sample lessons for Talk-A-What!
const lessons = [
  {
    id: 1,
    title: "Basic Greetings",
    description: "Learn hello, hi, and how are you.",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Introducing Yourself",
    description: "Learn to introduce yourself in English.",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Everyday Conversations",
    description: "Practice common daily English phrases.",
    level: "Beginner",
  },
];

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Talk-A-What API is running!" });
});

// GET API: retrieve all lessons
app.get("/api/lessons", (req, res) => {
  res.status(200).json({
    success: true,
    count: lessons.length,
    data: lessons,
  });
});

// GET API: retrieve one lesson by ID
app.get("/api/lessons/:id", (req, res) => {
  const lessonId = Number(req.params.id);
  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return res.status(404).json({
      success: false,
      message: "Lesson not found",
    });
  }

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

app.listen(PORT, () => {
  console.log(`Talk-A-What API running at http://localhost:${PORT}`);
});
