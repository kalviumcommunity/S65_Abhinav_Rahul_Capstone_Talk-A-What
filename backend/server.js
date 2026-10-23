
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample lesson data
let lessons = [
  {
    id: 1,
    title: 'Basic Greetings',
    description: 'Learn basic English greetings.',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Introducing Yourself',
    description: 'Learn how to introduce yourself in English.',
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'Everyday Conversations',
    description: 'Practice everyday English conversations.',
    level: 'Intermediate'
  }
];

// GET: Retrieve all lessons
app.get('/api/lessons', (req, res) => {
  res.status(200).json({
    success: true,
    count: lessons.length,
    data: lessons
  });
});

// GET: Retrieve one lesson by ID
app.get('/api/lessons/:id', (req, res) => {
  const lessonId = Number(req.params.id);

  const lesson = lessons.find(item => item.id === lessonId);

  if (!lesson) {
    return res.status(404).json({
      success: false,
      message: 'Lesson not found'
    });
  }

  res.status(200).json({
    success: true,
    data: lesson
  });
});

// POST: Create a new lesson
app.post('/api/lessons', (req, res) => {
  const { title, description, level } = req.body;

  if (
    typeof title !== 'string' || !title.trim() ||
    typeof description !== 'string' || !description.trim() ||
    typeof level !== 'string' || !level.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: 'Title, description, and level are required'
    });
  }

  const nextId = lessons.length
    ? Math.max(...lessons.map(lesson => lesson.id)) + 1
    : 1;

  const newLesson = {
    id: nextId,
    title: title.trim(),
    description: description.trim(),
    level: level.trim()
  };

  lessons.push(newLesson);

  res.status(201).json({
    success: true,
    message: 'Lesson created successfully',
    data: newLesson
  });
});

// PUT: Update an existing lesson
app.put('/api/lessons/:id', (req, res) => {
  const lessonId = Number(req.params.id);

  if (!Number.isInteger(lessonId) || lessonId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid lesson ID'
    });
  }

  const { title, description, level } = req.body;

  if (
    typeof title !== 'string' || !title.trim() ||
    typeof description !== 'string' || !description.trim() ||
    typeof level !== 'string' || !level.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: 'Title, description, and level are required'
    });
  }

  const lessonIndex = lessons.findIndex(
    lesson => lesson.id === lessonId
  );

  if (lessonIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Lesson not found'
    });
  }

  lessons[lessonIndex] = {
    id: lessonId,
    title: title.trim(),
    description: description.trim(),
    level: level.trim()
  };

  res.status(200).json({
    success: true,
    message: 'Lesson updated successfully',
    data: lessons[lessonIndex]
  });
});

// TEMPORARY: Verify this server is running
app.get('/api/test-put', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Correct server is running'
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
